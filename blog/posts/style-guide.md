---
title: 样式与写作说明书：色板与文章敲法
date: 2026-09-06
tags: [样式指南, VitePress]
---

# 样式与写作说明书：色板与文章敲法

这是本站的颜色与写作说明书。页面里所有色块都直接引用主题 CSS 变量渲染 —— 在 [dark-tech.css](https://github.com/runnow815) 里改了变量，这份说明书会自动跟着变，永远和站点实际效果一致。

<!-- more -->

<style>
.sg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin: 18px 0 26px; }
.sg-card { border: 1px solid rgba(0, 229, 255, 0.22); border-radius: 10px; padding: 12px 14px; background: rgba(13, 6, 32, 0.72); }
.sg-chip { display: block; height: 42px; border-radius: 8px; margin-bottom: 10px; border: 1px solid rgba(255, 255, 255, 0.16); }
.sg-card code { font-size: 12px; }
.sg-card em { display: block; font-style: normal; font-family: var(--vp-font-family-mono); font-size: 12px; color: #9a86c4; margin: 3px 0 6px; }
.sg-card i { display: block; font-style: normal; font-size: 12px; color: #d3c2f5; }
</style>

## 一、色板总览

### 霓虹主色（写文章主要用这五个）

<div class="sg-grid">
  <div class="sg-card"><span class="sg-chip" style="background: var(--neon-pink); box-shadow: var(--glow-pink);"></span><code>--neon-pink</code><em>#ff2d95</em><i>霓虹粉 · 全站主色（品牌色）</i></div>
  <div class="sg-card"><span class="sg-chip" style="background: var(--neon-blue); box-shadow: var(--glow-blue);"></span><code>--neon-blue</code><em>#00e5ff</em><i>电光蓝 · 信息 / 技术感</i></div>
  <div class="sg-card"><span class="sg-chip" style="background: var(--neon-green); box-shadow: var(--glow-green);"></span><code>--neon-green</code><em>#39ff14</em><i>荧光绿 · 代码 / 成功</i></div>
  <div class="sg-card"><span class="sg-chip" style="background: var(--neon-purple);"></span><code>--neon-purple</code><em>#b537f2</em><i>霓虹紫 · 卡片 / 背景点缀</i></div>
  <div class="sg-card"><span class="sg-chip" style="background: var(--neon-yellow);"></span><code>--neon-yellow</code><em>#ffe600</em><i>霓虹黄 · 警告</i></div>
</div>

### 背景层级（由深到浅）

<div class="sg-grid">
  <div class="sg-card"><span class="sg-chip" style="background: var(--vp-c-bg);"></span><code>--vp-c-bg</code><em>#06010f</em><i>页面主背景 · 深蓝黑</i></div>
  <div class="sg-card"><span class="sg-chip" style="background: var(--vp-c-bg-alt);"></span><code>--vp-c-bg-alt</code><em>#0a0418</em><i>侧边栏 / 导航底色</i></div>
  <div class="sg-card"><span class="sg-chip" style="background: var(--vp-c-bg-soft);"></span><code>--vp-c-bg-soft</code><em>#120826</em><i>次级面板</i></div>
  <div class="sg-card"><span class="sg-chip" style="background: var(--vp-c-bg-elv);"></span><code>--vp-c-bg-elv</code><em>#1a0d33</em><i>悬浮卡片（最浅一层）</i></div>
</div>

### 文字层级

<div class="sg-grid">
  <div class="sg-card"><span class="sg-chip" style="background: var(--vp-c-text-1);"></span><code>--vp-c-text-1</code><em>#f8f3ff</em><i>正文主文字（微紫白）</i></div>
  <div class="sg-card"><span class="sg-chip" style="background: var(--vp-c-text-2);"></span><code>--vp-c-text-2</code><em>#d3c2f5</em><i>摘要 / 次级说明</i></div>
  <div class="sg-card"><span class="sg-chip" style="background: var(--vp-c-text-3);"></span><code>--vp-c-text-3</code><em>#9a86c4</em><i>日期 / 元信息</i></div>
</div>

### 发光效果

<div class="sg-grid">
  <div class="sg-card"><span style="display:block; margin: 4px 0 10px; font-size: 18px; font-weight: 700; color: var(--neon-pink); text-shadow: var(--glow-pink);">GLOW PINK</span><code>--glow-pink</code><i>粉色辉光，用于链接悬停、主按钮</i></div>
  <div class="sg-card"><span style="display:block; margin: 4px 0 10px; font-size: 18px; font-weight: 700; color: var(--neon-blue); text-shadow: var(--glow-blue);">GLOW BLUE</span><code>--glow-blue</code><i>蓝色辉光，用于标题、次按钮</i></div>
  <div class="sg-card"><span style="display:block; margin: 4px 0 10px; font-size: 18px; font-weight: 700; color: var(--neon-green); text-shadow: var(--glow-green);">GLOW GREEN</span><code>--glow-green</code><i>绿色辉光，用于行内代码</i></div>
</div>

## 二、怎么选颜色（写作决策表）

**核心原则：正文永远是白色，霓虹色只做点缀。** 写文章时你不需要手动上色 —— 用对 Markdown 语法，主题会自动给你正确的颜色：

| 你想要的效果 | 这样敲 | 自动渲染成 |
| --- | --- | --- |
| 强调关键词 | `**加粗**` | 高亮白加粗 |
| 命令 / 文件名 / 术语 | `` `行内代码` `` | 荧光绿 + 发光 |
| 超链接 | `[文字](url)` | 霓虹粉，悬停发光 |
| 可操作的技巧 | `::: tip` 容器 | 荧光绿边框卡片 |
| 补充信息 | `::: info` 容器 | 电光蓝边框卡片 |
| 注意事项 | `::: warning` 容器 | 霓虹黄边框卡片 |
| 危险 / 禁止操作 | `::: danger` 容器 | 霓虹粉边框卡片 |
| 可折叠的补充内容 | `::: details` 容器 | 点击展开 |
| 引用他人观点 | `> 引用` | 电光蓝左边条 |

::: tip 颜色搭配口诀
一屏最多出现 **2~3 种霓虹色**。粉色做重点，蓝色做技术，绿色做代码，黄色做提醒 —— 超过这个密度，霓虹就变霓虹灯广告牌了。
:::

::: info 关于标题颜色
标题颜色是主题自动控制的：`## 二级标题` 渲染为电光蓝 + 渐变顶线，`### 三级标题` 渲染为霓虹粉。你只管按内容层级使用 `##` / `###`，不要为了换颜色跳级使用标题。
:::

## 三、排版元素实测

下面全是真实渲染效果，不是截图。

### 文本样式

普通正文长这样。**加粗强调**、*斜体语气*、~~删除线~~、`行内代码`，以及一个[霓虹粉链接](https://vitepress.dev)，悬停它会发光。

### 引用

> 好的暗色主题不是把白底反色，而是给黑夜点上霓虹灯。

### 四种提示容器

::: tip 实用技巧
这样写：三个冒号 + tip + 空格 + 标题，结束时单独一行三个冒号。
:::

::: info 补充信息
info 适合放"顺便一提"类的背景知识。
:::

::: warning 注意
warning 适合放容易踩的坑，比如版本差异、配置前置条件。
:::

::: danger 危险操作
danger 适合放不可逆操作警告，比如 `rm -rf`、force push。
:::

::: details 点我展开（details 折叠容器）
折叠内容适合放长代码、附录、不重要的说明。
:::

### 表格

表头自带粉蓝渐变底、斑马纹是淡紫：

| 语法 | 用途 | 颜色 |
| --- | --- | --- |
| `**x**` | 强调 | 白 |
| `` `x` `` | 代码 | 绿 |
| `::: tip` | 技巧 | 绿 |
| `::: info` | 信息 | 蓝 |

## 四、代码块

代码块容器是电光蓝霓虹描边 + 粉蓝双色辉光，高亮主题为 `one-dark-pro`，自带行号。

```java
// Java 示例：主题加载
public class CyberTheme {
    private static final String PINK = "#ff2d95";

    public static void main(String[] args) {
        System.out.println("Hello, Neon World! " + PINK);
    }
}
```

```bash
# bash 示例：本地启动
npm run dev      # 开发预览，热更新
npm run build    # 构建静态文件到 dist
```

```ts {3}
// ts 示例：{3} 表示高亮第 3 行（电光蓝背景条）
const base = isGitHubActions ? `/${repoName}/` : '/'
// 这行不高亮
const dev = base === '/'
```

## 五、新文章怎么敲（完整流程）

**第 1 步**：在 `blog/posts/` 下新建 `my-post.md`：

```markdown
---
title: 文章标题
date: 2026-09-06
tags: [Java, 随笔]
---

# 文章标题

开头一两句摘要，显示在文章列表卡片上。

<!-- more -->

## 正文从这开始
```

::: tip 正文第一行的 `# 标题` 不能省
它有两个作用：既是页面顶部显示的大标题（frontmatter 的 title 只用于浏览器标签页和文章列表卡片，不会渲染到页面），也是站内搜索能命中"文章标题"的唯一来源 —— 索引器只读正文，不读 frontmatter。
:::

**第 2 步**：在 `blog/.vitepress/config.mts` 的 `sidebar` 里加一行：

```ts
{ text: '文章标题', link: '/posts/my-post' }
```

**第 3 步**：保存即可 —— dev 服务器自动热更新，打开 `http://localhost:5173/posts/` 能看到新卡片。

**第 4 步**：发布（二选一，和你之前选的方案一致）：

- **方案 A（推源码）**：IDEA 里 Commit → Push，GitHub Actions 自动构建上线
- **方案 B（复制 dist）**：先在终端执行

```bash
$env:GITHUB_ACTIONS='true'; $env:GITHUB_REPOSITORY='runnow815/blog_pages'; npm run build
```

再把 `blog/.vitepress/dist/` 里的内容复制到 blog_pages 仓库提交。

**插图**：图片放 `blog/public/images/posts/` 里，文中用 `![说明](/images/posts/xxx.png)` 引用（构建时自动带上 `/blog_pages/` 前缀，不会 404）。

## 六、想改颜色怎么办

全站颜色集中在唯一一个文件：`blog/.vitepress/theme/styles/dark-tech.css` 的 `:root` 变量区。

::: warning 换主色的注意事项
改 `--vp-c-brand-1/2/3`、`--neon-*` 等变量即可全站生效，**但**文件里少数辉光效果写死了 `rgba(255, 45, 149, ...)` 这种具体数值。彻底换主色时，需要全局搜索对应的 RGB 三元组（如 `255, 45, 149`）一并替换，否则会出现新旧两色并存。
:::

改完保存，dev 热更新立即可见；确认满意后按上面第 4 步发布。这份说明书因为引用的是 CSS 变量，会自动同步成新配色。
