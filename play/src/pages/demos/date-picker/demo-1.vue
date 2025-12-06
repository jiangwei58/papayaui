<template>
  <pa-date-picker v-model="dateValue" title="选择年月日" @confirm="onConfirm" />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const dateValue = ref<Date>(new Date())

const onConfirm = (date: Date) => {
  const newVal = dayjs(date)
  uni.showToast({
    icon: 'none',
    title: `当前选中的值是1：${newVal.format('YYYY-MM-DD HH:mm:ss')}`,
  })
}
</script>
