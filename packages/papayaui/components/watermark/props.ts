import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'

export const watermarkProps = {
  /**
   * 单个水印宽度
   */
  width: {
    type: Number,
    default: 125,
  },
  /**
   * 单个水印高度
   */
  height: {
    type: Number,
    default: 100,
  },
  /**
   * 水印绘制时，旋转的角度
   */
  rotate: {
    type: Number,
    default: -22,
  },
  /**
   * 水印之间的水平间距
   */
  gapX: {
    type: Number,
    default: 25,
  },
  /**
   * 水印之间的垂直间距
   */
  gapY: {
    type: Number,
    default: 50,
  },
  /**
   * 水印字体大小
   */
  fontColor: {
    type: String,
    default: 'rgba(0,0,0,0.15)',
  },
  /**
   * 水印字体大小
   */
  fontSize: {
    type: Number,
    default: 14,
  },
  /**
   * 水印文字字体
   */
  fontFamily: {
    type: String,
    default: `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif`,
  },
  /**
   * 水印元素层级
   */
  zIndex: {
    type: Number,
    default: 1000,
  },
  /**
   * 水印内容，数组的每个元素代表每一行的内容
   */
  contents: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  /**
   * 是否覆盖整个页面
   */
  fullPage: {
    type: Boolean,
    default: true,
  },
}

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>
export type WatermarkPropsPublic = ExtractPublicPropTypes<typeof watermarkProps>
