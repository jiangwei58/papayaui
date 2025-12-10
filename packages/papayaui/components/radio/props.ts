import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { isNumber, isString } from '@papayaui/utils'

export const radioProps = {
  /**
   * 标识符
   */
  name: {
    type: [String, Number] as PropType<RadioValue>,
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
  checkedColor: String as PropType<CSSProperties['color']>,
}

export const radioEmits = {
  change: (value: RadioValue) => isString(value) || isNumber(value),
}

export type RadioValue = string | number

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioEmits = typeof radioEmits
