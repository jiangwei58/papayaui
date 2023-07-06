import type { ExtractPropTypes, PropType } from 'vue'

export const watermarkProps = {
  /**
   * 单个水印宽度
   */
  width: {
    type: Number,
    default: 150,
  },
  /**
   * 单个水印高度
   */
  height: {
    type: Number,
    default: 150,
  },
  /**
   * 水印绘制时，旋转的角度
   */
  rotate: {
    type: Number,
    default: -20,
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
}

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>
