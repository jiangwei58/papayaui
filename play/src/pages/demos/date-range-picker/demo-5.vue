<template>
  <view>
    <pa-date-range-picker
      v-model:start="start"
      v-model:end="end"
      :default-start-date="defaultStart"
      :default-end-date="defaultEnd"
    />
    <view class="demo-result">
      <view>开始时间：{{ formatDate(start) }}</view>
      <view>结束时间：{{ formatDate(end) }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const start = ref<Date | undefined>(undefined)
const end = ref<Date | undefined>(undefined)

/** 默认打开在 2025-01-01 */
const defaultStart = new Date(2025, 0, 1)
/** 默认打开在 2025-12-31 */
const defaultEnd = new Date(2025, 11, 31)

const formatDate = (date?: Date) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD')
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
