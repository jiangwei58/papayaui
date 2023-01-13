<template>
  <view
    :class="[computedClass('count-to'), customClass]"
    :style="customStyle"
    @tap="emit('click', $event)"
  >
    {{ displayValue }}
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, SVGAttributes, toRefs } from 'vue'
import useCountTo from '../../core/useCountTo'
import { computedClass } from '../../utils/style'

export interface CountToProps {
  /** 开始值 */
  startNum?: number
  /** 结束值 */
  endNum?: number
  /** 滚动过程所需的时间，单位ms */
  duration?: number
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

const props = withDefaults(defineProps<CountToProps>(), {
  startNum: 0,
  endNum: 0,
  duration: 2000,
  autoplay: false,
  easeout: true,
  formatter: undefined,
  customClass: undefined,
  customStyle: undefined,
})

const emit = defineEmits<{
  (event: 'click', value: Event): void
}>()

const { startNum, endNum, duration, easeout } = toRefs(props)

const { numValue, start, pause, resume, restart, reset } = useCountTo({
  startNum,
  endNum,
  duration,
  easeout,
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
