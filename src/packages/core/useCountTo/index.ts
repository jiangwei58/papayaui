import { computed, reactive, ref } from 'vue'
import type { IncludeRefs } from '../../types'

export interface UseCountToProps {
  /** 开始值 */
  startNum?: number
  /** 结束值 */
  endNum?: number
  /** 滚动过程所需的时间，单位ms */
  duration?: number
  /** 频率，默认保持每秒60帧，即16毫秒一次 */
  frequency?: number
  /** 缓动结尾效果 */
  easeout?: boolean
  /** 过程触发事件 */
  onProgress?: (progress: number) => void
  /** 结束触发事件 */
  onEnd?: () => void
}

export function useCountTo(props: IncludeRefs<UseCountToProps>) {
  const _props = props as UseCountToProps
  const ownProps = reactive({
    ..._props,
    startNum: _props.startNum ?? 0,
    endNum: _props.endNum ?? 0,
    duration: _props.duration ?? 2000,
    frequency: _props.frequency ?? 16,
    easeout: _props.easeout ?? true,
  })

  const numValue = ref<number>(ownProps.endNum)
  let progress = 0 // 进度
  // 模式，增加或减少
  const mode = computed(() => (ownProps.startNum < ownProps.endNum ? 'up' : 'down'))

  const state = reactive<{
    /** setTimeout id */
    timerId: number | null
    /** 开始的时间 */
    startTime: number | null
    /** 上一次的时间 */
    lastTime: number
  }>({
    timerId: null,
    startTime: null,
    lastTime: 0,
  })

  const requestAnimationFrame = (callback: (time: number) => void) => {
    const currTime = new Date().getTime()
    // 为了使setTimeout的尽可能的接近每秒60帧的效果
    const timeToCall = Math.max(0, ownProps.frequency - (currTime - state.lastTime))
    state.timerId = setTimeout(() => {
      callback(currTime + timeToCall)
    }, timeToCall) as unknown as number
    state.lastTime = currTime + timeToCall
  }

  const cancelAnimationFrame = () => {
    if (state.timerId) {
      clearTimeout(state.timerId)
    }
  }

  /** 缓动效果 */
  const easeoutFn = (
    progressTime: number,
    startNum: number,
    totalNum: number,
    duration: number,
  ) => {
    return (totalNum * (-Math.pow(2, (-10 * progressTime) / duration) + 1) * 1024) / 1023 + startNum
  }

  const loopCount = (timestamp: number) => {
    if (!state.startTime) state.startTime = timestamp
    const progressTime = timestamp - state.startTime
    progress = progressTime / ownProps.duration
    let result = 0
    if (mode.value === 'up') {
      result = ownProps.easeout
        ? easeoutFn(
            progressTime,
            ownProps.startNum,
            ownProps.endNum - ownProps.startNum,
            ownProps.duration,
          )
        : ownProps.startNum + (ownProps.endNum - ownProps.startNum) * progress
    } else {
      result = ownProps.easeout
        ? easeoutFn(
            progressTime,
            ownProps.startNum,
            ownProps.endNum - ownProps.startNum,
            ownProps.duration,
          )
        : ownProps.startNum - (ownProps.startNum - ownProps.endNum) * progress
    }
    // 防止超出值
    if (mode.value === 'up' && result > ownProps.endNum) {
      result = ownProps.endNum
    } else if (mode.value === 'down' && result < ownProps.endNum) {
      result = ownProps.endNum
    }

    numValue.value = formatNumber(result)
    if (progress < 1) {
      ownProps.onProgress?.(progress)
      requestAnimationFrame(loopCount)
    } else {
      ownProps.onEnd?.()
    }
  }

  const formatNumber = (value: number) => {
    if (Number.isInteger(ownProps.endNum)) return Math.round(value)
    // 小数情况为了避免显示精度问题要格式化数据
    const decimalLength = ownProps.endNum.toString().split('.')[1].length
    return Number(value.toFixed(decimalLength))
  }

  const start = () => {
    if (progress > 0 && progress < 1) return
    state.startTime = null
    progress = 0
    requestAnimationFrame(loopCount)
  }

  const pause = () => {
    cancelAnimationFrame()
  }

  const resume = () => {
    const now = new Date().getTime()
    state.startTime = now - progress * ownProps.duration
    state.lastTime = now
    requestAnimationFrame(loopCount)
  }

  const restart = () => {
    cancelAnimationFrame()
    state.startTime = null
    progress = 0
    numValue.value = ownProps.startNum
    requestAnimationFrame(loopCount)
  }

  const reset = () => {
    cancelAnimationFrame()
    state.startTime = null
    progress = 0
    numValue.value = ownProps.startNum
  }

  return {
    numValue,
    start,
    pause,
    resume,
    restart,
    reset,
  }
}
