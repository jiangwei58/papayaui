/** 判断传入的值，是否带有单位，如果没有，就默认用rpx单位 */
export const getUnitValue = (val: string, unit = 'rpx') => {
  if (/(%|px|rpx|auto|vw|vh|em|rem)$/.test(val)) return val
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
 * 防抖
 * @param fn - 函数
 * @param wait - 等待时间
 */
export const debounce = (fn: (...args: any[]) => any, wait = 0) => {
  let t: number | null = null
  return (...innerArgs: any[]) => {
    if (t !== null) {
      clearTimeout(t)
    }
    t = setTimeout(() => {
      fn(...innerArgs)
    }, wait)
  }
}

/**
 * 节流
 * @param fn - 函数
 * @param wait - 等待时间
 * @param options - 配置
 * @param options.leading - 等待前执行，即立即执行
 * @param options.trailing - 等待后执行，即超时后执行
 */
export const throttle = (
  fn: (...args: any[]) => any,
  wait = 0,
  { leading = false, trailing = false } = {},
) => {
  let t: number | null = null
  let time = new Date()
  return (...innerArgs: any[]) => {
    if (leading) {
      fn(...innerArgs)
      leading = false
      return
    }
    if (t !== null) {
      clearTimeout(t)
    }
    const endTime = new Date()
    if (endTime.getTime() - time.getTime() >= wait) {
      time = endTime
      fn(...innerArgs)
    }
    if (trailing) {
      t = setTimeout(() => {
        fn(...innerArgs)
      }, wait)
    }
  }
}
