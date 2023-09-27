import type { ExtractPropTypes } from 'vue'
import { isObject } from '../../utils'

export type CountDownDuration = {
  // 剩余天数
  days: number
  // 剩余小时数
  hours: number
  // 剩余分钟数
  minutes: number
  // 剩余秒数
  seconds: number
  // 剩余毫秒数
  milliseconds: number
}

export const countDownProps = {
  /**
   * 倒计时时长，单位毫秒
   */
  time: Number,
  /**
   * 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
   */
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  /**
   * 是否自动开始倒计时
   */
  autoStart: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否开启毫秒级渲染
   */
  millisecond: {
    type: Boolean,
    default: false,
  },
}

export const countDownEmits = {
  // 倒计时结束时触发
  finish: () => true,
  // 倒计时变化时触发
  change: (duration: CountDownDuration) => isObject(duration),
}

export type CountDownProps = ExtractPropTypes<typeof countDownProps>
export type CountDownEmits = typeof countDownEmits
