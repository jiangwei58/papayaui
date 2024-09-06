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
    }, wait) as unknown as number | null
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
      }, wait) as unknown as number | null
    }
  }
}

/**
 * 节流（异步）
 * @description 主要是防止异步函数并发调用，此情况内部只会调用一次，其他调用复用第一次调用的结果
 * @param fn - 函数
 */
export function throttleAsync<T extends (...args: any[]) => any | Promise<any>>(fn: T) {
  let funcPromise: ReturnType<T> | null = null
  return async (...innerArgs: any[]): Promise<Awaited<ReturnType<T>>> => {
    if (!funcPromise) {
      funcPromise = fn(innerArgs)
      try {
        const result = await funcPromise
        return result as Awaited<ReturnType<T>>
      } finally {
        funcPromise = null
      }
    }
    return funcPromise
  }
}
