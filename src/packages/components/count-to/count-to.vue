<template>
  <view :class="[ns.b(), customClass]" :style="customStyle" @tap="emit('click', $event)">
    {{ displayValue }}
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, SVGAttributes, toRefs } from 'vue'
import useCountTo from '../../core/useCountTo'
import useNamespace from '../../core/useNamespace'

export interface CountToProps {
  /** 开始值 */
  startNum?: number
  /** 结束值 */
  endNum?: number
  /** 滚动过程所需的时间，单位ms */
  duration?: number
  /** 频率，默认保持每秒60帧，即16毫秒一次 */
  frequency?: number
  /** 是否自动开始滚动 */
  autoplay?: boolean
  /** 缓动结尾效果 */
  easeout?: boolean
  /** 格式化值 */
  formatter?: (value: number) => string | number
  /** 自定义class */
  customClass?: string
  /** 自定义style */
  customStyle?: SVGAttributes['style']
}

const ns = useNamespace('count-to')

const props = withDefaults(defineProps<CountToProps>(), {
  startNum: 0,
  endNum: 0,
  duration: 2000,
  frequency: 16,
  autoplay: false,
  easeout: true,
  formatter: undefined,
  customClass: undefined,
  customStyle: undefined,
})

const emit = defineEmits<{
  (event: 'click', value: Event): void
  (event: 'change', value: number, progress: number): void
  (event: 'finish'): void
}>()

const { startNum, endNum, duration, frequency, easeout } = toRefs(props)

const onProgress = (progress: number) => {
  emit('change', numValue.value, progress)
}

const onEnd = () => {
  emit('finish')
}

const { numValue, start, pause, resume, restart, reset } = useCountTo({
  startNum,
  endNum,
  duration,
  frequency,
  easeout,
  onProgress,
  onEnd,
})

const displayValue = computed(() => {
  return typeof props.formatter === 'function' ? props.formatter(numValue.value) : numValue.value
})

onMounted(() => {
  if (props.autoplay) {
    start()
  }
})

defineExpose({
  start,
  pause,
  resume,
  restart,
  reset,
})
</script>

<style lang="scss" scoped></style>
