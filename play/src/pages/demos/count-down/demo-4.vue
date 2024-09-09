<template>
  <pa-count-down :time="time" @change="onChange">
    <text class="time-item">{{ timeData?.hours }}</text>
    <text class="time-item">{{ timeData?.minutes }}</text>
    <text class="time-item">{{ timeData?.seconds }}</text>
  </pa-count-down>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CountDownDuration } from 'papayaui'

const time = 1000 * 60 * 30
const timeData = ref<CountDownDuration>()

const onChange = (duration: CountDownDuration) => {
  timeData.value = duration
}
</script>

<style lang="scss" scoped>
.time-item {
  display: inline-block;
  width: 36px;
  text-align: center;
  padding: 10px 0;
  margin-right: 6px;
  color: #fff;
  background-color: var(--pa-color-primary);
  border-radius: 5px;
}
</style>
