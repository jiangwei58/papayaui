import type { ExtractPropTypes, PropType } from 'vue'
import { isObject, isUndefined, isNumber } from '../../utils'

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
  modelValue: [String, Number, Boolean] as PropType<CheckboxButtonValue>,
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
  bgColor: {
    type: String,
    default: '#F2F3F5',
  },
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
  'update:modelValue': (value: CheckboxButtonValue) => !isUndefined(value),
  change: (item: CheckboxItem, index: number) => isObject(item) && isNumber(index),
}

export type CheckboxButtonsProps = ExtractPropTypes<typeof checkboxButtonsProps>
export type CheckboxButtonsEmit = typeof checkboxButtonsEmits
