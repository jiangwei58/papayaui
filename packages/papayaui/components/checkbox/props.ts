import type { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'
import { isBoolean, isUndefined } from '../../utils'

export const checkboxProps = {
  /**
   * 是否选中
   */
  modelValue: Boolean,
  /**
   * 标识符
   */
  name: {
    type: [String, Number, Boolean] as PropType<CheckboxValue>,
    default: '',
  },
  /**
   * 形状
   */
  shape: {
    type: String as PropType<'square' | 'round'>,
    default: 'round',
  },
  /**
   * 是否为禁用状态
   */
  disabled: Boolean,
  /**
   * 是否禁用文本内容点击
   */
  labelDisabled: Boolean,
  /**
   * 文本位置
   */
  labelPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },
  /**
   * 图标大小
   */
  iconSize: {
    type: [String, Number],
    default: '20px',
  },
  /**
   * 选中状态颜色
   */
  checkedColor: [String, Number] as PropType<CSSProperties['color']>,
  /**
   * 当前是否支持半选状态，一般用在全选操作中
   */
  indeterminate: Boolean,
}

export const checkboxEmits = {
  'update:modelValue': (value: boolean) => isBoolean(value),
  change: (value: boolean, name: CheckboxValue) => isBoolean(value) && !isUndefined(name),
}

export type CheckboxValue = string | number | boolean

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxPropsPublic = ExtractPublicPropTypes<typeof checkboxProps>

export type CheckboxEmits = typeof checkboxEmits
