<template>
  <pa-cell title="日期区间" :value="dateStr" is-link @click="onShow()" />

  <pa-calendar v-model:show="visible" type="range" @confirm="onConfirm" />
</template>

<script lang="ts" setup>
/**
 * @description 设置type为range后可以选择日期区间，此时confirm事件返回的 date 为数组结构，数组第一项为开始时间，第二项为结束时间。
 * @tips 默认情况下，日期区间的起止时间不能为同一天，可以通过设置 allow-same-day 属性来允许选择同一天。
 */
import dayjs from 'dayjs'
import { ref } from 'vue'

const visible = ref<boolean>(false)
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = (value as Date[]).map((date) => dayjs(date).format('YYYY-MM-DD')).join('~')
}
</script>
