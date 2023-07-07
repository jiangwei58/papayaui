import { ExtractPropTypes } from 'vue'
import { cellProps } from '../cell/props'
import { isString } from '../../utils'

export const textareaProps = {
  /** 值 */
  modelValue: String,
  /** 设置占位提示文字 */
  placeholder: {
    type: String,
    default: '请输入',
  },
  /** 输入框高度 */
  height: {
    type: String,
    default: '70px',
  },
  /** 值对齐方式 */
  inputAlign: {
    type: cellProps.valueAlign.type,
    default: 'left',
  },
  /** 是否只读 */
  readonly: Boolean,
  /** 是否禁用 */
  disabled: Boolean,
  /** 最大输入长度，设置为 -1 的时候不限制最大长度 */
  maxlength: {
    type: Number,
    default: 140,
  },
  /** 是否自动增高，设置auto-height时，style.height不生效 */
  autoHeight: {
    type: Boolean,
    default: false,
  },
  /** 是否显示统计字数 */
  showCount: Boolean,
  /** 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效 */
  confirmType: String,
  /** 是否自动获取焦点 */
  focus: Boolean,
  /** 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true */
  fixed: Boolean,
  /** 指定光标与键盘的距离 */
  cursorSpacing: {
    type: Number,
    default: 0,
  },
  /** 指定focus时的光标位置 */
  cursor: Number,
  /** 是否显示键盘上方带有”完成“按钮那一栏 */
  showConfirmBar: {
    type: Boolean,
    default: true,
  },
  /** 光标起始位置，自动聚焦时有效，需与selection-end搭配使用 */
  selectionStart: {
    type: Number,
    default: -1,
  },
  /** 光标结束位置，自动聚焦时有效，需与selection-start搭配使用 */
  selectionEnd: {
    type: Number,
    default: -1,
  },
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  /** 是否去掉 iOS 下的默认内边距，只微信小程序有效 */
  disableDefaultPadding: Boolean,
  /** focus时，点击页面的时候不收起键盘，只微信小程序有效 */
  holdKeyboard: Boolean,
}

export const textareaEmits = {
  'update:modelValue': (value: string) => isString(value),
  input: (_value: Event) => true,
  focus: (_value: Event) => true,
  blur: (_value: Event) => true,
  confirm: (_value: Event) => true,
  linechange: (_value: Event) => true,
  keyboardheightchange: (_value: Event) => true,
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export type TextareaEmits = typeof textareaEmits
