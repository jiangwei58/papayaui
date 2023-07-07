import type { ExtractPropTypes, PropType } from 'vue'
import { isUndefined } from '../../utils'
import { CollapseItemValue } from '../collapse-item/props'

export const collapseProps = {
  /**
   * 当前展开面板的 name
   */
  modelValue: [String, Number] as PropType<CollapseItemValue | CollapseItemValue[]>,
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
