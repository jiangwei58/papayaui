import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber, isObject, isString } from '../../utils'

export const tabsProps = {
  /**
   * 值
   */
  modelValue: {
    type: [String, Number] as PropType<TabItemValue>,
    default: 0,
  },
  /**
   * 标签页列表数据
   */
  tabs: {
    type: Array as PropType<TabItem[]>,
    default: () => [],
  },
  /**
   * 标题对应字段名
   */
  labelKey: {
    type: String,
    default: 'label',
  },
  /**
   * 值对应字段名
   */
  valueKey: String,
  /**
   * 是否滚动
   */
  scrollable: Boolean,
  /**
   * 是否开启左侧收缩布局
   */
  shrink: Boolean,
}

export const tabsEmits = {
  'update:modelValue': (current: TabItemValue) => isString(current) || isNumber(current),
  change: (item: TabItem) => isObject(item),
}

export type TabItem = any

export type TabItemValue = number | string

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsEmits = typeof tabsEmits
