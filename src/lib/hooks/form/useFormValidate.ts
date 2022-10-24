import { computed, ref } from 'vue'
import Schema, { RuleItem, Rules, Values } from 'async-validator'
import { ValidateOption } from 'async-validator/dist-types/interface'
import { replaceMessage, validateMessages } from './message'

export type FormRules<T> = {
  [key in keyof T]?: FormRuleItem | FormRuleItem[]
}

export type FormRuleItem = RuleItem

export type FormItemExtraParams<T> = { [key in keyof T]?: Record<string, string> }

export type ErrorMap<T> = { [key in keyof T]?: string }

/**
 * 表单校验hooks
 * @description 表单校验，统一规则的表单名称、输入提示、错误提示等。
 */
export default <T = Values>(
  formData: T,
  rules: FormRules<T>,
  extraParams: FormItemExtraParams<T> = {},
) => {
  const errorMap = ref<ErrorMap<T>>({})

  const validator = computed(() => {
    const _validator = new Schema(rules as Rules)
    _validator.messages(validateMessages)
    return _validator
  })

  const clearValidate = (key?: keyof T) => {
    if (key) {
      delete errorMap.value[key]
    } else {
      errorMap.value = {}
    }
  }

  const validate = (option?: ValidateOption) => {
    clearValidate()
    return new Promise<{ isValid: boolean; errorMap: ErrorMap<T> }>((resolve) => {
      validator.value.validate(formData as Values, option, (errors, _data) => {
        let isValid = true
        if (errors?.length) {
          errorMap.value = errors.reduce((result, error) => {
            result[error.field as keyof T] = replaceMessage(
              error.message || '',
              extraParams[error.field as keyof T],
            )
            return result
          }, {} as ErrorMap<T>)
          isValid = false
        }
        resolve({ isValid, errorMap: errorMap.value })
      })
    })
  }

  return {
    validate,
    clearValidate,
    errorMap,
  }
}
