import type { ExtractPropTypes, PropType } from 'vue'
import { FormRules } from '../../core/useForm'

export const formProps = {
  /**
   * 表单数据
   */
  form: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  /**
   * 校验规则
   */
  rules: {
    type: Object as PropType<FormRules<any>>,
    default: () => ({}),
  },
}

export const formEmits = {
  reset: () => true,
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormEmits = typeof formEmits
