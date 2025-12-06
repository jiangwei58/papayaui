<template>
  <pa-cell title="选择年月日" :value="dateText" clickable @click="datePickerShow = true" />
  <pa-popup v-model:show="datePickerShow" position="bottom">
    <pa-date-picker title="选择年月日" @cancel="datePickerShow = false" @confirm="onConfirm" />
  </pa-popup>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const datePickerShow = ref<boolean>(false)
const dateText = ref<string>('')

const onConfirm = (date: Date) => {
  const newVal = dayjs(date)
  dateText.value = newVal.format('YYYY-MM-DD')
  uni.showToast({
    icon: 'none',
    title: `当前选中的值是：${newVal.format('YYYY-MM-DD HH:mm:ss')}`,
  })
}
</script>
