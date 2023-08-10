import { DefaultTheme, defineConfig } from 'vitepress'
import pageConfig from '../../src/pages.json'
import packageJSON from '../../package.json'

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
  base: `/${packageJSON.name}/`,
  title: packageJSON.name[0].toUpperCase() + packageJSON.name.slice(1),
  description: 'Document Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: getComponents()[0].items?.[0].link ?? '' },
    ],

    sidebar: [
      {
        text: '开发指南',
        items: [
          { text: '安装', link: '/guide/install.md' },
          { text: '定制主题', link: '/guide/theme.md' },
        ],
      },
      {
        text: '内置样式',
        items: [
          { text: '介绍', link: '/inbuiltStyle/introduction.md' },
          { text: 'Flex布局', link: '/inbuiltStyle/flex.md' },
          { text: 'Grid布局', link: '/inbuiltStyle/grid.md' },
          { text: 'Margin和Padding', link: '/inbuiltStyle/margin.md' },
          { text: 'Font 字体', link: '/inbuiltStyle/font.md' },
          { text: 'TextAlign 文本对齐', link: '/inbuiltStyle/textAlign.md' },
          { text: '文本行数限制', link: '/inbuiltStyle/ellipsis.md' },
          { text: 'Border 边框', link: '/inbuiltStyle/border.md' },
        ],
      },
      ...getComponents(),
    ],

    socialLinks: [{ icon: 'github', link: packageJSON.repository.url }],
  },
})
