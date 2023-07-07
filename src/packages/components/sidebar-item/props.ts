import type { ExtractPropTypes, PropType, SVGAttributes } from 'vue'
import { isNumber, isString, pickProps } from '../../utils'
import { SidebarValue } from '../sidebar/props'
import { badgeProps } from '../badge/props'

export const sidebarItemProps = {
  ...pickProps(badgeProps, ['dot']),
  /**
   * 标题
   */
  title: String,
  /**
   * 当前项标识值
   */
  name: [String, Number] as PropType<SidebarValue>,
  /**
   * 图标右上角徽标的内容
   */
  badge: badgeProps.content,
  /**
   * 是否禁用该项
   */
  disabled: Boolean,
  /**
   * 根节点样式类
   */
  customClass: String,
  /**
   * 根节点样式
   */
  customStyle: [String, Object] as PropType<SVGAttributes['style']>,
}

export const sidebarItemEmits = {
  click: (value: SidebarValue) => isString(value) || isNumber(value),
}

export type SidebarItemProps = ExtractPropTypes<typeof sidebarItemProps>
export type SidebarItemEmits = typeof sidebarItemEmits