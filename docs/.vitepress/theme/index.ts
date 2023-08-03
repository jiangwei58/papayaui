// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import Simulator from './Simulator.vue'
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
  enhanceApp({ app, router, siteData }) {
    // ...
  },
}
