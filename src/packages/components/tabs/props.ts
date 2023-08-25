import type { ExtractPropTypes, PropType, Ref } from 'vue'
import { isNumber, isObject, isString } from '../../utils'
import type { TabPaneProps } from '../tab-pane/props'
import type { IncludeRefs } from '../../types'

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
  tabs: Array as PropType<object[]>,
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
   * 动画时间，单位秒
   */
  duration: {
    type: Number,
    default: 0.3,
  },
  /**
   * 底部条宽度，默认单位px
   */
  lineWidth: [String, Number],
  /**
   * 底部条宽度，默认单位px
   */
  lineHeight: [String, Number],
  /**
   * 是否滚动
   */
  scrollable: Boolean,
  /**
   * 是否开启切换标签内容时的转场动画
   */
  animated: Boolean,
  /**
   * 是否开启左侧收缩布局
   */
  shrink: Boolean,
}

export const tabsEmits = {
  'update:modelValue': (current: TabItemValue) => isString(current) || isNumber(current),
  change: (item: any) => isObject(item),
  click: (item: any) => isObject(item),
}

export type TabItem = Required<TabPaneProps>
export type TabItemValue = TabItem['name']

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsEmits = typeof tabsEmits

export type TabsExpose = {
  children: Ref<IncludeRefs<TabItem>[]>
  onChange: (name: string | number) => void
}
