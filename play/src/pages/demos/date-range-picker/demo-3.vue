<template>
  <view>
    <pa-date-range-picker
      v-model:start="start"
      v-model:end="end"
      start-label="出发日期"
      end-label="返回日期"
    />
    <view class="demo-result">
      <view>出发日期：{{ formatDate(start) }}</view>
      <view>返回日期：{{ formatDate(end) }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const start = ref<Date>(new Date())
const end = ref<Date>(dayjs().add(3, 'day').toDate())

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

