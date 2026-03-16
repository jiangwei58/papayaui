<template>
  <view>
    <pa-date-range-picker
      v-model:start="start"
      v-model:end="end"
      :columns-type="['year', 'month', 'day', 'hour', 'minute']"
    />
    <view class="demo-result">
      <view>开始时间：{{ formatDateTime(start) }}</view>
      <view>结束时间：{{ formatDateTime(end) }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const start = ref<Date>(new Date())
const end = ref<Date>(dayjs().add(1, 'hour').toDate())

const formatDateTime = (date?: Date) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}
</script>

<style lang="scss" scoped>
.demo-result {
  padding: 8px 12px 0;
  font-size: 14px;
  color: #666;
  line-height: 20px;
}
</style>

