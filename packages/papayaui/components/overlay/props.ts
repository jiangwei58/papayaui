import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { transitionProps } from '../transition/props'

export const overlayProps = {
  /**
   * 是否展示遮罩层
   */
  show: Boolean,
  /**
   * z-index 层级
   */
  zIndex: {
    type: Number,
    default: 1,
  },
  /**
   * 动画时长，单位毫秒
   */
  duration: transitionProps.duration,
  /**
   * 自定义class
   */
  customClass: String,
  /**
   * 自定义style
   */
  customStyle: Object as PropType<CSSProperties>,
}

export const overlayEmits = {
  click: () => true,
}

export type OverlayProps = ExtractPropTypes<typeof overlayProps>
export type OverlayEmits = typeof overlayEmits
