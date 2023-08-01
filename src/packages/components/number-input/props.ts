import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { EventDetail } from '../../types'
import { isObject, isString } from '../../utils'

export const numberInputProps = {
  modelValue: {
    type: [String, Number],
    default: '',
  },
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 输入提示
   */
  placeholder: {
    type: String,
    default: '请输入',
  },
  /**
   * 内容对齐方式
   */
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right',
  },
  /**
   * 最小值
   */
  min: Number,
  /**
   * 最大值
   */
  max: Number,
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
  precision: Number,
  /**
   * 获取焦点
   */
  focus: Boolean,
  /**
   * 键盘收起时，是否自动失去焦点
   */
  autoBlur: Boolean,
  /**
   * 键盘弹起时，是否自动上推页面
   */
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  /**
   * 定义需要用到的外部样式
   */
  customStyle: Object as PropType<CSSProperties>,
}

export const numberInputEmits = {
  'update:modelValue': (value: string) => isString(value),
  focus: (value: EventDetail<{ value: NumberInputProps['modelValue']; height: number }>) =>
    isObject(value),
  blur: (value: EventDetail<{ value: NumberInputProps['modelValue']; cursor: number }>) =>
    isObject(value),
  confirm: (value: EventDetail<{ value: NumberInputProps['modelValue'] }>) => isObject(value),
}

export type NumberInputProps = ExtractPropTypes<typeof numberInputProps>
export type NumberInputEmits = typeof numberInputEmits
