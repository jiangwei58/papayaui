import type { ExtractPropTypes, PropType } from 'vue'
import { isArray } from '@papayaui/utils'

export const pickerViewProps = {
  /**
   * 选中项下标列表
   */
  modelValue: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  /**
   * 多列的选项列表
   */
  columns: {
    type: Array as PropType<PickerViewColumnItem[]>,
    default: () => [],
  },
  /**
   * 是否显示头部操作栏
   */
  showToolbar: {
    type: Boolean,
    default: true,
  },
  /**
   * 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 弹窗高度
   */
  height: {
    type: String,
    default: '50vh',
  },
  /**
   * 值对应的key
   */
  valueKey: {
    type: String,
    default: 'text',
  },
  /**
   * 默认选中项下标
   */
  defaultIndex: {
    type: Number,
    default: 0,
  },
}

export const pickerViewEmits = {
  'update:modelValue': (value: number[]) => isArray(value),
  change: (value: number[]) => isArray(value),
  confirm: (value: number[]) => isArray(value),
  cancel: () => true,
}

export type PickerViewColumnItem = string | Record<string, any>

export type PickerViewProps = ExtractPropTypes<typeof pickerViewProps>
export type PickerViewEmits = typeof pickerViewEmits
