<template>
  <pa-date-picker title="选项过滤器" :columns-type="['hour', 'minute']" :filter="filter" />
</template>

<script lang="ts" setup>
import type { DatePickerColumnType, DatePickerOption } from '../..'

const filter = (type: DatePickerColumnType, options: DatePickerOption[]) => {
  if (type === 'minute') {
    return options.filter((option) => option.value % 5 === 0)
  }
  return options
}
</script>
