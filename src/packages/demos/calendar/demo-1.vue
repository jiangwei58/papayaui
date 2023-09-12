<template>
  <pa-cell title="单个日期" :value="dateStr" is-link @click="onShow()" />

  <pa-calendar v-model:show="visible" type="single" @confirm="onConfirm" />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const visible = ref<boolean>(false)
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = dayjs(value as Date).format('YYYY-MM-DD')
}
</script>
