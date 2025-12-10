import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber } from '@papayaui/utils'

export type CheckboxItem = any
export type CheckboxButtonValue = any

export const checkboxButtonsProps = {
  /**
   * 列数
   */
  column: {
    type: Number,
    default: 3,
  },
  /**
   * 间隔
   */
  gap: {
    type: [String, Number],
    default: 20,
  },
  /**
   * 选中值
   */
  modelValue: [String, Number, Boolean, Array] as PropType<
    CheckboxButtonValue | CheckboxButtonValue[]
  >,
  /**
   * 选项列表
   */
  options: {
    type: Array as PropType<CheckboxItem[]>,
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
   * 内容对应字段名
   */
  valueKey: {
    type: String,
    default: 'value',
  },
  /**
   * 是否多选
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 背景色
   */
  bgColor: String,
  /**
   * 圆角大小, 值为true时半圆角
   */
  round: {
    type: [Boolean, String],
    default: '4rpx',
  },
  /**
   * 是否支持反选
   * @description 仅在单选时有效，多选强制支持反选
   */
  inverse: {
    type: Boolean,
    default: true,
  },
}

export const checkboxButtonsEmits = {
  'update:modelValue': (_value: CheckboxButtonValue | CheckboxButtonValue[]) => true,
  change: (_item: CheckboxItem | CheckboxItem[], index: number) => isNumber(index),
}

export type CheckboxButtonsProps = ExtractPropTypes<typeof checkboxButtonsProps>
export type CheckboxButtonsEmits = typeof checkboxButtonsEmits
