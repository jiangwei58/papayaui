<template>
  <view :class="ns.b()">
    <slot v-if="$slots.default" />
    <template v-else>{{ timeText }}</template>
  </view>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { computed, onMounted } from 'vue'
import { useCountTo, useNamespace } from '@papayaui/core'
import { countDownEmits, countDownProps } from './props'

dayjs.extend(duration)

const ns = useNamespace('count-down')

const props = defineProps(countDownProps)
const emit = defineEmits(countDownEmits)

const timeDuration = computed(() => dayjs.duration(numValue.value))
const timeText = computed(() => timeDuration.value.format(props.format))

const onProgress = () => {
  emit('change', {
    days: timeDuration.value.days(),
    hours: timeDuration.value.hours(),
    minutes: timeDuration.value.minutes(),
    seconds: timeDuration.value.seconds(),
    milliseconds: timeDuration.value.milliseconds(),
  })
}

const onEnd = () => {
  emit('finish')
}

const { numValue, start, pause, resume, restart, reset } = useCountTo({
  startNum: props.time,
  endNum: 0,
  duration: props.time,
  frequency: props.millisecond ? 16 : 1000,
  easeout: false,
  onProgress,
  onEnd,
})

onMounted(() => {
  if (props.autoStart) {
    start()
  } else {
    reset()
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

<style lang="scss">
@import './count-down.scss';
</style>
