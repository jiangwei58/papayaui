import type { Rule, RuleItem, Rules, Values } from 'async-validator'
import Schema from 'async-validator'
import type { ValidateOption } from 'async-validator/dist-types/interface'
import type { Ref } from 'vue'
import { computed, ref, toRef } from 'vue'
import type { IncludeRefs } from '../..'
import { isArray, isObject, isUndefined } from '../../utils/lang'
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
export function useFormValidate<T = Values>(props: IncludeRefs<UseFormValidateProps<T>>) {
  type OwnProps = UseFormValidateProps<T>
  const formData = toRef(props, 'formData') as Ref<OwnProps['formData']>
  const rules = toRef(props, 'rules') as Ref<OwnProps['rules']>
  const extraParams = toRef(props, 'extraParams', {}) as Ref<NonNullable<OwnProps['extraParams']>>

  const errorMap = ref<ErrorMap<T>>({})

  const validator = computed(() => {
    const newRules = convertSchemaRules(formData.value, rules.value)
    const _validator = new Schema(newRules)
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

export const stringSplitToArray = (key: string): string[] => {
  return key.replace(/\[|(\]\.)/g, '.').split('.')
}

export const convertSchemaRules = <T>(formData: T, rules: FormRules<T>) => {
  let newRules: Rules = {}
  for (const ruleKey in rules) {
    if (!/[.[\]]/.test(ruleKey)) {
      newRules[ruleKey] = rules[ruleKey] as Rule
      continue
    }
    const keys = stringSplitToArray(ruleKey)

    let currentObj: any = formData
    let currentRule: any = newRules
    for (let i = 0; i < keys.length; i++) {
      try {
        const key = keys[i]
        currentRule[key] = currentRule[key] ?? {}
        if (i < keys.length - 1) {
          if (isUndefined(currentObj[key])) {
            continue
          } else if (isObject(currentObj[key])) {
            currentRule[key].type = 'object'
          } else if (isArray(currentObj[key])) {
            currentRule[key].type = 'array'
          } else {
            console.error(new Error('不支持的类型'))
            newRules = {}
            break
          }
          currentRule[key].fields = currentRule[key].fields ?? {}
          currentObj = currentObj[key]
          currentRule = currentRule[key].fields
        } else {
          currentRule[key] = rules[ruleKey]
        }
      } catch (e) {
        console.error(new Error('获取对象值错误'))
        newRules = {}
      }
    }
  }
  return newRules
}
