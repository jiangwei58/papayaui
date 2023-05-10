/**
 * @description: 判断值是否未某个类型
 */
export const is = <T>(val: T, type: string) => {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为函数
 */
export const isFunction = (val: unknown) => {
  return is(val, 'Function')
}

/**
 * @description: 是否为对象
 */
export const isObject = (val: unknown) => {
  return val !== null && is(val, 'Object')
}

/**
 * @description:  是否为时间
 */
export const isDate = (val: unknown) => {
  return is(val, 'Date')
}

/**
 * @description:  是否为undefined类型
 */
export const isUndefined = (val: unknown) => {
  return is(val, 'Undefined')
}

/**
 * @description:  是否为数值
 */
export const isNumber = (val: unknown) => {
  return is(val, 'Number')
}

/**
 * @description:  是否为promise
 */
export const isPromise = (val: unknown) => {
  return val instanceof Promise
}

/**
 * @description:  是否为字符串
 */
export const isString = (val: unknown) => {
  return is(val, 'String')
}

/**
 * @description:  是否为boolean类型
 */
export const isBoolean = (val: unknown) => {
  return is(val, 'Boolean')
}

/**
 * @description:  是否为数组
 */
export const isArray = (val: unknown) => {
  return val && Array.isArray(val)
}

/**
 * @description:  是否为普通对象
 */
export const isPlainObject = (val: unknown) => {
  if (!is(val, 'Object')) {
    return false
  }

  const prototype = Object.getPrototypeOf(val)
  return prototype === null || prototype === Object.prototype
}
