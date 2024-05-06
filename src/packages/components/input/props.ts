import type { ExtractPropTypes, PropType } from 'vue'
import { isString } from '../../utils'
import { cellProps } from '../cell'

export type InputType = 'text' | 'number'
export type InputValue = string | number

const inputNumberProps = {
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
  intLength: Number,
  /**
   * 小数位长度
   */
  decimalLength: Number,
}

export const inputProps = {
  /**
   * 值
   */
  modelValue: [String, Number] as PropType<InputValue>,
  /**
   * 标识符
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * 输入框类型
   */
  type: {
    type: String as PropType<InputType>,
    default: 'text',
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
  inputAlign: cellProps.valueAlign,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否只读
   */
  readonly: Boolean,
  /**
   * 是否显示清除控件
   */
  clearable: Boolean,
  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   */
  maxLength: {
    type: Number,
    default: -1,
  },
  /**
   * 聚焦时是否全选内容
   */
  selectAllOnFocus: Boolean,
  /**
   * 输入格式化函数
   */
  formatter: Function as PropType<(value: string, trigger: 'input' | 'blur') => string>,
  /**
   * 设置键盘右下角按钮的文字，仅在 type="text" 时生效
   */
  confirmType: String,
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起
   */
  confirmHold: Boolean,
  /**
   * 键盘弹起时，是否自动上推页面
   */
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  /**
   * 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)
   */
  alwaysEmbed: Boolean,
  /**
   * focus时，点击页面的时候不收起键盘
   */
  holdKeyboard: Boolean,
  ...inputNumberProps,
}

export const inputEmits = {
  'update:modelValue': (value: InputValue) => isString(value),
  blur: (_event: any) => true,
  click: (_event: any) => true,
  'click-input': (_event: any) => true,
  focus: (_event: any) => true,
  clear: () => true,
}

export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputEmits = typeof inputEmits
