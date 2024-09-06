import type { ExtractPropTypes, PropType } from 'vue'
import type { RadioValue } from '../radio/props'
import { isNumber, isString } from '../../utils'

export const radioGroupProps = {
  /**
   * 标识符
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * 值
   */
  modelValue: [String, Number] as PropType<RadioValue>,
  /**
   * 方向
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
  },
  /**
   * 是否全部禁用
   */
  disabled: Boolean,
}

export const radioGroupEmits = {
  'update:modelValue': (value: RadioValue) => isString(value) || isNumber(value),
  change: (value: RadioValue, name: string) =>
    (isString(value) || isNumber(value)) && isString(name),
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupEmits = typeof radioGroupEmits
