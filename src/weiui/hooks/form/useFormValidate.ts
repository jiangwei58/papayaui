import { ref } from 'vue'
import { getDefaultMessage } from './message'
import {
  requiredValidator,
  minMaxValidator,
  minMaxLengthValidator,
  patternValidator,
  customValidator,
} from './validator'

export type SyncErrorType = Error | string
export type SyncValidateResult = boolean | SyncErrorType

export type FormRulesMap<T> = {
  [key in keyof T]?: FormRuleMapItem
}

export interface FormRuleMapItem {
  /** 表单项的名称 */
  label: string
  /** 输入或选择提示 */
  placeholder?: string
  /** 类型，影响提示内容（如：input时提示请输入xxx，select时提示请选择xxx） */
  type?: 'input' | 'select'
  /** 校验规则 */
  rules: FormRuleItem | FormRuleItem[]
  /** 额外字段，主要用于使用动态模板字段 */
  [key: string]: any
}

export interface FormRuleItem {
  /** 是否必填 */
  required?: boolean
  /** 最小长度 */
  minLength?: number
  /** 最大长度 */
  maxLength?: number
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 正则表达式 */
  pattern?: RegExp
  /**
   * 自定义校验，支持直接返回boolean，或者错误信息，还可以使用callback方式(主要用于异步情况)
   * @param value 此项的值,类型需自己具体指定
   * @param {Function} callback 回调处理方式，推荐异步情况使用
   */
  validator?: (value: any, callback: (error?: SyncErrorType) => void) => SyncValidateResult | void
  /** 错误提示 */
  message?: string
}

/**
 * 表单校验hooks
 * @description 表单校验，统一规则的表单名称、输入提示、错误提示等。
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
    requiredValidator,
    minMaxValidator,
    minMaxLengthValidator,
    patternValidator,
    customValidator,
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
      return res.every((item) => !!item)
    })
  }

  return {
    validate,
    clearValidate,
    errorMap,
  }
}
