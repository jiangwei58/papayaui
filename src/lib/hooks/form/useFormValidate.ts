import { computed, ref } from 'vue'
import Schema, { RuleItem, Rules, Values } from 'async-validator'
import useValidateMessages from './useValidateMessages'

export type FormRules<T> = {
  [key in keyof T]?: FormRuleItem | FormRuleItem[]
}

export type FormRuleItem = RuleItem

export type FormMessages<T> = { [key in keyof T]?: Record<string, string> }

export type ErrorMap<T> = { [key in keyof T]?: string }

/**
 * 表单校验hooks
 * @description 表单校验，统一规则的表单名称、输入提示、错误提示等。
 */
export default <T = Values>(formData: T, rules: FormRules<T>, messages: FormMessages<T> = {}) => {
  const validateMessages = useValidateMessages(messages)

  const errorMap = ref<ErrorMap<T>>({})

  const validator = computed(() => {
    const _validator = new Schema(rules as Rules)
    _validator.messages(validateMessages.value)
    return _validator
  })

  const clearValidate = (key?: keyof T) => {
    if (key) {
      delete errorMap.value[key]
    } else {
      errorMap.value = {}
    }
  }

  const validate = (): Promise<void> => {
    clearValidate()
    return new Promise((resolve, reject) => {
      validator.value.validate(formData as Values, (errors, data) => {
        console.log(errors, data)
        if (errors?.length) {
          errorMap.value = errors.reduce((result, error) => {
            result[error.field as keyof T] = error.message
            return result
          }, {} as ErrorMap<T>)
          reject(errorMap.value)
        } else {
          resolve()
        }
      })
    })
  }

  return {
    validate,
    errorMap,
  }
}
