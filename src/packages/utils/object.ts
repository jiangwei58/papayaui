import { isArray, isPlainObject } from './lang'

/**
 * @description 创建由所选对象属性组成的对象
 */
export const pick = <T extends object, U extends keyof T>(object: T, keys: Array<U>) => {
  return keys.reduce((newObject, key) => {
    newObject[key] = object[key]
    return newObject
  }, {} as Pick<T, U>)
}

/**
 * @description 递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象
 */
export const merge = <T extends object>(...sources: Partial<T>[]) => {
  const result: Record<string, any> = {}
  function assignValue(val: any, key: string) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val)
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val)
    } else if (isArray(val)) {
      result[key] = val.slice()
    } else {
      result[key] = val
    }
  }

  for (let i = 0, l = sources.length; i < l; i++) {
    for (const key in sources[i]) {
      assignValue(sources[i][key], key)
    }
  }
  return result as T
}
