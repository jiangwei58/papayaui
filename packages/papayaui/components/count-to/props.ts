import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'
import { isNumber, isObject } from '@papayaui/utils'

export const countToProps = {
  /**
   *  开始值
   */
  startNum: {
    type: Number,
    default: 0,
  },
  /**
   *  结束值
   */
  endNum: {
    type: Number,
    default: 100,
  },
  /**
   *  滚动过程所需的时间，单位ms
   */
  duration: {
    type: Number,
    default: 2000,
  },
  /**
   *  频率，默认保持每秒60帧，即16毫秒一次
   */
  frequency: {
    type: Number,
    default: 16,
  },
  /**
   *  是否自动开始滚动
   */
  autoplay: Boolean,
  /**
   *  缓动结尾效果
   */
  easeout: {
    type: Boolean,
    default: true,
  },
  /**
   *  格式化值
   */
  formatter: Function as PropType<(value: number) => string | number>,
  /**
   *  自定义class
   */
  customClass: String,
  /**
   *  自定义style
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
}

export const countToEmits = {
  click: (value: Event) => isObject(value),
  change: (value: number, progress: number) => isNumber(value) && isNumber(progress),
  finish: () => true,
}

export type CountToProps = ExtractPropTypes<typeof countToProps>
export type CountToEmits = typeof countToEmits
