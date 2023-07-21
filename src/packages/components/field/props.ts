import type { ExtractPropTypes, PropType } from 'vue'
import type { EventDetail } from '../../types'
import { isObject, isString, pick } from '../../utils'
import { cellProps } from '../cell/props'

export const fieldProps = {
  ...pick(cellProps, [
    'title',
    'titleWidth',
    'valueAlign',
    'required',
    'icon',
    'center',
    'errorMessage',
  ]),
  /**
   * 值
   */
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * 输入框类型
   */
  type: {
    type: String as PropType<'text' | 'number' | 'idcard' | 'textarea' | 'digit'>,
    default: 'text',
  },
  /**
   * 输入提示
   */
  placeholder: {
    type: String,
    default: '请输入',
  },
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
   * 是否只用输入框（主要用于表单情况）
   */
  onlyInput: Boolean,
  /**
   * 自动高度（textarea生效）
   */
  autoHeight: Boolean,
  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   */
  maxlength: {
    type: Number,
    default: -1,
  },
  /**
   * 获取焦点
   */
  focus: Boolean,
  /**
   * 设置键盘右下角按钮的文字，仅在 type="text" 时生效
   */
  confirmType: String,
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起
   */
  confirmHold: Boolean,
  /**
   * 指定focus时的光标位置
   */
  cursor: Number,
  /**
   * 光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: Number,
  /**
   * 光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: Number,
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
  /**
   * 高度（textarea生效）
   */
  height: {
    type: String,
    default: '75px',
  },
}

export const fieldEmits = {
  'update:modelValue': (value: string) => isString(value),
  input: (value: string) => isString(value),
  blur: (value: FocusEvent) => isObject(value),
  confirm: (value: EventDetail<{ value: string }>) => isObject(value),
  clear: () => true,
  'click-input': (value: Event) => isObject(value),
}

export type FieldProps = ExtractPropTypes<typeof fieldProps>
export type FieldEmits = typeof fieldEmits
