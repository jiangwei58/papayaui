import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'
import { isArray, isNumber } from '../../utils'

export type SliderValue = number | number[]

export const sliderProps = {
  /**
   * 当前进度百分比，在双滑块模式下为数组格式
   */
  modelValue: {
    type: [Number, Array] as PropType<SliderValue>,
    default(rawProps: any) {
      return rawProps.range ? [0, 100] : 0
    },
  },
  /**
   * 是否开启双滑块模式
   */
  range: {
    type: Boolean,
    default: false,
  },
  /**
   * 最小值
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * 最大值
   */
  max: {
    type: Number,
    default: 100,
  },
  /**
   * 步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * 是否禁用滑块
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示当前进度标签
   */
  showTag: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示范围值
   */
  showRange: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示刻度标记
   */
  marks: {
    type: Object as PropType<Record<number, string>>,
    default: false,
  },
  /**
   * 格式化值
   */
  formatter: {
    type: Function as PropType<(value: number) => number | string>,
  },
  /**
   * 进度条颜色
   */
  activeColor: String,
  /**
   * 进度条非激活态颜色
   */
  inactiveColor: String,
} as const

export const sliderEmits = {
  'update:modelValue': (value: number | number[]) => isNumber(value) || isArray(value),
  change: (value: number | number[]) => isNumber(value) || isArray(value),
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderPropsPublic = ExtractPublicPropTypes<typeof sliderProps>

export type SliderEmits = typeof sliderEmits
