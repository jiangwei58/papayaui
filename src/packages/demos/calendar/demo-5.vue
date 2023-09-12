<template>
  <pa-cell title="自定义日期范围" :value="dateStr" is-link @click="onShow()" />

  <pa-calendar
    v-model:show="visible"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
/**
 * @description 通过 min-date 和 max-date 定义日历的范围
 */
import dayjs from 'dayjs'
import { ref } from 'vue'

const visible = ref<boolean>(false)
const minDate = dayjs().startOf('month').valueOf()
const maxDate = dayjs().endOf('month').valueOf()
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = dayjs(value as Date).format('YYYY-MM-DD')
}
</script>
