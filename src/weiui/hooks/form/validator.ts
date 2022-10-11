import { isEmptyValue } from '@/weiui/utils/common'
import { FormRuleItem, SyncValidateResult } from './useFormValidate'

type ValidatorFunc = (
  ruleItem: FormRuleItem,
  value: any,
) => void | boolean | string | Promise<void | boolean | string>

// 必填
export const ruleWithRequired: ValidatorFunc = (ruleItem, value) => {
  return ruleItem.required ? !isEmptyValue(value) : true
}

// 最大最小值
export const ruleWithMinMax: ValidatorFunc = (ruleItem, value) => {
  if (typeof value !== 'number') return
  const { min, max } = ruleItem
  if (typeof min === 'undefined' && typeof max === 'undefined') return
  const minTemp = typeof min !== 'undefined' ? min : Number.MIN_SAFE_INTEGER
  const maxTemp = typeof max !== 'undefined' ? max : Number.MAX_SAFE_INTEGER
  return value > minTemp && value < maxTemp
}

// 最大最小长度
export const ruleWithMinMaxLength: ValidatorFunc = (ruleItem, value) => {
  if (typeof value !== 'string') return
  const { minLength, maxLength } = ruleItem
  if (typeof minLength === 'undefined' && typeof maxLength === 'undefined') return
  const minTemp = typeof minLength !== 'undefined' ? minLength : Number.MIN_SAFE_INTEGER
  const maxTemp = typeof maxLength !== 'undefined' ? maxLength : Number.MAX_SAFE_INTEGER
  return value.length > minTemp && value.length < maxTemp
}

// 正则
export const ruleWithPattern: ValidatorFunc = (ruleItem, value) => {
  if (!(ruleItem.pattern instanceof RegExp)) return
  return ruleItem.pattern.test(value)
}

// 自定义
export const ruleWithValidator: ValidatorFunc = async (ruleItem, value) => {
  if (typeof ruleItem.validator !== 'function') return
  const validatorFunc = ruleItem.validator
  return new Promise<void | string>((resolve) => {
    const callback = (error?: SyncValidateResult) => {
      if (typeof error === 'undefined') {
        resolve()
      } else if (typeof error === 'boolean') {
        error ? resolve() : resolve(ruleItem.message)
      } else {
        resolve(typeof error === 'string' ? error : error.message)
      }
    }
    const result = validatorFunc(value, callback)
    callback(result ?? ruleItem.message)
  })
}
