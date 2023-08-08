// https://vitepress.dev/guide/custom-theme
import { EnhanceAppContext } from 'vitepress'
import Theme from 'vitepress/theme'
import { h, onMounted } from 'vue'
import Simulator from './Simulator.vue'
import pageConfig from '../../../src/pages.json'
import './style.css'

export default {
  extends: Theme,
  Layout: () => {
    return h(
      Theme.Layout,
      {
        class: 'pa-layout',
      },
      {
        // https://vitepress.dev/guide/extending-default-theme#layout-slots
        'aside-top': h(Simulator),
      },
    )
  },
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    // ...
  },
  setup() {
    onMounted(() => {
      document.querySelectorAll('#VPSidebarNav .VPSidebarItem.is-link .VPLink').forEach((el) => {
        el.addEventListener('click', () => {
          const href = el.getAttribute('href') ?? ''
          const componentName = href.replace(/^.+\/([a-z-]+)\.html$/, '$1')
          const findPage = pageConfig.pages.find(
            (page) => componentName && page.path.includes(componentName),
          )
          if (findPage) {
            const simulatorEl = document.querySelector('.doc-simulator') as HTMLIFrameElement
            simulatorEl.src = simulatorEl.src.replace(
              /^(.*\/index\.html)(#\/)?.*$/,
              `$1#/${findPage.path}`,
            )
          }
        })
      })
    })
  },
}
