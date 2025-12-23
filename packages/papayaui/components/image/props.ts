import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const imageProps = {
  /**
   *  图片资源地址
   */
  src: {
    type: String,
    default: '',
  },
  /**
   *  图片裁剪、缩放的模式[详细地址](https://uniapp.dcloud.net.cn/component/image.html)
   */
  mode: {
    type: String,
    default: 'scaleToFill',
  },
  /**
   *  宽度
   */
  width: [String, Number],
  /**
   *  高度
   */
  height: [String, Number],
  /**
   *  圆角
   */
  round: [Boolean, String],
  /**
   *  图片懒加载
   */
  lazyLoad: Boolean,
  /**
   *  在系统不支持webp的情况下是否单独启用webp。默认false，只支持网络资源。
   */
  webp: Boolean,
  /**
   *  开启长按图片显示识别小程序码菜单
   */
  showMenuByLongpress: Boolean,
}

export const imageEmits = {
  click: () => true,
}

export type ImageProps = ExtractPropTypes<typeof imageProps>
export type ImagePropsPublic = ExtractPublicPropTypes<typeof imageProps>

export type ImageEmits = typeof imageEmits
