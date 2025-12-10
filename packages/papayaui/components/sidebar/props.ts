import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'
import { isNumber, isString } from '@papayaui/utils'

export const sidebarProps = {
  /**
   * 选择项值
   */
  modelValue: [String, Number] as PropType<SidebarValue>,
  /**
   * 根节点样式类
   */
  customClass: String,
  /**
   * 根节点样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
}

export const sidebarEmits = {
  'update:modelValue': (value: SidebarValue) => isString(value) || isNumber(value),
  change: (value: SidebarValue) => isString(value) || isNumber(value),
}

export type SidebarValue = string | number

export type SidebarProps = ExtractPropTypes<typeof sidebarProps>
export type SidebarEmits = typeof sidebarEmits
