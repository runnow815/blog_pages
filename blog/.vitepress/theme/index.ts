import DefaultTheme from 'vitepress/theme'
import './styles/dark-tech.css'

// 自定义主题：继承 VitePress 默认主题，仅叠加暗黑科技风样式
// 未来新增全局组件时，在此通过 enhanceApp({ app }) 注册
export default {
  extends: DefaultTheme
}
