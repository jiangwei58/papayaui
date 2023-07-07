import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { fieldProps } from '../field/props'
import { isObject, isString, pickProps } from '../../utils'
import { EventDetail } from '../../types'

export const searchProps = {
  ...pickProps(fieldProps, ['disabled', 'readonly']),
  /**
   * 值
   */
  modelValue: String,
  /**
   * 搜索框形状
   */
  shape: {
    type: String as PropType<'square' | 'round'>,
    default: 'square',
  },
  /**
   * 输入提示
   */
  placeholder: {
    type: fieldProps.placeholder.type,
    default: '请输入搜索关键词',
  },
  /**
   * 是否显示清除控件
   */
  clearable: {
    type: fieldProps.clearable,
    default: true,
  },
  /**
   * 输入内容对齐方式
   */
  inputAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left',
  },
  /**
   * 搜索框背景色
   */
  background: String as PropType<CSSProperties['background-color']>,
  /**
   * 搜索框内部背景色
   */
  inputBackground: String as PropType<CSSProperties['background-color']>,
}

export const searchEmits = {
  'update:modelValue': (value: string) => isString(value),
  change: (value: string) => isString(value),
  confirm: (value: EventDetail<{ value: string }>) => isObject(value),
  clear: () => true,
  'click-input': () => true,
}

export type SearchProps = ExtractPropTypes<typeof searchProps>
export type SearchEmits = typeof searchEmits
