# 项目约束（PROJECT_CONSTRAINTS）

> 本文档定义项目中**不可随意突破**的边界：技术选型、视觉风格、工程、部署、内容与 AI 协作约束。
> 规范类内容见 [PROJECT_SPEC.md](./PROJECT_SPEC.md)。

## 1. 技术选型约束

1. 站点只使用 **VitePress 1.6.4 + Vue 3**，不引入 Nuxt、Next、Hexo、Hugo 等其他站点 / SSR 框架。
2. 纯静态站点：**禁止**引入后端服务、数据库、运行时服务端 API。
3. 模块体系 **ES Module only**：禁止 `require` / `module.exports`，配置文件统一 `.mts` / `.ts`。
4. 包管理器 **npm only**：禁止 pnpm / yarn 及其 lock 文件。
5. Node.js >= 18；CI 固定 Node 20。
6. 依赖极简：VitePress 已内置的能力（路由、Markdown 扩展、Shiki 高亮、本地搜索、Vue 运行时）不得再引第三方包替代。

## 2. 视觉风格约束（暗黑科技风）

### 2.1 主题模式

- 站点固定暗色：`appearance: false`，**禁止开启浅色主题与主题切换按钮**。
- 所有样式只能写在 `blog/.vitepress/theme/styles/dark-tech.css`，通过 CSS 变量定制；禁止硬编码色值散落各处。

### 2.2 色板（赛博朋克霓虹风，唯一合法取色范围）

| 角色 | 色值 | 用途 |
| --- | --- | --- |
| 背景-主 | `#06010f` | 页面主背景（深蓝黑） |
| 背景-alt | `#0a0418` | 导航 / 交替区块 |
| 背景-soft | `#120826` | 卡片 / 软背景 |
| 背景-elv | `#1a0d33` | 弹层 / 抬升层级 |
| 主色-霓虹粉 | `#ff2d95` | 品牌主色、链接、按钮、辉光（`--neon-pink` / `--vp-c-brand-1`） |
| 辅色-电光蓝 | `#00e5ff` | 代码块描边、次级强调、辉光（`--neon-blue`） |
| 辅色-荧光绿 | `#39ff14` | 行内代码、tip 区块（`--neon-green`） |
| 辅色-霓虹紫 | `#b537f2` | 卡片边框、渐变过渡（`--neon-purple`） |
| 点缀-霓虹黄 | `#ffe600` | 仅 warning 区块 |
| 正文-1 | `#f8f3ff` | 一级文本 |
| 正文-2 | `#d3c2f5` | 二级文本 / 摘要 |
| 正文-3 | `#9a86c4` | 辅助信息 / 元数据 |
| 分隔线 | `rgba(255,45,149,.18)` | 描边、分隔 |

### 2.3 字体

- 正文：偏细无衬线栈（Inter → 系统字体 → PingFang SC / Microsoft YaHei），字重 400，标题 600。
- 代码：等宽栈 `JetBrains Mono` → `Fira Code` → `Cascadia Code` → `Consolas`。
- 不引入远程字体文件，保证离线 / 弱网可用。

### 2.4 代码块

- Shiki 主题固定 `one-dark-pro`，开启行号。
- 代码块风格：圆角 12px、电光蓝霓虹描边 + 粉蓝双色辉光、深色底（`#0d0620`）、高亮行为蓝色半透明。
- 行内代码：荧光绿文字（`#63ff3a`）+ 绿色半透明底 + 绿色文字辉光。
- 氛围装饰：允许 CRT 扫描线（`body::before`）与缓慢下移的扫描带（`body::after`），必须 `pointer-events: none` 且在 `prefers-reduced-motion` 下降级。

### 2.5 禁止项

- 禁止纯白 / 浅色背景、高饱和大面积暖色（红、橙、黄）。
- 禁止花哨动效（弹跳、大幅旋转、闪烁）；动效仅限 hover 过渡与微光，时长 ≤ 0.3s。
- 禁止破坏夜间阅读的高对比纯白块面。

## 3. 工程约束

1. `package-lock.json` 必须随代码提交。
2. `node_modules/`、`blog/.vitepress/dist/`、`blog/.vitepress/cache/` 禁止入库。
3. `.trae/rules/project_rules.md` 为团队 / AI 协作规则，修改需谨慎并在提交信息中说明。
4. 新文件放置位置必须遵循 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) 的"新增文件决策"。

## 4. 部署约束

1. 部署平台固定 GitHub Pages，工作流文件 `.github/workflows/deploy.yml` 不得随意替换发布方式。
2. 构建命令固定 `npm run build`，产物目录固定 `blog/.vitepress/dist`。
3. `base` 由 `GITHUB_ACTIONS` 环境变量自动切换；仓库更名时只允许修改 `config.mts` 中 base 字面量一处。
4. 推送到 `main` 前必须本地验证 `npm run build` 成功。

## 5. 内容约束

1. 文章 frontmatter 三字段（`title` / `date` / `tags`）必填。
2. 文章文件名 kebab-case，禁止中文文件名与空格。
3. 图片统一放 `blog/public/images/posts/`，禁止使用外链图床（防止图片失效）。
4. 代码块必须标注语言。

## 6. AI 协作约束

- AI 在修改本项目前必须阅读 `.trae/rules/project_rules.md` 与本文档。
- AI 不得主动引入新依赖、新框架、新构建工具；如需引入，须先向用户说明理由。
- AI 生成的样式必须复用第 2 节色板中的 CSS 变量，不得自创色值。
- AI 不得执行 `git push`、强制推送、删除工作流等破坏性操作，除非用户明确要求。
