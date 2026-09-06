---
title: 夜间阅读：赛博朋克霓虹风配色实践
date: 2026-09-06
tags: [前端, CSS, VitePress]
---

赛博朋克暗黑风不是简单把背景涂黑，而是让深色基底"发光"。这篇文章记录本博客的配色思路：深蓝黑 / 紫黑的背景层级、霓虹粉 / 电光蓝 / 荧光绿三色高饱和辉光，以及文字发光、边框发光、CRT 扫描线等让夜间阅读冲击力拉满的 CSS 细节。

<!-- more -->

## 色板设计

背景没有使用纯黑 `#000000`，而是一组带蓝紫倾向的深色，靠**层级差**而不是阴影表达纵深：

| 角色 | 色值 |
| --- | --- |
| 主背景 | `#06010f` |
| 次背景 | `#0a0418` |
| 卡片 / 软背景 | `#120826` |
| 弹层 | `#1a0d33` |

霓虹强调色有四种：霓虹粉 `#ff2d95` 作为品牌色负责链接与按钮，电光蓝 `#00e5ff` 负责代码块与次级强调，荧光绿 `#39ff14` 留给行内代码，霓虹紫 `#b537f2` 用于卡片描边与渐变过渡。

## 覆盖 VitePress 变量

VitePress 默认主题暴露了完整的 CSS 变量体系，换肤不需要改组件，只改变量：

```ts
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './styles/dark-tech.css'

export default {
  extends: DefaultTheme
}
```

```css
:root {
  --vp-c-bg: #06010f;              /* 深蓝黑主背景 */
  --vp-c-brand-1: #ff2d95;         /* 品牌主色：霓虹粉 */
  --vp-code-block-bg: #0d0620;     /* 代码块底：紫黑 */
  --vp-code-line-highlight-color: rgba(0, 229, 255, 0.13);

  /* 自定义霓虹色板 */
  --neon-pink: #ff2d95;
  --neon-blue: #00e5ff;
  --neon-green: #39ff14;
  --neon-purple: #b537f2;
}
```

## 文字与边框发光

霓虹感的核心是 `text-shadow` 与 `box-shadow` 的双层辉光：近层高亮、远层扩散。代码块容器用电光蓝描边 + 粉蓝双色外发光，配合 Shiki 的 `one-dark-pro` 高亮：

```css
.vp-doc div[class*='language-'] {
  border: 1px solid rgba(0, 229, 255, 0.4);
  border-radius: 12px;
  box-shadow:
    0 10px 36px rgba(0, 0, 0, 0.6),
    0 0 26px rgba(0, 229, 255, 0.22),
    0 0 56px rgba(255, 45, 149, 0.1);
}
```

链接使用霓虹粉，悬停时叠加强辉光：

```css
.vp-doc a {
  color: var(--neon-pink);
}
.vp-doc a:hover {
  text-shadow:
    0 0 12px rgba(255, 45, 149, 0.55),
    0 0 32px rgba(255, 45, 149, 0.28);
}
```

行内代码则使用荧光绿并带绿色文字辉光，与块级代码的蓝色形成层次区分。

## 氛围层：CRT 扫描线

全屏覆盖一层固定的扫描线和缓慢下移的扫描带，是赛博朋克氛围的关键。注意放在独立伪元素层并设置 `pointer-events: none`，不干扰正文交互：

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.22) 0px,
    rgba(0, 0, 0, 0.22) 1px,
    transparent 1px,
    transparent 3px
  );
}
```

另外两个容易忽略的细节：

- **环境光**：body 上叠加四束粉 / 蓝 / 紫 / 绿径向渐变，`background-attachment: fixed` 固定，滚动时页面不会"死黑一片"。
- **滚动条**：`::-webkit-scrollbar-thumb` 使用粉蓝渐变，hover 时点亮辉光，细节处保持霓虹统一。

::: tip 约束
完整色板与禁止项见工程文档 [PROJECT_CONSTRAINTS.md](https://github.com/runnow815)，所有颜色只允许通过 `dark-tech.css` 中的变量引用。
:::
