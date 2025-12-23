import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'

export type SegmentedValue = string | number

export interface SegmentedOption {
  /**
   * 选项的值
   */
  value: SegmentedValue
  /**
   * 选项的文本
   */
  label: string
  /**
   * 选项是否禁用
   */
  disabled?: boolean
  /**
   * 选项的图标
   */
  icon?: string
}

export const segmentedProps = {
  /**
   * 当前选中的值
   */
  modelValue: {
    type: [String, Number] as PropType<SegmentedValue>,
  },
  /**
   * 选项数据
   */
  options: {
    type: Array as PropType<SegmentedOption[] | SegmentedValue[]>,
    default: () => [],
  },
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否为块级元素
   */
  block: Boolean,
  /**
   * 尺寸大小
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
}

export const segmentedEmits = {
  'update:modelValue': (_value: SegmentedValue) => true,
  change: (_value: SegmentedValue) => true,
}

export type SegmentedProps = ExtractPropTypes<typeof segmentedProps>
export type SegmentedPropsPublic = ExtractPublicPropTypes<typeof segmentedProps>

export type SegmentedEmits = typeof segmentedEmits
