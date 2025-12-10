import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { SwitchValue } from '@papayaui/core'

export const switchProps = {
  /**
   * 开关状态
   */
  modelValue: {
    type: [String, Number, Boolean] as PropType<SwitchValue>,
    default: false,
  },
  /**
   * 打开时组件的值
   */
  activeValue: {
    type: [String, Number, Boolean] as PropType<SwitchValue>,
    default: true,
  },
  /**
   * 关闭组件的值
   */
  inactiveValue: {
    type: [String, Number, Boolean] as PropType<SwitchValue>,
    default: false,
  },
  /**
   * 打开时的背景颜色
   */
  activeColor: String as PropType<CSSProperties['background-color']>,
  /**
   * 关闭时的背景颜色
   */
  inactiveColor: String as PropType<CSSProperties['background-color']>,
  /**
   * 禁用状态
   */
  loading: Boolean,
  /**
   * 加载状态
   */
  disabled: Boolean,
  /**
   * 开关尺寸
   */
  size: String,
}

export const switchEmits = {
  'update:modelValue': (_value: SwitchValue) => true,
  change: (_value: SwitchValue) => true,
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchEmits = typeof switchEmits
