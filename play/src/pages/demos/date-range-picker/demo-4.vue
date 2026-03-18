<template>
  <view class="demo-state">
    <view class="demo-state__section">
      <view class="demo-state__title">可清空</view>
      <pa-date-range-picker
        v-model:start="clearableStart"
        v-model:end="clearableEnd"
        clearable
        @clear="onClear"
      />
      <view class="demo-result">
        <view>开始时间：{{ formatDate(clearableStart) }}</view>
        <view>结束时间：{{ formatDate(clearableEnd) }}</view>
        <view>清空次数：{{ clearCount }}</view>
      </view>
    </view>

    <view class="demo-state__section">
      <view class="demo-state__title">只读</view>
      <pa-date-range-picker
        v-model:start="readonlyStart"
        v-model:end="readonlyEnd"
        readonly
      />
      <view class="demo-result">
        <view>开始时间：{{ formatDate(readonlyStart) }}</view>
        <view>结束时间：{{ formatDate(readonlyEnd) }}</view>
      </view>
    </view>

    <view class="demo-state__section">
      <view class="demo-state__title">禁用</view>
      <pa-date-range-picker
        v-model:start="disabledStart"
        v-model:end="disabledEnd"
        disabled
      />
      <view class="demo-result">
        <view>开始时间：{{ formatDate(disabledStart) }}</view>
        <view>结束时间：{{ formatDate(disabledEnd) }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const clearableStart = ref<Date>(new Date())
const clearableEnd = ref<Date>(dayjs().add(7, 'day').toDate())
const readonlyStart = ref<Date>(new Date())
const readonlyEnd = ref<Date>(dayjs().add(2, 'day').toDate())
const disabledStart = ref<Date>(new Date())
const disabledEnd = ref<Date>(dayjs().add(5, 'day').toDate())
const clearCount = ref(0)

/** 格式化日期展示 */
const formatDate = (date?: Date) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD')
}

/** 处理清空事件 */
const onClear = () => {
  clearCount.value += 1
}
</script>

<style lang="scss" scoped>
.demo-state {
  &__section + &__section {
    margin-top: 16px;
  }

  &__title {
    padding: 0 12px 8px;
    font-size: 14px;
    color: #333;
    line-height: 20px;
  }
}

.demo-result {
  padding: 8px 12px 0;
  font-size: 14px;
  color: #666;
  line-height: 20px;
}
</style>
