---
description: runnow815 个人博客项目（VitePress 1.6.4 + Vue 3 + ESM + npm + GitHub Pages）的全局协作规则，涵盖技术栈、目录放置、命名、代码风格、暗黑科技风视觉约束、Git 与部署规范。
alwaysApply: true
---

# blog_test 项目规则（Trae Project Rules）

> 本文件是 AI 协作与人工开发的最高优先级约束。详细背景见 `docs/PROJECT_SPEC.md`、`docs/PROJECT_CONSTRAINTS.md`、`docs/PROJECT_STRUCTURE.md`；规则之间冲突时，以本文件为准。

## 1. 项目定位

- runnow815（Java 全栈工程师）的个人技术博客，**静态站点**，无后端服务。
- 内容以 Markdown 文章为主，面向夜间阅读，视觉为**暗黑科技风**。

## 2. 技术栈（版本以 package.json 为准，不得凭记忆改写）

- 站点框架：**VitePress 1.6.4**（内置 **Vue 3**，Markdown 中可直接使用 Vue 组件语法）。
- 模块体系：**ES Module only**（package.json 已声明 `"type": "module"`），配置文件使用 `.mts` / `.ts`，禁止 CommonJS（`require` / `module.exports`）。
- 包管理器：**npm only**。禁止引入 pnpm / yarn 的 lock 文件；`package-lock.json` 必须提交。
- 运行环境：Node.js >= 18。
- 部署平台：**GitHub Pages**，通过 `.github/workflows/deploy.yml` 自动构建发布。

## 3. 目录与放置决策（新文件必须放对位置）

- `blog/`：VitePress 站点源码目录（srcDir），**所有博客内容与站点代码只放在这里**。
  - `blog/.vitepress/config.mts`：站点唯一配置入口（导航、侧边栏、搜索、base 等）。
  - `blog/.vitepress/theme/index.ts`：自定义主题入口，仅做 `extends DefaultTheme` 与样式引入。
  - `blog/.vitepress/theme/styles/dark-tech.css`：**暗黑科技风唯一样式入口**，所有视觉定制集中于此，禁止在组件/页面内写 `<style>` 或散落 CSS。
  - `blog/.vitepress/posts.data.ts`：文章数据加载器（`createContentLoader`），文章列表页依赖它。
  - `blog/posts/`：博客文章，全部为 Markdown；文件名 `kebab-case.md`。
  - `blog/public/`：静态资源（favicon、图片等），引用时使用根绝对路径。
- `docs/`：工程文档（规范、约束、结构说明），**不参与博客构建**，不要把博客文章放这里。
- `.trae/rules/`：Trae 规则文件目录。
- `.github/workflows/`：CI/CD 工作流。
- 根目录只允许存在工程级配置文件，禁止在根目录创建页面或组件。

## 4. 命名规范

- 文章 / 页面文件：`kebab-case.md`，例如 `dark-tech-night.md`。
- 组件（如未来新增）：`PascalCase.vue`，放入 `blog/.vitepress/theme/components/`。
- CSS 类：`kebab-case`；自定义 CSS 变量统一 `--tech-*` 前缀；覆盖 VitePress 变量必须使用其官方变量名（`--vp-c-*` / `--vp-code-*` 等）。
- npm scripts：小写单词，冒号分组（如 `docs:dev` 风格，本项目为 `dev` / `build` / `preview`）。

## 5. 代码风格

- 缩进 2 空格；字符串单引号；语句末尾省略分号（遵循 VitePress 官方示例风格）。
- TypeScript 优先；配置与主题代码使用 `.mts` / `.ts`。
- 优先使用 VitePress 默认主题能力（nav、sidebar、frontmatter、content loader），不过度封装。
- 新增依赖前先确认 VitePress / Vue 3 是否已内置能力；保持依赖极简。

## 6. 文章写作规范

- 每篇文章必须包含 frontmatter：`title`（字符串）、`date`（`YYYY-MM-DD`）、`tags`（字符串数组）。
- 文章开头第一段为摘要（会被 posts.data.ts 作为 excerpt 提取到列表页）。
- 图片统一放 `blog/public/images/posts/`，文中用 `/images/posts/xxx.png` 引用。
- 代码块标注语言（```java / ```ts / ```bash 等），保证 Shiki 高亮生效。

## 7. 视觉风格约束（暗黑科技风，不可违背）

- 站点固定暗色：`config.mts` 中 `appearance: false`，**禁止开启浅色主题 / 主题切换**。
- 色板（赛博朋克霓虹风，仅允许在此范围内取色，修改样式只改 CSS 变量）：
  - 背景（深蓝黑 → 紫黑层级）：`#06010f`（主）、`#0a0418`、`#120826`、`#1a0d33`
  - 主色 霓虹粉：`#ff2d95`（品牌色，链接/按钮）；辅色 电光蓝：`#00e5ff`；辅色 荧光绿：`#39ff14`（行内代码）；辅色 霓虹紫：`#b537f2`；点缀 霓虹黄：`#ffe600`（警告区块）
  - 正文：`#f8f3ff` / `#d3c2f5` / `#9a86c4`
  - 发光效果统一使用 `--glow-pink` / `--glow-blue` / `--glow-green` 变量，霓虹色统一使用 `--neon-*` 变量
- 字体偏细、科技感：正文系统无衬线栈，代码 `JetBrains Mono / Fira Code / Consolas` 等宽栈。
- 代码块必须美观：Shiki 主题 `one-dark-pro`、圆角、电光蓝霓虹描边 + 双色辉光、行号高亮。
- 允许 CRT 扫描线 / 扫描带等赛博朋克氛围装饰（body::before/::after 独立层、pointer-events: none、prefers-reduced-motion 降级）。
- 禁止纯白背景、高饱和大面积暖色、花哨动画。

## 8. Git 规范

- 提交信息遵循 Conventional Commits：`feat:` / `fix:` / `docs:` / `style:` / `refactor:` / `chore:` / `ci:`。
- 示例：`feat(posts): 新增 Java 并发笔记文章`、`style(theme): 调整代码块微光强度`、`ci: 更新 Pages 部署 workflow`。
- 主分支为 `main`，部署由 push main 触发；禁止在未验证 `npm run build` 通过前合并。

## 9. 部署约束

- GitHub Pages 项目站点路径为 `/<仓库名>/`；`config.mts` 中通过 `GITHUB_ACTIONS` 环境变量自动切换 `base`，仓库改名时只需修改该文件中的 base 值。
- 构建产物目录固定为 `blog/.vitepress/dist`，workflow 上传路径不可随意更改。
- 本地验证三件套：`npm run dev`（写作）、`npm run build`（构建检查）、`npm run preview`（预览产物）。

## 10. 禁止事项

- 禁止引入后端服务、数据库、SSR 框架等与静态博客无关的技术。
- 禁止使用 CommonJS、禁止混入其他包管理器的 lock 文件。
- 禁止浅色主题、禁止脱离 `dark-tech.css` 变量体系硬编码颜色。
- 禁止提交 `node_modules/`、`dist/`、`cache/` 等产物。
- 禁止在未读 `docs/PROJECT_CONSTRAINTS.md` 的情况下修改主题样式与部署配置。
