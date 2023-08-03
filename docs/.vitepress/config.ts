import { DefaultTheme, defineConfig } from 'vitepress'
import pageConfig from '../../src/pages.json'

const getComponents = () => {
  const group: Record<string, { title: string; index: number }> = {
    layout: { title: '布局组件', index: 0 },
    base: { title: '基础组件', index: 1 },
    form: { title: '表单组件', index: 2 },
    nav: { title: '导航组件', index: 3 },
    feedback: { title: '反馈组件', index: 4 },
    show: { title: '展示组件', index: 5 },
    other: { title: '其他组件', index: 6 },
    hook: { title: 'Hooks', index: 7 },
  }
  const data: DefaultTheme.Sidebar = []
  pageConfig.pages.forEach((page) => {
    if (!page.type) return
    const classify = group[page.type]
    if (!data[classify.index]) {
      data[classify.index] = {
        text: classify.title,
        items: [],
      }
    }
    if (page.path.startsWith('packages')) {
      data[classify.index].items?.push({
        text: page.style.navigationBarTitleText,
        link: `/components/${page.path.split('/')[2]}.md`,
      })
    }
  })
  return data
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Papayaui',
  description: 'Document Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/README.md' },
    ],

    sidebar: [
      {
        text: '开发指南',
        items: [{ text: '安装', link: '/README.md' }],
      },
      ...getComponents(),
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
