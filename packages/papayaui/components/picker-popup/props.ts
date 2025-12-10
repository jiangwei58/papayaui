import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { UseListProps } from '@papayaui/core'
import { isArray, isNumber, isString, isUndefined } from '@papayaui/utils'
import { bottomPopupEmits, bottomPopupProps } from '../bottom-popup/props'
import type { SearchProps } from '../search'

export type Option = any
export type OptionValue = number | string

export const pickerPopupProps = {
  ...bottomPopupProps,
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
   * 搜索框的props
   */
  searchProps: {
    type: Object as PropType<Partial<SearchProps>>,
    default: () => ({}),
  },
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
   * 数据为空时的提示文案
   */
  emptyText: {
    type: String,
    default: '无数据',
  },
  /**
   * 确定后是否重置数据
   */
  resetAfterConfirm: Boolean,
  /**
   * 是否显示确认按钮，多选时强制开启
   */
  showConfirm: Boolean,
  /**
   * 是否允许用户创建新条目，需配合 showSearch 使用
   */
  allowCreate: Boolean,
  /**
   * 创建前处理
   */
  beforeCreate: Function as PropType<(text: string) => Option | Promise<Option>>,
  /**
   * 列表项的样式类
   */
  itemClass: String,
  /**
   * 列表项的样式
   */
  itemStyle: [String, Object] as PropType<string | CSSProperties>,
}

export const pickerPopupEmits = {
  ...bottomPopupEmits,
  'update:modelValue': (value: OptionValue | OptionValue[]) =>
    isString(value) || isNumber(value) || isArray(value),
  select: (value: OptionValue, _item: Option) => !isUndefined(value),
  change: (item: Option | Option[]) => !isUndefined(item),
  /**
   * 新增选项
   */
  create: (text: string) => isString(text),
}

export type PickerPopupProps = ExtractPropTypes<typeof pickerPopupProps>
export type PickerPopupEmits = typeof pickerPopupEmits
