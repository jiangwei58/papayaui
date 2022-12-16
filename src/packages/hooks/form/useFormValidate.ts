import Schema, { RuleItem, Rules, Values } from 'async-validator'
import { ValidateOption } from 'async-validator/dist-types/interface'
import { computed, Ref, ref, toRef } from 'vue'
import { IncludeRefs } from '../..'
import { replaceMessage, validateMessages } from './message'

export type FormRules<T> = {
  [key in keyof T]?: FormRuleItem | FormRuleItem[]
}

export type FormRuleItem = RuleItem

export type FormItemExtraParams<T> = { [key in keyof T]?: Record<string, string> }

export type ErrorMap<T> = { [key in keyof T]?: string }

export interface UseFormValidateProps<T> {
  formData: T
  rules: FormRules<T>
  extraParams?: FormItemExtraParams<T>
}

/**
 * 表单校验hooks
 * @description 表单校验，统一规则的表单名称、输入提示、错误提示等。
 */
export default <T = Values>(props: IncludeRefs<UseFormValidateProps<T>>) => {
  type OwnProps = UseFormValidateProps<T>
  const formData = toRef(props, 'formData') as Ref<OwnProps['formData']>
  const rules = toRef(props, 'rules') as Ref<OwnProps['rules']>
  const extraParams = toRef(props, 'extraParams', {}) as Ref<NonNullable<OwnProps['extraParams']>>

  const errorMap = ref<ErrorMap<T>>({})

  const validator = computed(() => {
    const _validator = new Schema(rules.value as Rules)
    _validator.messages(validateMessages)
    return _validator
  })

  const clearValidate = (key?: keyof T | Array<keyof T>) => {
    const keys = Array.isArray(key) ? key : [key]
    if (keys.length) {
      keys.forEach((key) => {
        delete errorMap.value[key]
      })
    } else {
      errorMap.value = {}
    }
  }

  const validate = (option?: ValidateOption) => {
    clearValidate((option?.keys || []) as Array<keyof T>)
    return new Promise<{ isValid: boolean; errorMap: ErrorMap<T> }>((resolve) => {
      validator.value.validate(formData.value as Values, option, (errors, _data) => {
        let isValid = true
        if (errors?.length) {
          errorMap.value = errors.reduce((result, error) => {
            result[error.field as keyof T] = replaceMessage(
              error.message || '',
              extraParams.value[error.field as keyof T],
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
