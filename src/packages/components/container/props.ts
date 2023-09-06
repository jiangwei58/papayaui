import type { ExtractPropTypes } from 'vue'
import { watermarkProps } from '../watermark/props'

export const containerProps = {
  /**
   * 是否填充底部安全区
   */
  safeBottom: {
    type: Boolean,
    default: true,
  },
  /**
   * 头部背景色
   */
  headerBgColor: {
    type: String,
    default: 'transparent',
  },
  /**
   * 背景色
   */
  bgColor: {
    type: String,
    default: 'transparent',
  },
  /**
   * z-index 层级
   */
  zIndex: Number,
  /**
   * 是否显示水印
   */
  showWatermark: Boolean,
  /**
   * 水印内容
   */
  watermarkContents: watermarkProps.contents,
  /**
   * 是否局部内容布局，默认内容在页面，使用页面滚动；如需内容区只占中间部分设为true
   */
  partialContent: Boolean,
  /**
   * 是否使用自定义头部的插槽
   */
  useHeaderSlot: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否使用自定义底部的插槽
   */
  useFooterSlot: {
    type: Boolean,
    default: true,
  },
}

export type ContainerProps = ExtractPropTypes<typeof containerProps>
