<template>
  <pa-date-picker title="选择月日" :columns-type="['month', 'day']" :formatter="formatter" />
</template>

<script lang="ts" setup>
import type { DatePickerColumnType } from '../..'

const formatter = (type: DatePickerColumnType, value: string) => {
  if (type === 'year') {
    return `${value}年`
  } else if (type === 'month') {
    return `${value}月`
  } else if (type === 'day') {
    return `${value}日`
  }
  return value
}
</script>
