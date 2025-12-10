import type { ExtractPropTypes, PropType, Ref } from 'vue'
import { isUndefined } from '@papayaui/utils'
import type { CollapseItemInstance, CollapseItemValue } from '../collapse-item/props'

export const collapseProps = {
  /**
   * 当前展开面板的 name
   */
  modelValue: [String, Number, Array] as PropType<CollapseItemValue | CollapseItemValue[]>,
  /**
   * 是否开启手风琴模式
   */
  accordion: Boolean,
  /**
   * 是否显示外边框
   */
  border: {
    type: Boolean,
    default: true,
  },
}

export const collapseEmits = {
  'update:modelValue': (value: NonNullable<CollapseProps['modelValue']>) => !isUndefined(value),
  change: (value: NonNullable<CollapseProps['modelValue']>) => !isUndefined(value),
  open: (name: CollapseItemValue) => !isUndefined(name),
  close: (name: CollapseItemValue) => !isUndefined(name),
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseEmits = typeof collapseEmits

export type CollapseExpose = {
  children: Ref<CollapseItemInstance[]>
  modelValue: Ref<CollapseItemValue | CollapseItemValue[] | undefined>
  onChange: (name: CollapseItemValue, expanded: boolean) => void
}
