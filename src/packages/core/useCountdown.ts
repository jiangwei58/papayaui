import { ref } from 'vue'

export interface UseCountdownProps {
  /** 默认值 */
  defaultValue?: number
  /** 步长，默认1 */
  step?: number
  /** 步长时间（毫秒），默认1000 */
  stepTime?: number
}

export default (props: UseCountdownProps = {}) => {
  const { defaultValue = 0, step = 1, stepTime = 1000 } = props

  let timer: number | null = null
  const count = ref<number>(defaultValue)

  const loop = () => {
    timer = setTimeout(() => {
      if (count.value <= 0) return
      count.value -= step
      loop()
    }, stepTime)
  }

  const clear = () => {
    if (timer) {
      clearTimeout(timer)
    }
  }

  const onStart = (value?: number) => {
    if (typeof value !== 'undefined') {
      count.value = value
    }
    loop()
  }

  const onPause = () => {
    clear()
  }

  const onReset = () => {
    clear()
    count.value = defaultValue
  }

  return {
    count,
    onStart,
    onPause,
    onReset,
  }
}
