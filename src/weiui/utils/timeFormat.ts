// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength, fillString = ' ') {
    if (Object.prototype.toString.call(fillString) !== '[object String]')
      throw new TypeError('fillString must be String')
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const str = this
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str)

    const fillLength = maxLength - str.length
    let times = Math.ceil(fillLength / fillString.length)
    while ((times >>= 1)) {
      fillString += fillString
      if (times === 1) {
        fillString += fillString
      }
    }
    return fillString.slice(0, fillLength) + str
  }
}

/**
 * 其他更多是格式化有如下:
 * YYYY:MM:DD|YYYY:MM|YYYY年MM月DD日|YYYY年MM月DD日 HH时mm分等,可自定义组合
 * @param {number|null} dateTime
 * @param {string} fmt
 */
function timeFormat(dateTime: number | null = null, fmt = 'YYYY-MM-DD') {
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date())
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length === 10) dateTime *= 1000
  const date = new Date(dateTime)
  let ret
  const opt: {
    [key: string]: string
  } = {
    'Y+': date.getFullYear().toString(), // 年
    'M+': (date.getMonth() + 1).toString(), // 月
    'D+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'm+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}

export default timeFormat
