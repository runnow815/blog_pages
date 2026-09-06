# 项目规范文档（PROJECT_SPEC）

> 项目：runnow815 的个人技术博客
> 本文档定义项目的技术栈、目录、命名、代码风格、写作、Git 与依赖规范。
> 配套文档：[PROJECT_CONSTRAINTS.md](./PROJECT_CONSTRAINTS.md)（项目约束）、[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)（结构速览）。

## 1. 项目概述

- **定位**：个人技术博客，纯静态站点，Markdown 驱动写作，无后端服务。
- **作者**：runnow815，热爱技术的 Java 全栈工程师。
- **设计基调**：暗黑科技风 —— 深灰 / 纯黑背景，青色、亮绿色、紫色霓虹点缀，细体字体，代码块高亮美观，适合夜间写作与阅读。

## 2. 技术栈与版本

| 类别 | 选型 | 版本 / 说明 |
| --- | --- | --- |
| 站点框架 | VitePress | `1.6.4`（精确锁定于 package.json） |
| 前端框架 | Vue 3 | 由 VitePress 内置，Markdown 中可直接使用 Vue 3 语法 |
| 模块体系 | ES Module | `"type": "module"`，配置使用 `.mts` / `.ts`，禁用 CommonJS |
| 包管理器 | npm | 锁定 `package-lock.json`，禁止 pnpm / yarn |
| 运行时 | Node.js | >= 18（CI 使用 Node 20） |
| 代码高亮 | Shiki | VitePress 内置，主题 `one-dark-pro` |
| 部署 | GitHub Pages | GitHub Actions 自动构建发布 |

版本以 [package.json](../package.json) 为唯一事实来源，升级依赖后同步本文档。

## 3. 环境与常用命令

```bash
# 安装依赖（首次 / 拉取代码后）
npm install

# 本地开发（默认 http://localhost:5173/，热更新）
npm run dev

# 生产构建（产物在 blog/.vitepress/dist）
npm run build

# 本地预览构建产物（默认 http://localhost:4173/）
npm run preview
```

## 4. 目录规范

- `blog/`：VitePress 站点源码（srcDir），博客全部内容与站点代码位于此。
- `docs/`：工程文档（规范 / 约束 / 结构），**不参与博客构建**。
- `.trae/rules/`：Trae IDE 项目规则，AI 协作时自动生效。
- `.github/workflows/`：CI/CD 工作流。
- 根目录只放工程级配置（package.json、.gitignore 等），禁止放页面或组件。

完整目录树见 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)。

## 5. 命名规范

| 对象 | 规范 | 示例 |
| --- | --- | --- |
| 文章 / 页面文件 | kebab-case.md | `java-concurrent-notes.md` |
| Vue 组件 | PascalCase.vue | `PostList.vue` |
| 组件目录 | blog/.vitepress/theme/components/ | — |
| CSS 类名 | kebab-case | `.post-item-title` |
| 自定义 CSS 变量 | `--tech-*` 前缀 | `--tech-green` |
| VitePress 变量覆盖 | 保留官方变量名 | `--vp-c-brand-1` |
| Git 分支 | kebab-case | `feat/post-tags` |

## 6. 代码风格

1. 缩进 2 空格；字符串使用单引号；语句末尾省略分号（与 VitePress 官方示例一致）。
2. 配置与主题代码使用 TypeScript（`.mts` / `.ts`）。
3. 优先利用 VitePress 默认主题能力（nav、sidebar、frontmatter、`createContentLoader`、local search），不过度封装。
4. 所有视觉定制集中在 `blog/.vitepress/theme/styles/dark-tech.css`，禁止在页面 / 组件内散落 `<style>` 或内联样式。
5. 新增依赖前先确认 VitePress / Vue 3 是否已提供该能力，保持依赖列表极简。

## 7. 文章写作规范

每篇文章位于 `blog/posts/`，文件开头必须包含 frontmatter：

```yaml
---
title: 文章标题
date: 2026-09-06
tags: [Java, 并发]
---
```

- `title`：字符串，必填。
- `date`：`YYYY-MM-DD`，必填，列表页按它倒序排列。
- `tags`：字符串数组，必填（可为空数组 `[]`）。
- 正文**第一段**为摘要，会被自动提取到文章列表页（excerpt）。
- 代码块必须标注语言：```` ```java ````、```` ```ts ````、```` ```bash ```` 等，以启用 Shiki 高亮。
- 图片存放于 `blog/public/images/posts/`，文中以 `/images/posts/xxx.png` 引用。
- 新增文章后，如需要在侧边栏展示，在 `blog/.vitepress/config.mts` 的 `sidebar` 中登记。

## 8. Git 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

| 前缀 | 用途 | 示例 |
| --- | --- | --- |
| `feat` | 新文章 / 新功能 | `feat(posts): 新增 Java 线程池笔记` |
| `fix` | 修复 | `fix(theme): 修复代码块行号颜色对比度过低` |
| `docs` | 工程文档 | `docs: 补充项目结构速览` |
| `style` | 主题样式（不影响内容） | `style(theme): 增强代码块霓虹辉光` |
| `refactor` | 重构 | `refactor(config): 抽离导航配置` |
| `ci` | 部署 / 工作流 | `ci: 升级 actions 版本` |
| `chore` | 杂项 / 依赖 | `chore: 升级 vitepress 至 1.6.4` |

- 主分支：`main`（受保护，push 后自动部署）。
- 合并 / 推送前必须本地通过 `npm run build`。

## 9. 依赖管理

- 仅使用 npm：`npm install <pkg>` / `npm install -D <pkg>`。
- `package-lock.json` 必须提交，CI 使用 `npm ci` 安装。
- 禁止提交 `pnpm-lock.yaml`、`yarn.lock`。
- VitePress 版本升级属于 `chore` 提交，升级后须执行 `npm run build` 与 `npm run preview` 验证。

## 10. 部署规范

- 平台：GitHub Pages；仓库 Settings → Pages → Source 选择 **GitHub Actions**。
- 工作流：`.github/workflows/deploy.yml`，push 到 `main` 自动触发。
- `base` 路径：项目站点部署在 `https://<用户名>.github.io/<仓库名>/`，配置文件通过 `GITHUB_ACTIONS` 环境变量自动切换本地 / CI 的 base；**仓库改名时同步修改 `blog/.vitepress/config.mts` 中的 base 值**。
- 构建产物目录固定为 `blog/.vitepress/dist`。
