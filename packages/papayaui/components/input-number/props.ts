import type { ExtractPropTypes, PropType } from 'vue'
import type { InputNumberValue } from '@papayaui/core'
import type { EventDetail } from '@papayaui/types'
import { isObject } from '@papayaui/utils'

export const inputNumberProps = {
  /**
   * 值
   */
  modelValue: [String, Number] as PropType<InputNumberValue>,
  /**
   * 标识符
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * 输入提示
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * 内容对齐方式
   */
  inputAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },
  /**
   * 输入框宽度
   */
  inputWidth: String,
  /**
   * 最小值
   */
  min: {
    type: [String, Number] as PropType<InputNumberValue>,
    default: 1,
  },
  /**
   * 最大值
   */
  max: {
    type: [String, Number] as PropType<InputNumberValue>,
    default: 9999,
  },
  /**
   * 步长
   */
  step: {
    type: [String, Number] as PropType<InputNumberValue>,
    default: 1,
  },
  /**
   * 整数位长度
   */
  intLength: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER.toString().length,
  },
  /**
   * 小数位长度
   */
  decimalLength: {
    type: Number,
    default: 0,
  },
  /**
   * 只读状态禁用输入框操作行为
   */
  readonly: Boolean,
  /**
   * 禁用所有功能
   */
  disabled: Boolean,
  /**
   * 是否显示控制按钮
   */
  controls: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否开启异步变更，开启后需要手动控制输入值
   */
  asyncChange: Boolean,
  /**
   * 是否为块级元素
   */
  block: Boolean,
  /**
   * 朴素样式
   */
  plain: Boolean,
  /**
   * 是否允许空值
   */
  nullable: Boolean,
  /**
   * 空值时返回的值
   */
  nullValue: {
    type: Object as PropType<any>,
    default: null,
  },
  /**
   * 聚焦时是否全选内容
   */
  selectAllOnFocus: Boolean,
}

export const inputNumberEmits = {
  'update:modelValue': (_value: number, _name?: string) => true,
  change: (_value: number, _name?: string) => true,
  focus: (value: EventDetail<{ value: InputNumberValue; height: number }>) => isObject(value),
  blur: (value: EventDetail<{ value: InputNumberValue; cursor: number }>) => isObject(value),
}

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
export type InputNumberEmits = typeof inputNumberEmits
