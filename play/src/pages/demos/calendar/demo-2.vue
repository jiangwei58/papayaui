<template>
  <pa-cell title="多个日期" :value="dateStr" is-link @click="onShow()" />

  <pa-calendar v-model:show="visible" type="multiple" @confirm="onConfirm" />
</template>

<script lang="ts" setup>
/**
 * @description 设置type为multiple后可以选择多个日期，此时confirm事件返回的 date 为数组结构，数组包含若干个选中的日期。
 */
import dayjs from 'dayjs'
import { ref } from 'vue'

const visible = ref<boolean>(false)
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = (value as Date[]).map((date) => dayjs(date).format('YYYY-MM-DD')).toString()
}
</script>
