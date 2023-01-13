<template>
  <view
    v-if="state.inited"
    :class="[computedClass('transition'), state.classes, customClass]"
    :style="mergeStyle"
    @tap="clickHandler"
    @touchmove="noop"
  >
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, nextTick, reactive, watch } from 'vue'
import { noop } from '../../utils/common'
import { computedClass, PREFIX } from '../../utils/style'

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

export interface TransitionProps {
  /** 是否展示组件 */
  show?: boolean
  /** 使用的动画模式 */
  mode?: TransitionMode
  /** 动画的执行时间，单位ms */
  duration?: string | number
  /** 使用的动画过渡函数 */
  timingFunction?: CSSProperties['transitionTimingFunction']
  /** 自定义class */
  customClass?: string
  /** 自定义样式 */
  customStyle?: CSSProperties
}

const props = withDefaults(defineProps<TransitionProps>(), {
  mode: 'fade',
  duration: 300,
  timingFunction: 'ease-out',
  customClass: undefined,
  customStyle: undefined,
})

const emit = defineEmits<{
  (event: 'click'): void
  /** 进入前触发 */
  (event: 'beforeEnter'): void
  /** 进入中触发 */
  (event: 'enter'): void
  /** 进入后触发 */
  (event: 'afterEnter'): void
  /** 离开前触发 */
  (event: 'beforeLeave'): void
  /** 离开中触发 */
  (event: 'leave'): void
  /** 离开后触发 */
  (event: 'afterLeave'): void
}>()

const state = reactive<{
  inited: boolean // 是否显示/隐藏组件
  status: '' | 'enter' | 'leave' // 记录组件动画的状态
  transitionEnded: boolean // 组件是否结束的标记
  display: boolean // 组件是否展示
  classes: string // 应用的类名
}>({
  inited: false,
  status: '',
  transitionEnded: false,
  display: false,
  classes: '',
})

const mergeStyle = computed(() => {
  return {
    transitionDuration: `${props.duration}ms`,
    transitionTimingFunction: props.timingFunction,
    ...props.customStyle,
  }
})

// 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
const getClassNames = (name: string) => {
  const classPrefix = `${PREFIX}-${name}`
  return {
    enter: `${classPrefix}-enter ${classPrefix}-enter-active`,
    'enter-to': `${classPrefix}-enter-to ${classPrefix}-enter-active`,
    leave: `${classPrefix}-leave ${classPrefix}-leave-active`,
    'leave-to': `${classPrefix}-leave-to ${classPrefix}-leave-active`,
  }
}

const onEnter = async () => {
  // 动画进入时的类名
  const classNames = getClassNames(props.mode)
  // 定义状态和发出动画进入前事件
  state.status = 'enter'
  emit('beforeEnter')
  state.inited = true
  state.display = true
  state.classes = classNames.enter
  await nextTick()
  await new Promise<void>((resolve) => {
    return setTimeout(() => {
      resolve()
    }, 1000 / 30)
  })
  // 标识动画尚未结束
  emit('enter')
  state.transitionEnded = false
  // 组件动画进入后触发的事件
  emit('afterEnter')
  // 赋予组件enter-to类名
  state.classes = classNames['enter-to']
}

// 动画离场处理
const onLeave = () => {
  // 如果不是展示状态，无需执行逻辑
  if (!state.display) return
  const classNames = getClassNames(props.mode)
  // 标记离开状态和发出事件
  state.status = 'leave'
  emit('beforeLeave')
  // 获得类名
  state.classes = classNames.leave

  nextTick(() => {
    // 动画正在离场的状态
    state.transitionEnded = false
    emit('leave')
    // 组件执行动画，到了执行的执行时间后，执行一些额外处理
    setTimeout(onTransitionEnd, +props.duration)
    state.classes = classNames['leave-to']
  })
}

// 完成过渡后触发
const onTransitionEnd = () => {
  // 如果已经是结束的状态，无需再处理
  if (state.transitionEnded) return
  state.transitionEnded = true
  // 发出组件动画执行后的事件
  if (state.status === 'leave') {
    emit('afterLeave')
  } else {
    emit('afterEnter')
  }
  if (!props.show && state.display) {
    state.display = false
    state.inited = false
  }
}

watch(
  () => props.show,
  (newVal) => {
    newVal ? onEnter() : onLeave()
  },
  {
    immediate: true,
  },
)

const clickHandler = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
@import './animate.scss';
</style>
