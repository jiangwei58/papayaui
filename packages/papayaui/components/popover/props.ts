import type { ExtractPropTypes, PropType } from 'vue'
import { isUndefined } from '@papayaui/utils'
import { iconProps } from '../icon'

export type PopoverTheme = 'light' | 'dark'
export type PopoverPlacement = 'bottom'

export interface PopoverAction {
  /** 选项文字 */
  text: string
  /** 文字左侧的图标，支持传入图标名称或图片链接，等同于 Icon 组件的 name 属性 */
  icon?: string
  /** 选项文字颜色 */
  color?: string
  /** 是否为禁用状态 */
  disabled?: boolean
}

export const popoverProps = {
  /**
   * 选项列表
   */
  actions: {
    type: Array as PropType<PopoverAction[]>,
    default: () => [],
  },
  /**
   * 浮窗层级
   */
  zIndex: {
    type: Number,
    default: 9,
  },
  /**
   * 主题
   */
  theme: {
    type: String as PropType<PopoverTheme>,
    default: 'light',
  },
  /**
   * 弹出位置
   */
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: 'bottom',
  },
  /**
   * 出现位置的偏移量
   */
  offset: {
    type: Object as PropType<[number, number]>,
    default: () => [0, 8],
  },
  /**
   * 是否在点击选项后关闭
   */
  closeOnClickAction: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否在点击遮罩层后关闭菜单
   */
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  /**
   * 图标类名前缀，等同于 Icon 组件的 class-prefix 属性
   */
  iconPrefix: iconProps.classPrefix,
}

export const popoverEmits = {
  select: (action: PopoverAction, _index: number) => !isUndefined(action),
  'click-overlay': () => true,
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>
export type PopoverEmits = typeof popoverEmits
