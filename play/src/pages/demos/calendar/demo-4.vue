<template>
  <pa-cell-group inset>
    <pa-cell title="单个日期" :value="dateString(0)" is-link @click="onShow('single', 0)" />
    <pa-cell title="日期区间" :value="dateString(1)" is-link @click="onShow('range', 1)" />
  </pa-cell-group>

  <pa-calendar
    v-model:show="visible"
    :type="type"
    :default-date="values[current]"
    :show-confirm="false"
    @confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
/**
 * @description 将show-confirm设置为false可以隐藏确认按钮，这种情况下选择完成后会立即触发confirm事件。
 */
import dayjs from 'dayjs'
import { ref } from 'vue'
import type { CalendarType } from '../../components/calendar'

const visible = ref<boolean>(false)
const type = ref<CalendarType>('single')

const current = ref(0)
const values = ref<Array<number | number[]>>([])

const dateString = (index: number) => {
  const value = values.value[index]
  if (!value) return ''
  return Array.isArray(value)
    ? value.map((item) => dayjs(item).format('YYYY-MM-DD')).toString()
    : dayjs(value).format('YYYY-MM-DD')
}

const onShow = (newType: CalendarType, index: number) => {
  type.value = newType
  current.value = index
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  values.value[current.value] = Array.isArray(value)
    ? value.map((item) => item.getTime())
    : value.getTime()
}
</script>
