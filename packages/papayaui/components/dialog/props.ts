import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'
import { pick } from '../../utils'
import { popupEmits, popupProps } from '../popup'

export type ActionType = 'confirm' | 'cancel'

export const dialogProps = {
  ...pick(popupProps, ['zIndex', 'duration', 'closeOnClickOverlay', 'overlay', 'overlayStyle']),
  /**
   * 是否显示弹窗
   */
  show: Boolean,
  /**
   * 标题
   */
  title: String,
  /**
   * 弹窗宽度，默认单位为px
   */
  width: {
    type: [String, Number],
    default: 320,
  },
  /**
   * 文本内容，支持通过\n换行
   */
  message: String,
  /**
   * 内容对齐方式，可选值为left right
   */
  messageAlign: String as PropType<'left' | 'center' | 'right'>,
  /**
   * 样式风格
   */
  theme: {
    type: String as PropType<'default' | 'round-button'>,
    default: 'default',
  },
  /**
   * 是否显示确认按钮
   */
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示取消按钮
   */
  showCancelButton: Boolean,
  /**
   * 确认按钮的文本
   */
  confirmButtonText: {
    type: String,
    default: '确认',
  },
  /**
   * 取消按钮的文本
   */
  cancelButtonText: {
    type: String,
    default: '取消',
  },
  /**
   * 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise
   */
  beforeClose: Function as PropType<(action: ActionType) => boolean | Promise<boolean>>,
}

export const dialogEmits = {
  ...popupEmits,
  confirm: () => true,
  cancel: () => true,
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogPropsPublic = ExtractPublicPropTypes<typeof dialogProps>

export type DialogEmits = typeof dialogEmits
