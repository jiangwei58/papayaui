type SyncErrorType = Error | string
type SyncValidateResult = boolean | SyncErrorType

export type FormRulesMap<T> = {
  [key in keyof T]?: FormRuleItem[]
}

export interface FormRuleItem {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: any, callback: (error?: SyncErrorType) => void) => SyncValidateResult | void
  message?: string
}

/** 获取值类型 */
const getValueType = (value: any): string =>
  Object.prototype.toString
    .call(value)
    .replace(/^\[object\s(.+)\]$/, '$1')
    .toLowerCase()

/** 判断是否为空 */
const isEmptyValue = (value: any) => {
  if (value === undefined || value === null) {
    return true
  }

  if (typeof value === 'string' && !value) {
    return true
  }

  if (Array.isArray(value) && !value.length) {
    return true
  }

  if (getValueType(value) === 'object' && !Object.keys(value).length) {
    return true
  }

  return false
}

export const validateToString = async <T = Record<string, unknown>>(
  rules: FormRulesMap<T>,
  formData: T,
): Promise<string | void> => {
  for (const key in rules) {
    const fieldRules = rules[key] as FormRuleItem[] | undefined
    const fieldValue = formData[key]
    if (!fieldRules) continue

    for (const ruleItem of fieldRules) {
      if (typeof ruleItem.message === 'undefined') {
        ruleItem.message = '校验错误'
      }
      // 必填
      if (ruleItem.required && isEmptyValue(fieldValue)) {
        throw ruleItem.message
      }
      // 自定义
      if (typeof ruleItem.validator === 'function') {
        const validatorFunc = ruleItem.validator
        await new Promise<void>((resolve, reject) => {
          const callback = (error?: SyncValidateResult) => {
            if (typeof error === 'undefined') {
              resolve()
            } else if (typeof error === 'boolean') {
              error ? resolve() : reject(ruleItem.message)
            } else {
              reject(typeof error === 'string' ? error : error.message)
            }
          }
          const result = validatorFunc(fieldValue, callback)
          callback(result ?? ruleItem.message)
        })
      }
    }
  }
}
