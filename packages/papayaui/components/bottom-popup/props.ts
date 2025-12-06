import type { ExtractPropTypes } from 'vue'
import { pick } from '../../utils'
import { popupEmits, popupProps } from '../popup/props'

export const bottomPopupProps = {
  ...pick(popupProps, [
    'show',
    'zIndex',
    'overlay',
    'bgColor',
    'safeAreaInsetBottom',
    'closeOnClickOverlay',
    'duration',
  ]),
  /**
   * 标题
   */
  title: String,
  /**
   * 弹窗高度
   */
  height: {
    type: popupProps.height,
    default: '80vh',
  },
  /**
   * 是否圆角
   */
  round: {
    type: popupProps.round,
    default: true,
  },
  /**
   * 是否显示关闭按钮
   */
  closeable: {
    type: popupProps.closeable,
    default: true,
  },
  /**
   * 是否可以点击空白处关闭
   * @deprecated 即将移除，统一使用 `closeOnClickOverlay`属性
   */
  maskCloseAble: popupProps.closeOnClickOverlay,
}

export const bottomPopupEmits = {
  ...popupEmits,
}

export type BottomPopupProps = ExtractPropTypes<typeof bottomPopupProps>
export type BottomPopupEmits = typeof bottomPopupEmits
