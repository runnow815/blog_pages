import { defineConfig } from 'vitepress'

// GitHub Actions 中构建时使用仓库子路径（项目站点）；本地开发与自定义域名使用根路径
// base 自动取自 CI 环境变量 GITHUB_REPOSITORY（值为 owner/repo），
// 仓库改名或换仓库都无需修改此配置
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const base = isGitHubActions && repoName ? `/${repoName}/` : '/'
const faviconHref = `${base}favicon.svg`

export default defineConfig({
  // 站点基础路径
  base,

   // 站点信息
  lang: 'zh-CN',
  title: 'runnow815 · 技术博客',
  titleTemplate: ':title | runnow815 的暗黑科技博客',
  description:
    'runnow815 的个人技术博客 —— Java 全栈 / Vue 3 / VitePress，暗黑科技风，为夜间阅读而设计。',
  lastUpdated: true,
  cleanUrls: true,

  // 暗黑科技风：固定暗色，不提供主题切换
  appearance: false,

  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: faviconHref }]],

  markdown: {
    lineNumbers: true,
    // Shiki 代码高亮主题（暗色，与 one-dark 配色协调）
    theme: 'one-dark-pro'
  },

  // 本地开发服务器：监听所有网卡（同时支持 IPv4 127.0.0.1 与 IPv6 ::1），
  // 避免仅绑定 IPv6 回环导致部分浏览器/预览环境走 IPv4 时打不开；固定端口 5173
  vite: {
    server: {
      host: true,
      port: 5173,
      strictPort: true
    }
  },

  themeConfig: {
    siteTitle: 'runnow815.dev',

    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '文章',
          items: [
            { text: '全部文章', link: '/posts/' },
            { text: 'Hello World：博客开篇', link: '/posts/hello-world' },
            { text: '夜间阅读：赛博朋克霓虹风配色实践', link: '/posts/dark-tech-night' },
            { text: '样式与写作说明书', link: '/posts/style-guide' },
            { text: '测试能否上传文章', link: '/posts/test' },
            { text: '第一次博客', link: '/posts/first-post' },
            { text: 'style', link: '/posts/my-post' }
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/runnow815' }],

    footer: {
      message: '基于 VitePress 1.6 + Vue 3 构建 · 暗黑科技风 · 为夜间阅读而设计',
      copyright: 'Copyright © 2026 runnow815'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文章',
            buttonAriaLabel: '搜索文章'
          }
        },
        // 中文搜索支持 + 标题优先：
        // MiniSearch 默认按空白/标点切词，中文整句会成为一个超长词条，
        // 导致只有"恰好是词条开头"的查询才能命中（如搜"说明书"找不到《样式与写作说明书》）。
        // 这里将 CJK 连续片段逐字拆分索引（英文/数字仍整词保留），
        // 配合 combineWith:'AND'，任意连续中文片段都能命中；
        // 并把标题命中权重提到正文之上（VitePress 默认 title:4 / text:2 / titles:1）
        miniSearch: {
          options: {
            tokenize: (text: string): string[] => {
              const tokens: string[] = []
              for (const seg of text.split(/[\s\p{P}\p{S}]+/u)) {
                if (!seg) continue
                // 按 Han / 非Han 边界二次切分：中文逐字成词，英文/数字整词保留
                for (const part of seg.split(/(\p{Script=Han}+)/u)) {
                  if (!part) continue
                  if (/\p{Script=Han}/u.test(part)) {
                    for (const ch of part) tokens.push(ch)
                  } else {
                    tokens.push(part.toLowerCase())
                  }
                }
              }
              return tokens
            }
          },
          searchOptions: {
            combineWith: 'AND',
            boost: { title: 10, titles: 6, text: 1 }
          }
        }
      }
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdatedText: '最后更新',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
