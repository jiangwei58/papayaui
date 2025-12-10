import type { ExtractPropTypes, PropType } from 'vue'
import type { CheckboxValue } from '../checkbox/props'
import { isArray, isString } from '@papayaui/utils'

export const checkboxGroupProps = {
  /**
   *  标识符
   */
  name: {
    type: String,
    default: '',
  },
  /**
   *  值
   */
  modelValue: Array as PropType<CheckboxValue[]>,
  /**
   *  方向
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
  },
  /**
   *  是否全部禁用
   */
  disabled: Boolean,
  /**
   *  限制选择的数量
   */
  max: Number,
}

export const checkboxGroupEmits = {
  'update:modelValue': (value: CheckboxValue[]) => isArray(value),
  change: (value: CheckboxValue[], name: string) => isArray(value) && isString(name),
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits
