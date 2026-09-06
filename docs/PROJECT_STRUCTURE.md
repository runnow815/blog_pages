# 项目结构速览（PROJECT_STRUCTURE）

> 一张图看懂项目每个目录 / 文件的职责。新增文件前先查本文档的"新增文件决策"。

## 1. 目录树

```text
blog_test/
├── .github/
│   └── workflows/
│       └── deploy.yml                  # GitHub Pages 自动部署工作流（push main 触发）
├── .trae/
│   └── rules/
│       └── project_rules.md            # Trae 项目规则（AI 协作最高约束）
├── blog/                               # VitePress 站点源码目录（srcDir）
│   ├── .vitepress/
│   │   ├── cache/                      # 本地开发缓存（gitignore，自动生成）
│   │   ├── dist/                       # 构建产物（gitignore，npm run build 生成）
│   │   ├── config.mts                  # 站点配置：base / 导航 / 侧边栏 / 搜索 / 主题参数
│   │   ├── posts.data.ts               # 文章数据加载器（createContentLoader，供列表页使用）
│   │   └── theme/
│   │       ├── index.ts                # 自定义主题入口（继承默认主题 + 引入样式）
│   │       └── styles/
│   │           └── dark-tech.css       # 暗黑科技风唯一样式入口（色板 / 代码块 / 组件样式）
│   ├── posts/                          # 博客文章目录（Markdown）
│   │   ├── index.md                    # 文章列表页（自动渲染全部文章卡片）
│   │   ├── hello-world.md              # 示例文章 1：博客开篇
│   │   └── dark-tech-night.md          # 示例文章 2：暗黑科技风配色实践
│   ├── public/                         # 静态资源（原样拷贝到站点根路径）
│   │   ├── favicon.svg                 # 站点图标（终端风格 SVG）
│   │   └── images/
│   │       └── posts/                  # 文章配图统一放这里
│   ├── index.md                        # 站点首页（home 布局：Hero + 特性卡片）
│   └── about.md                        # 关于页
├── docs/                               # 工程文档（不参与博客构建）
│   ├── PROJECT_SPEC.md                 # 项目规范文档
│   ├── PROJECT_CONSTRAINTS.md          # 项目约束
│   └── PROJECT_STRUCTURE.md            # 项目结构速览（本文件）
├── .gitignore
└── package.json                        # npm 脚本与依赖（VitePress 1.6.4 / Vue 3）
```

## 2. 核心文件职责

| 路径 | 职责 | 修改频率 |
| --- | --- | --- |
| `package.json` | 依赖版本、npm 脚本（dev / build / preview） | 低（升级依赖时） |
| `blog/.vitepress/config.mts` | 站点标题、导航、侧边栏、搜索、base 路径、Markdown 选项 | 中（加栏目 / 文章时） |
| `blog/.vitepress/theme/index.ts` | 主题入口：继承 VitePress 默认主题并加载自定义 CSS | 极低 |
| `blog/.vitepress/theme/styles/dark-tech.css` | **全部视觉定制**：色板变量、代码块、卡片、辉光、滚动条 | 中（调风格时） |
| `blog/.vitepress/posts.data.ts` | 扫描 `posts/*.md`，提取 frontmatter 与摘要，按日期倒序 | 极低 |
| `blog/posts/*.md` | 博客文章正文 | 高（日常写作） |
| `blog/posts/index.md` | 文章列表页，Vue 模板渲染文章卡片 | 极低 |
| `blog/index.md` | 首页 Hero 与特性卡片 | 低 |
| `blog/about.md` | 关于页 | 低 |
| `blog/public/` | favicon、文章图片等静态资源 | 中 |
| `.github/workflows/deploy.yml` | CI：安装依赖 → 构建 → 发布 Pages | 极低 |
| `.trae/rules/project_rules.md` | Trae AI 协作规则 | 低 |
| `docs/*.md` | 工程规范文档 | 低 |

## 3. 新增文件决策（我要加 X，放哪？）

| 需求 | 放置位置 |
| --- | --- |
| 写一篇新文章 | `blog/posts/<kebab-case>.md`，并在 `config.mts` 的 sidebar 登记 |
| 文章配图 | `blog/public/images/posts/<文章名>/<图片>` |
| 调整颜色 / 代码块 / 卡片样式 | 只改 `blog/.vitepress/theme/styles/dark-tech.css` 的 CSS 变量 |
| 加导航 / 侧边栏 / 社交链接 | `blog/.vitepress/config.mts` |
| 自定义 Vue 组件 | 新建 `blog/.vitepress/theme/components/<PascalCase>.vue`，在 `theme/index.ts` 注册 |
| 站点静态资源（favicon、PDF 等） | `blog/public/` |
| 工程规范 / 决策记录 | `docs/` |
| AI 协作规则 | `.trae/rules/` |
| CI / 部署变更 | `.github/workflows/deploy.yml` |

## 4. 数据流速览

```text
写作：blog/posts/*.md（frontmatter + Markdown）
        │
        ├── posts.data.ts（createContentLoader 扫描 + 摘要提取 + 日期倒序）
        │        │
        │        └──> posts/index.md 文章列表页（Vue 3 模板渲染卡片）
        │
        └── VitePress 编译（Shiki 高亮 one-dark-pro + 暗黑科技风 CSS）
                 │
                 └──> blog/.vitepress/dist（静态产物）
                          │
                          └──> GitHub Actions ──> GitHub Pages
```
