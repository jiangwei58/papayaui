import { ref } from 'vue'
import { getDefaultMessage } from './message'
import {
  ruleWithMinMax,
  ruleWithMinMaxLength,
  ruleWithPattern,
  ruleWithRequired,
  ruleWithValidator,
} from './validator'

export type SyncErrorType = Error | string
export type SyncValidateResult = boolean | SyncErrorType

export type FormRulesMap<T> = {
  [key in keyof T]?: FormRuleMapItem
}

export interface FormRuleMapItem {
  label: string
  placeholder?: string
  type?: 'input' | 'select'
  rules: FormRuleItem | FormRuleItem[]
  [key: string]: any
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

/**
 * 表单规则数据生成
 * @description 在常规表单规则基础上封装，生成一套统一规则的表单名称、输入提示、错误提示等。
 * ```javascript
 * // 支持动态标识替换
 * {
 *  label: '字段名',
 *  name: '名称'
 *  rules: [{ required: true, message: '自定义{{name}}提示{{label}}' }]
 * }
 * ```
 */
export default <T = Record<string, unknown>>(formData: T, rulesMap: FormRulesMap<T>) => {
  const _tools = [
    ruleWithRequired,
    ruleWithMinMax,
    ruleWithMinMaxLength,
    ruleWithPattern,
    ruleWithValidator,
  ]
  const errorMap = ref<{ [key in keyof T]?: string }>({})

  const clearValidate = (key?: keyof T) => {
    if (key) {
      delete errorMap.value[key]
    } else {
      errorMap.value = {}
    }
  }

  const validateField = (key: keyof T): Promise<boolean> => {
    const rulesMapItem = rulesMap[key]
    if (!rulesMapItem) return Promise.resolve(true)
    const fieldRules = Array.isArray(rulesMapItem.rules) ? rulesMapItem.rules : [rulesMapItem.rules]
    const fieldValue = formData[key]
    clearValidate(key)

    return new Promise<boolean>((resolve, reject) => {
      for (const ruleItem of fieldRules) {
        if (typeof ruleItem.message === 'undefined') {
          ruleItem.message = getDefaultMessage(ruleItem, rulesMapItem)
        }

        let isError = false
        _tools.forEach(async (toolFunc) => {
          try {
            let errorResult = toolFunc(ruleItem, fieldValue)
            if (errorResult instanceof Promise) {
              errorResult = await errorResult
            }
            if (typeof errorResult !== 'undefined' && errorResult !== true) {
              errorMap.value[key] = typeof errorResult === 'string' ? errorResult : ruleItem.message
              isError = true
            }
          } catch (e) {
            reject(e)
          }
        })
        if (isError) break
      }
      resolve(!Object.keys(errorMap.value).length)
    })
  }

  const validate = async (): Promise<boolean> => {
    clearValidate()

    const allResult: Promise<boolean>[] = []
    for (const key in rulesMap) {
      allResult.push(validateField(key))
    }
    return Promise.all(allResult).then((res) => {
      console.log('eeeee', res)
      return res.every((item) => !!item)
    })
  }

  return {
    validate,
    clearValidate,
    errorMap,
  }
}
