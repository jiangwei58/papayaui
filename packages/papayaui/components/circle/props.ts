import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const circleProps = {
  /**
   * 目标进度
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * 圆环直径，单位px
   */
  size: {
    type: Number,
    default: 100,
  },
  /**
   * 进度条颜色
   */
  color: {
    type: String,
    default: '#009c5d',
  },
  /**
   * 轨道颜色
   */
  layerColor: {
    type: String,
    default: '#fff',
  },
  /**
   * 文字
   */
  text: String,
  /**
   * 进度条宽度，单位px
   */
  strokeWidth: {
    type: [Number, String],
    default: 4,
  },
  /**
   * 是否顺时针
   */
  clockwise: {
    type: Boolean,
    default: true,
  },
  /**
   * 动画速度（单位为 value/s）
   */
  speed: {
    type: Number,
    default: 50,
  },
}

export type CircleProps = ExtractPropTypes<typeof circleProps>
export type CirclePropsPublic = ExtractPublicPropTypes<typeof circleProps>
