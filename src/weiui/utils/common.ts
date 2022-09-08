/** 判断传入的值，是否带有单位，如果没有，就默认用rpx单位 */
export const getUnitValue = (val: string, unit = 'rpx') => {
  if (/(%|px|rpx|auto|vw|vh)$/.test(val)) return val
  else return val + unit
}

/** 转换对象为字符串参数值 */
export const convertQueryToString = (
  params: Record<string, string | number | undefined>,
  suffix = '&',
) => {
  const queryArray: string[] = []
  for (const key in params) {
    const value = params[key]
    if (typeof value !== 'undefined') {
      queryArray.push(`${key}=${value.toString()}`)
    }
  }
  return queryArray.join(suffix)
}
