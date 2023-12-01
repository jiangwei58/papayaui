// https://vitepress.dev/guide/custom-theme
import { EnhanceAppContext } from 'vitepress'
import Theme from 'vitepress/theme'
import { h } from 'vue'
import Simulator from './Simulator.vue'
import './index.scss'
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
        'aside-top': () => h(Simulator),
      },
    )
  },
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    // ...
  },
  setup() {},
}
