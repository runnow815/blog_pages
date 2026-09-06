---
title: style
date: 2026-09-07
tags: [Java, 随笔]
---
# style

开头一两句摘要，显示在文章列表卡片上。

<!-- more -->

以后加新文章，照这个模板（3 步）

1.在 blog/posts/ 新建 my-post.md（文件名全小写、用连字符，如 java-note.md）：
```markdown
---
title: 文章标题
date: 2026-09-06
tags: [Java, 随笔]
---

# 文章标题

开头一两句摘要，显示在文章列表卡片上。

<!-- more -->

正文从这里开始……
```

2.在 config.mts 的 sidebar items 里加一行 `{ text: '文章标题', link: '/posts/my-post' }`

3.保存后浏览器刷新页面即可（dev server 不用重启）
