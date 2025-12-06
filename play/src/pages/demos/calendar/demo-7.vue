<template>
  <pa-cell title="自定义日期文案" :value="dateStr" is-link @click="onShow()" />

  <pa-calendar
    v-model:show="visible"
    type="range"
    :min-date="minDate"
    :max-date="maxDate"
    :formatter="formatter"
    @confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
/**
 * @description 通过传入formatter函数来对日历上每一格的内容进行格式化
 */
import dayjs from 'dayjs'
import { ref } from 'vue'
import type { DayItem } from 'papayaui'

const visible = ref<boolean>(false)
const minDate = dayjs('2023-6-1').valueOf()
const maxDate = dayjs('2023-6-30').valueOf()
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const formatter = (dayItem: DayItem) => {
  const month = dayItem.date.month() + 1
  const date = dayItem.date.date()

  if (month === 6) {
    if (date === 6) {
      dayItem.text = '今天'
    } else if (date === 22) {
      dayItem.topInfo = '端午节'
    } else if (date > 22 && date < 25) {
      dayItem.topInfo = '休'
    } else if (date === 25) {
      dayItem.topInfo = '补班'
    }
  }

  if (dayItem.type === 'start') {
    dayItem.bottomInfo = '入住'
  } else if (dayItem.type === 'end') {
    dayItem.bottomInfo = '离店'
  }

  return dayItem
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = (value as Date[]).map((item) => dayjs(item).format('YYYY-MM-DD')).join('~')
}
</script>
