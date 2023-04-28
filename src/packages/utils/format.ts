/**
 * 给数据补对应数量的0
 */
export function padZero(num: number | string, targetLength = 2): string {
  let str = num + ''

  while (str.length < targetLength) {
    str = '0' + str
  }

  return str
}
