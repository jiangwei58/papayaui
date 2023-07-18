import type { ExtractPropTypes, PropType } from 'vue'
import type { UseListProps } from '../../core/useList'
import { isArray, isNumber, isObject, isString, pickProps } from '../../utils'
import { bottomPopupEmits, bottomPopupProps } from '../bottom-popup/props'

export type Option = any
export type OptionValue = number | string

export const pickerPopupProps = {
  ...pickProps(bottomPopupProps, ['show', 'height', 'title', 'safeAreaInsetBottom']),
  /**
   * 选择的值
   */
  modelValue: [Number, String, Array] as PropType<OptionValue | OptionValue[]>,
  /**
   * 选项数据
   */
  data: {
    type: Array as PropType<Option[]>,
    default: () => [],
  },
  /**
   * 数据标题的字段名
   */
  labelKey: {
    type: String,
    default: 'label',
  },
  /**
   * 数据值的字段名
   */
  valueKey: {
    type: String,
    default: 'value',
  },
  /**
   * 是否显示搜索
   */
  showSearch: Boolean,
  /**
   * 是否多选
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 动态获取下一级节点数据
   */
  load: Function as PropType<
    (
      query?: string,
      pageNumber?: number,
      pageSize?: number,
      extra?: Record<string, unknown>,
    ) => Option[] | Promise<Option[]>
  >,
  /**
   * 是否远程搜索
   */
  remote: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否支持分页
   */
  pagination: {
    type: [Boolean, Object] as PropType<boolean | UseListProps<Option>>,
    default: false,
  },
  /**
   * 每次打开重新加载数据
   */
  initData: Boolean,
  /**
   * 确认按钮的文案
   */
  confirmButtonText: {
    type: String,
    default: '确定',
  },
  /**
   * 确定后是否重置数据
   */
  resetAfterConfirm: Boolean,
}

export const pickerPopupEmits = {
  ...bottomPopupEmits,
  'update:modelValue': (value: OptionValue | OptionValue[]) =>
    isString(value) || isNumber(value) || isArray(value),
  change: (item: Option | Option[]) => isObject(item) || isArray(item),
}

export type PickerPopupProps = ExtractPropTypes<typeof pickerPopupProps>
export type PickerPopupEmits = typeof pickerPopupEmits
