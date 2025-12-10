import type { ExtractPropTypes, PropType } from 'vue'
import type { FormRuleItem } from '@papayaui/core'
import { pick } from '@papayaui/utils'
import { cellProps } from '../cell'

export const formItemProps = {
  ...pick(cellProps, ['titleWidth', 'suffix']),
  /**
   * 校验对应的字段名
   */
  prop: String,
  /**
   * 标签名
   */
  label: String,
  /**
   * 描述信息
   */
  desc: String,
  /**
   * 校验规则
   */
  rules: [Object, Array] as PropType<FormRuleItem | FormRuleItem[]>,
}

export const formItemEmits = {
  click: () => true,
}

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FormItemEmits = typeof formItemEmits
