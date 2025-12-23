import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const stickyProps = {
  /**
   * 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
   */
  offsetTop: {
    type: [String, Number],
    default: 0,
  },
  /**
   * 自定义导航栏的高度
   */
  customNavHeight: {
    type: [String, Number],
    default: 0,
  },
  /**
   * 是否开启吸顶功能
   */
  disabled: Boolean,
  /**
   * z-index值
   */
  zIndex: [String, Number],
  /**
   * 列表中的索引值
   */
  index: [String, Number],
  /**
   * 是否使用css模式，同position: sticky属性实现效果一致
   */
  cssSticky: {
    type: Boolean,
    default: true,
  },
}

export type StickyProps = ExtractPropTypes<typeof stickyProps>
export type StickyPropsPublic = ExtractPublicPropTypes<typeof stickyProps>
