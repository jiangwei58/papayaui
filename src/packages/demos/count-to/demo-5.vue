<template>
  <pa-count-to
    ref="countToRef"
    :start-num="endTime - startTime"
    :end-num="0"
    :duration="endTime - startTime"
    :frequency="1000"
    :easeout="false"
    :formatter="formatter"
    autoplay
    custom-class="text-60 text-black"
    @click="countToRef?.restart()"
  />
</template>

<script lang="ts" setup>
/**
 * @description 设置 duration 为日期差值，即需要的倒计时总时间，设置 frequency 为 1000，即每秒更新一次，设置 easeout 为 false，即不需要缓动效果
 */
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { ref } from 'vue'
import type { CountToInstance } from '../..'

dayjs.extend(duration)

const countToRef = ref<CountToInstance>()

const startTime = dayjs().valueOf()
const endTime = dayjs(startTime).add(1, 'hour').valueOf()

const formatter = (num: number) => {
  // 格式化成想要的日期格式
  return dayjs.duration(num).format('HH:mm:ss')
}
</script>
