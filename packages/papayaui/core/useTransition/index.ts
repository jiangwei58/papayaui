import { computed, nextTick, reactive, toRef, watch, type CSSProperties } from 'vue'
import type { MaybeRef } from '../../types'
import { getRefValue, sleep } from '../../utils'
import { defaultNamespace } from '../useNamespace'

export type TransitionStatus = 'enter' | 'leave' | null

export interface UseTransitionProps {
  /**
   * 是否展示组件
   */
  show?: MaybeRef<boolean>
  /**
   * 使用的动画名称，
   * @default 'fade'
   */
  mode?: MaybeRef<string>
  /**
   * 动画的执行时间，单位ms
   * @default 300
   */
  duration?: number
  /**
   * 使用的动画过渡函数
   * @default 'ease-out'
   */
  timingFunction?: CSSProperties['transitionTimingFunction']
  /**
   * 进入前触发
   */
  beforeEnter?: () => void
  /**
   * 进入中触发
   */
  enter?: () => void
  /**
   * 进入后触发
   */
  afterEnter?: () => void
  /**
   * 离开前触发
   */
  beforeLeave?: () => void
  /**
   * 离开中触发
   */
  leave?: () => void
  /**
   * 离开后触发
   */
  afterLeave?: () => void
}

// 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
const getClassNames = (name: string) => {
  const classPrefix = `${defaultNamespace}-${name}`
  return {
    enter: `${classPrefix}-enter ${classPrefix}-enter-active`,
    'enter-to': `${classPrefix}-enter-to ${classPrefix}-enter-active`,
    leave: `${classPrefix}-leave ${classPrefix}-leave-active`,
    'leave-to': `${classPrefix}-leave-to ${classPrefix}-leave-active`,
  }
}

export const useTransition = (props: UseTransitionProps) => {
  const show = computed<boolean>(() => getRefValue(props.show, true))
  const mode = computed<string>(() => getRefValue(props.mode, 'fade'))
  const duration = computed(() => props.duration ?? 300)

  const state = reactive<{
    display: boolean // 组件是否展示
    status: TransitionStatus // 记录组件动画的状态
    classes: string // 应用的类名
  }>({
    status: null,
    display: false,
    classes: '',
  })

  const transitionStyle = computed(() => {
    return {
      transitionDuration: `${duration.value}ms`,
      transitionTimingFunction: props.timingFunction ?? 'ease-out',
    }
  })

  const onEnter = async () => {
    // 动画进入时的类名
    const classNames = getClassNames(mode.value)
    // 定义状态和发出动画进入前事件
    state.status = 'enter'
    props.beforeEnter?.()
    state.display = true
    state.classes = classNames.enter

    nextTick(async () => {
      await sleep(1000 / 30)
      // 标识动画尚未结束
      props.enter?.()
      // 赋予组件enter-to类名
      state.classes = classNames['enter-to']
      setTimeout(onTransitionEnd, duration.value)
    })
  }

  // 动画离场处理
  const onLeave = () => {
    const classNames = getClassNames(mode.value)
    // 标记离开状态和发出事件
    state.status = 'leave'
    props.beforeLeave?.()
    state.classes = classNames.leave

    nextTick(() => {
      props.leave?.()
      state.classes = classNames['leave-to']
      // 组件执行动画，到了执行的执行时间后，执行一些额外处理
      setTimeout(onTransitionEnd, duration.value)
    })
  }

  // 完成过渡后触发
  const onTransitionEnd = () => {
    // 发出组件动画执行后的事件
    if (state.status === 'leave') {
      state.display = false
      props.afterLeave?.()
    } else {
      props.afterEnter?.()
    }
    state.classes = ''
  }

  watch(
    show,
    (newVal) => {
      newVal ? onEnter() : onLeave()
    },
    {
      immediate: true,
    },
  )

  return {
    display: toRef(state, 'display'),
    transitionClasses: toRef(state, 'classes'),
    transitionStyle,
  }
}
