import type { Ref } from 'vue'
import { isRef } from 'vue'

/** 判断传入的值，是否带有单位，如果没有，就默认用rpx单位 */
export const getUnitValue = (val: number | string, unit = 'rpx'): string => {
  if (/(%|px|rpx|auto|vw|vh|em|rem)$/.test(val.toString())) return val.toString()
  else return val + unit
}

/** 转换对象为字符串参数值 */
export const convertQueryToString = <T extends object>(params: T, suffix = '&') => {
  const queryArray: string[] = []
  for (const key in params) {
    const value = params[key]
    if (typeof value !== 'undefined') {
      queryArray.push(`${key}=${value?.toString()}`)
    }
  }
  return queryArray.join(suffix)
}

/** 获取值类型 */
export const getValueType = (value: any): string =>
  Object.prototype.toString
    .call(value)
    .replace(/^\[object\s(.+)\]$/, '$1')
    .toLowerCase()

/** 判断是否为空 */
export const isEmpty = (value: any) => {
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

/** 通用树形数据递归调用 */
export const loopTree = <T>(
  treeData: T[],
  iterate: (item: T) => void | boolean,
  childrenKey: keyof T = 'children' as keyof T,
) => {
  for (const item of treeData) {
    if (iterate(item) === false) {
      break
    }
    if ((item[childrenKey] as unknown as T[])?.length) {
      loopTree(item[childrenKey] as unknown as T[], iterate, childrenKey)
    }
  }
}

/** 空函数 */
export const noop: (...args: any[]) => any = () => {}

/** 睡眠，延迟执行 */
export const sleep = (timeout: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

/**
 * 获取ref或普通类型的值
 */
export const getRefValue = <T>(prop: T | Ref<T>) => {
  return isRef(prop) ? prop.value : prop
}
