import { createContentLoader } from 'vitepress'

// 文章数据加载器：扫描 posts/*.md，提取 frontmatter 与摘要（正文第一段）
// 文章列表页 blog/posts/index.md 依赖此数据
export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(data) {
    return data.sort(
      (a, b) =>
        +new Date(b.frontmatter.date as string) - +new Date(a.frontmatter.date as string)
    )
  }
})
