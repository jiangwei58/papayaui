/**
 * @description: 判断值是否未某个类型
 */
export const is = (val: unknown, type: string) => {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为函数
 */
export const isFunction = (val: unknown): val is (...args: any[]) => any => {
  return is(val, 'Function')
}

/**
 * @description: 是否为对象
 */
export const isObject = (val: unknown): val is object => {
  return val !== null && is(val, 'Object')
}

/**
 * @description:  是否为时间
 */
export const isDate = (val: unknown): val is Date => {
  return is(val, 'Date')
}

/**
 * @description:  是否为undefined类型
 */
export const isUndefined = (val: unknown): val is undefined => {
  return is(val, 'Undefined')
}

/**
 * @description:  是否为数值
 */
export const isNumber = (val: unknown): val is number => {
  return is(val, 'Number')
}

/**
 * @description:  是否为promise
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return val instanceof Promise
}

/**
 * @description:  是否为字符串
 */
export const isString = (val: unknown): val is string => {
  return is(val, 'String')
}

/**
 * @description:  是否为boolean类型
 */
export const isBoolean = (val: unknown): val is boolean => {
  return is(val, 'Boolean')
}

/**
 * @description:  是否为数组
 */
export const isArray = <T = any>(val: unknown): val is T[] => {
  return !!val && Array.isArray(val)
}

/**
 * @description:  是否为普通对象
 */
export const isPlainObject = (val: unknown): val is object => {
  if (!is(val, 'Object')) {
    return false
  }

  const prototype = Object.getPrototypeOf(val)
  return prototype === null || prototype === Object.prototype
}
