#!/usr/bin/env node
/**
 * patch-vitepress-search.mjs
 * ------------------------------------------------------------------
 * 给 node_modules/vitepress 打本地搜索热更新补丁（幂等，可重复执行）。
 *
 * 背景：VitePress 1.6.x 的 local-search 插件在 dev 模式下，md 文件
 * 热更新时 `handleHotUpdate` 直接把 watcher 的绝对路径传给 indexFile()，
 * 且不 discard 旧索引条目 —— 会导致重建抛错、搜索索引停留在启动时的
 * 全量扫描版本（表现为：新文章/新标题搜不到，或"只能搜到正文"）。
 *
 * 补丁内容：相对路径重建 + 按外部 docId discard 旧条目 + try/catch 兜底。
 * 注意：node_modules 会在 `npm install` / `npm ci` 后被覆盖，
 * 本脚本已挂到 package.json 的 postinstall，装完依赖会自动重打；
 * 也可手动执行：npm run patch:search
 *
 * 用法：
 *   node scripts/patch-vitepress-search.mjs            # 打补丁（已打则跳过）
 *   node scripts/patch-vitepress-search.mjs --check    # 只检查，未打补丁时退出码 1
 *   node scripts/patch-vitepress-search.mjs --revert   # 用 .bak 备份还原
 * ------------------------------------------------------------------
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const checkOnly = args.includes('--check')
const revert = args.includes('--revert')

// 补丁特征串：打补丁后的文件里一定包含它，用于幂等判断
const PATCH_MARKER = '[local-search] hot update failed'
const BAK_SUFFIX = '.search-patch.bak'

const c = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  gray: '\x1b[90m'
}
const say = (stat, color, msg) =>
  console.log(`${color}[${stat}]${c.reset} ${msg}`)
const ok = (msg) => say('ok', c.green, msg)
const skip = (msg) => say('skip', c.yellow, msg)
const fail = (msg) => {
  say('fail', c.red, msg)
  process.exit(1)
}

// 1. 定位 vitepress 构建产物中的 local-search 插件所在 chunk
//    chunk 文件名带内容 hash（如 chunk-D3CUZ4fa.js），版本升级后可能变化，
//    因此按内容特征 `vitepress:local-search` 查找，而不是写死文件名。
const distDir = path.join(root, 'node_modules', 'vitepress', 'dist', 'node')
if (!fs.existsSync(distDir)) {
  skip('未安装 vitepress（node_modules 不存在），跳过补丁。安装依赖后 postinstall 会自动执行。')
  process.exit(0)
}

const candidates = fs
  .readdirSync(distDir)
  .filter((f) => f.startsWith('chunk-') && f.endsWith('.js'))
  .map((f) => path.join(distDir, f))

const targets = candidates.filter((f) =>
  fs.readFileSync(f, 'utf8').includes('vitepress:local-search')
)

if (targets.length === 0) {
  fail('在 vitepress/dist/node 中未找到 local-search 插件，VitePress 版本可能已升级，请人工更新本补丁脚本。')
}
if (targets.length > 1) {
  fail(`匹配到多个 local-search chunk：\n  ${targets.join('\n  ')}\n请人工确认。`)
}

const target = targets[0]
const bak = target + BAK_SUFFIX
const rel = path.relative(root, target)

// 2. --revert：从备份还原
if (revert) {
  if (!fs.existsSync(bak)) {
    skip(`没有备份文件 ${path.basename(bak)}，无需还原。`)
    process.exit(0)
  }
  fs.copyFileSync(bak, target)
  ok(`已还原 ${rel}`)
  process.exit(0)
}

const content = fs.readFileSync(target, 'utf8')

// 3. 幂等：已经打过补丁就直接跳过
if (content.includes(PATCH_MARKER)) {
  skip(`${rel} 已包含搜索热更新补丁，无需重复打。`)
  process.exit(0)
}

if (checkOnly) {
  fail(`${rel} 未打补丁。请运行：npm run patch:search`)
}

// 4. 结构校验：确认压缩后的标识符与补丁假设一致
//    （VitePress 版本升级后标识符可能变化，宁可报错也不要写出坏代码）
for (const sym of [
  'path$1.relative',
  'getDocId',
  'indexByLocales',
  'await indexFile(',
  'onIndexUpdated()'
]) {
  if (!content.includes(sym)) {
    fail(`目标文件结构与补丁假设不符（缺少 ${sym}），VitePress 版本可能已升级，请人工更新本补丁脚本。`)
  }
}

// 5. 定位 local-search 插件内的 handleHotUpdate 代码块
//    文件里有多个同名钩子（其他插件），必须从 `vitepress:local-search`
//    标记之后开始找，并用 onIndexUpdated() 收尾锚定块尾。
const pluginIdx = content.indexOf('name: "vitepress:local-search"')
const startSig = 'async handleHotUpdate({ file }) {'
const start = content.indexOf(startSig, pluginIdx)
const tailSig = 'onIndexUpdated();\n      }\n    }\n  };\n}'
const tail = content.indexOf(tailSig, start)

if (pluginIdx === -1 || start === -1 || tail === -1) {
  fail('未能定位 local-search 的 handleHotUpdate 代码块，VitePress 版本可能已升级，请人工更新本补丁脚本。')
}
const end = tail + 'onIndexUpdated();\n      }\n    }'.length

// 6. 补丁后的代码块（缩进与 dist 文件保持一致：函数体 4 空格起）
//    注意：debug 的 emoji 在源码里是 \u{1F50D} 转义，模板字符串中需双写反斜杠
const patchedBlock = `async handleHotUpdate({ file }) {
      if (file.endsWith(".md")) {
        try {
          const relFile = path$1.relative(siteConfig.srcDir, file);
          const fileDocId = getDocId(path$1.join(siteConfig.srcDir, relFile));
          for (const [, searchIndex] of indexByLocales) {
            for (const docId of [...searchIndex._documentIds.values()]) {
              if (docId.split("#")[0] === fileDocId) searchIndex.discard(docId);
            }
          }
          await indexFile(relFile);
          debug("\\u{1F50D}\\uFE0F Updated", file);
        } catch (e) {
          console.error("[local-search] hot update failed:", e);
        }
        onIndexUpdated();
      }
    }`

// 7. 备份原始文件（仅首次打补丁时保留，便于 --revert / 人工对比）
if (!fs.existsSync(bak)) {
  fs.writeFileSync(bak, content, 'utf8')
}

const next = content.slice(0, start) + patchedBlock + content.slice(end)

// 8. 写回后自检
if (!next.includes(PATCH_MARKER) || !next.includes('_documentIds.values()')) {
  fail('补丁写回后自检失败，已保留原文件，请人工排查。')
}
fs.writeFileSync(target, next, 'utf8')

ok(`已为 ${rel} 打上本地搜索热更新补丁（备份：${path.basename(bak)}）。`)
console.log(`${c.gray}      补丁作用：dev 模式下修改 md 后搜索索引实时重建（修绝对路径 + discard 旧条目）。${c.reset}`)
