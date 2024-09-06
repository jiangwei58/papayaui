<template>
  <pa-count-down ref="countDownRef" :time="time" format="ss:SSS" millisecond :auto-start="false" />

  <view class="flex mt-20">
    <pa-button @click="start">开始</pa-button>
    <pa-button class="ml-20" @click="pause">暂停</pa-button>
    <pa-button class="ml-20" @click="reset">重置</pa-button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CountDownInstance } from '../../components'

const time = 1000 * 6
const countDownRef = ref<CountDownInstance>()

const start = () => {
  countDownRef.value?.start()
}

const pause = () => {
  countDownRef.value?.pause()
}

const reset = () => {
  countDownRef.value?.reset()
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
