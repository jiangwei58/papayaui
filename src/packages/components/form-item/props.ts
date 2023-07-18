import type { ExtractPropTypes, PropType } from 'vue'
import type { FormRuleItem } from '../../core/useForm'

export const formItemProps = {
  /**
   * 校验对应的字段名
   */
  prop: String,
  /**
   * 标签名
   */
  label: String,
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
