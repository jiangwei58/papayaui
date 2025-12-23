import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'
import { isNumber, isString } from '../../utils'

export const menuItemProps = {
  /**
   *  菜单项标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   *  当前选中项对应的 value
   */
  modelValue: [Number, String] as PropType<MenuItemOptionValue>,
  /**
   *  选项数组
   */
  options: {
    type: Array as PropType<MenuItemOption[]>,
    default: () => [],
  },
  /**
   *  是否禁用菜单
   */
  disabled: Boolean,
  /**
   *  标题额外类名
   */
  titleClass: {
    type: String,
    default: '',
  },
}

export const menuItemEmits = {
  'update:modelValue': (value: MenuItemOptionValue) => isNumber(value) || isString(value),
  change: (value: MenuItemOptionValue) => isNumber(value) || isString(value),
}

export interface MenuItemOption {
  /** 文字 */
  text: string
  /** 标识符 */
  value: MenuItemOptionValue
  /** 右侧文字 */
  valueText?: string
}

export type MenuItemOptionValue = number | string

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>
export type MenuItemPropsPublic = ExtractPublicPropTypes<typeof menuItemProps>

export type MenuItemEmits = typeof menuItemEmits
