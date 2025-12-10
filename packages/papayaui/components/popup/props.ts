import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { isBoolean, pick } from '@papayaui/utils'
import { transitionProps } from '../transition/props'

export type PopupPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

export const popupProps = {
  ...pick(transitionProps, ['duration']),
  /**
   * 是否显示
   */
  show: {
    type: Boolean,
    default: false,
  },
  /**
   * z-index层级
   */
  zIndex: {
    type: Number,
    default: 999,
  },
  /**
   * 弹出方式
   */
  position: {
    type: String as PropType<PopupPosition>,
    default: 'bottom',
  },
  /**
   * 是否显示遮罩
   */
  overlay: {
    type: Boolean,
    default: true,
  },
  /**
   * 点击遮罩是否关闭弹窗
   */
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  /**
   * 弹出宽度
   */
  width: String,
  /**
   * 弹窗高度
   */
  height: String,
  /**
   * 背景色
   */
  bgColor: String as PropType<CSSProperties['background-color']>,
  /**
   * 是否圆角
   */
  round: [Boolean, String],
  /**
   * 是否显示关闭按钮
   */
  closeable: Boolean,
  /**
   * 是否适配底部安全区
   */
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否留出顶部安全距离（状态栏高度）
   */
  safeAreaInsetTop: Boolean,
  /**
   * 自定义样式类
   */
  customClass: String,
  /**
   * 自定义弹出层样式
   */
  customStyle: Object as PropType<CSSProperties>,
  /**
   * 内容自定义样式类
   */
  contentClass: String,
  /**
   * 自定义遮罩层样式
   */
  overlayStyle: Object as PropType<CSSProperties>,
}

export const popupEmits = {
  'update:show': (value: PopupProps['show']) => isBoolean(value),
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  clickOverlay: () => true,
}

export type PopupProps = ExtractPropTypes<typeof popupProps>
export type PopupEmits = typeof popupEmits
