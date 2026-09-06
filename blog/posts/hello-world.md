---
title: Hello World：博客开篇
date: 2026-09-06
tags: [随笔, VitePress]
---

欢迎来到 runnow815 的技术博客。这个站点基于 **VitePress 1.6.4 + Vue 3** 构建，使用 npm 管理依赖，通过 GitHub Actions 自动部署到 GitHub Pages，视觉上采用为夜间阅读设计的暗黑科技风。

<!-- more -->

## 为什么是 VitePress

作为一名 Java 全栈工程师，我对博客系统的要求很简单：

1. **Markdown 写作**，不折腾数据库和后台；
2. **构建快、产物纯静态**，像部署 jar 包一样"一次构建到处运行"；
3. **Vue 3 原生支持**，需要交互时可以直接写组件；
4. **代码块足够好看** —— 技术博客的门面就是代码高亮。

VitePress 内置 Shiki 高亮、本地搜索、ESM 原生，恰好全部命中。

## 本地常用命令

```bash
# 安装依赖
npm install

# 启动本地开发（热更新）
npm run dev

# 构建生产产物
npm run build

# 本地预览构建结果
npm run preview
```

## 一段 Java 试试高亮

```java
/**
 * 博客文章实体 —— 示意用
 */
public record Post(String title, LocalDate date, List<String> tags) {

    public String slug() {
        return title.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }

    public static void main(String[] args) {
        var post = new Post("Hello World", LocalDate.of(2026, 9, 6),
                List.of("随笔", "VitePress"));
        System.out.println(post.slug()); // hello-world
    }
}
```

## 接下来

后续会在这里更新 Java 并发、JVM、Spring 实践以及前端工程化的笔记。文章列表见 [全部文章](/posts/)。
