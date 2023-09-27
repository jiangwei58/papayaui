<template>
  <view :class="[ns.b(), customClass]" :style="customStyle" @tap="emit('click', $event)">
    {{ displayValue }}
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, toRefs } from 'vue'
import { useCountTo } from '../../core/useCountTo'
import useNamespace from '../../core/useNamespace'
import { countToEmits, countToProps } from './props'

const ns = useNamespace('count-to')

const props = defineProps(countToProps)
const emit = defineEmits(countToEmits)

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

<style lang="scss"></style>
