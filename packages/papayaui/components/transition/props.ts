import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

/**
 * 动画内置的动画模式有如下：
 * fade：淡入
 * zoom：缩放
 * fade-zoom：缩放淡入
 * fade-up：上滑淡入
 * fade-down：下滑淡入
 * fade-left：左滑淡入
 * fade-right：右滑淡入
 * slide-up：上滑进入
 * slide-down：下滑进入
 * slide-left：左滑进入
 * slide-right：右滑进入
 */
export type TransitionMode =
  | 'fade'
  | 'zoom'
  | 'fade-zoom'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'

export const transitionProps = {
  /**
   * 是否展示组件
   */
  show: Boolean,
  /**
   * 使用的动画模式
   */
  mode: {
    type: String as PropType<TransitionMode>,
    default: 'fade',
  },
  /**
   * 动画的执行时间，单位ms
   */
  duration: {
    type: [String, Number],
    default: 300,
  },
  /**
   * 使用的动画过渡函数
   */
  timingFunction: {
    type: String as PropType<CSSProperties['transitionTimingFunction']>,
    default: 'ease-out',
  },
  /**
   * 关闭是否销毁内部元素
   */
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  /**
   * 自定义class
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: Object as PropType<CSSProperties>,
}

export const transitionEmits = {
  click: () => true,
  /** 进入前触发 */
  beforeEnter: () => true,
  /** 进入中触发 */
  enter: () => true,
  /** 进入后触发 */
  afterEnter: () => true,
  /** 离开前触发 */
  beforeLeave: () => true,
  /** 离开中触发 */
  leave: () => true,
  /** 离开后触发 */
  afterLeave: () => true,
}

export type TransitionProps = ExtractPropTypes<typeof transitionProps>
export type TransitionEmits = typeof transitionEmits
