import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { TreeNode, UseTreeFieldNames } from '../../core/useTree'
import { defaultFieldNames } from '../../core/useTree'
import { isArray, isObject } from '../../utils'
import { bottomPopupEmits, bottomPopupProps } from '../bottom-popup/props'
import type { SearchProps } from '../search'

export interface CascaderNode<T = any> {
  props: T
  level: number
}

export type CascaderOption = any
export type CascaderValue = any

export const cascaderProps = {
  ...bottomPopupProps,
  /**
   * 值
   */
  modelValue: Array as PropType<CascaderValue[]>,
  /**
   * 可选项数据源
   */
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => [],
  },
  /**
   * 自定义 options 结构中的字段
   */
  fieldNames: {
    type: Object as PropType<Partial<UseTreeFieldNames<CascaderOption>>>,
    default: () => defaultFieldNames,
  },
  /**
   * 最大层级，把哪一层级作为叶子节点
   */
  maxLevel: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  /**
   * 是否多选
   */
  multiple: {
    type: Boolean,
    default: false,
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
   * 动态获取下一级节点数据
   */
  lazyLoad: Function as PropType<
    (node: CascaderNode) => CascaderOption[] | Promise<CascaderOption[]>
  >,
  /**
   * 远程搜索
   */
  lazySearch: Function as PropType<
    (searchText: string) => CascaderOption[] | Promise<CascaderOption[]>
  >,
  /**
   * 确定按钮文案，多选时默认数量显示的文案也要自己定义
   */
  confirmButtonText: String,
  /**
   * 重置按钮文案
   */
  resetButtonText: {
    type: String,
    default: '重置',
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
   * 是否显示底部确认重置按钮，多选时强制开启
   */
  showConfirm: Boolean,
  /**
   * 是否允许空值，只在显示底部操作按钮时有效（通常使用场景是未选中值时允许确认）
   */
  allowEmpty: Boolean,
  /**
   * 列表项的样式类
   */
  itemClass: String,
  /**
   * 列表项的样式
   */
  itemStyle: [String, Object] as PropType<string | CSSProperties>,
}

export const cascaderEmits = {
  ...bottomPopupEmits,
  'update:modelValue': (value: CascaderValue[]) => isArray(value),
  change: (
    value: CascaderValue[],
    _items: CascaderOption[],
    _extra: { tabIndex: number; isSearch: boolean },
  ) => isArray(value),
  reset: () => true,
  confirm: () => true,
  nodeClick: (node: TreeNode<CascaderOption>) => isObject(node),
}

export const cascaderSearchViewProps = {
  show: Boolean,
  options: {
    type: Array as PropType<CascaderOption[]>,
    required: true,
  },
  fieldNames: {
    type: Object as PropType<UseTreeFieldNames<CascaderOption>>,
    required: true,
  },
  searchText: {
    type: String,
    required: true,
  },
  emptyText: {
    type: String,
    required: true,
  },
  lazySearch: Function as PropType<
    (searchText: string) => CascaderOption[] | Promise<CascaderOption[]>
  >,
  isSelected: {
    type: Function as PropType<(value: CascaderValue) => boolean>,
    required: true,
  },
  safeAreaInsetBottom: Boolean,
  maxLevel: cascaderProps.maxLevel,
} as const

export interface SearchNode extends TreeNode<CascaderOption> {
  __label: string
  __remoteSearch: boolean
}

export const cascaderSearchViewEmits = {
  select: (item: SearchNode) => isObject(item),
}

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>
export type CascaderEmits = typeof cascaderEmits

export type CascaderSearchViewProps = ExtractPropTypes<typeof cascaderSearchViewProps>
export type CascaderSearchViewEmits = typeof cascaderSearchViewEmits
