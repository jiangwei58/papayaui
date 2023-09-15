<template>
  <pa-date-picker
    title="选择顺序控制"
    :columns-type="['day', 'month', 'year']"
    :min-date="minDate"
    :max-date="maxDate"
  />
</template>

<script lang="ts" setup>
/**
 * @description columns-type 值的顺序即为选择的顺序
 */
import dayjs from 'dayjs'

const minDate = dayjs().subtract(10, 'year').toDate()
const maxDate = dayjs().add(10, 'year').toDate()
</script>
