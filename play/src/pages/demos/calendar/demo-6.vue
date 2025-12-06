<template>
  <pa-cell title="自定义按钮文字" :value="dateStr" is-link @click="onShow()" />

  <pa-calendar
    v-model:show="visible"
    type="range"
    confirm-text="完成"
    confirm-disabled-text="请选择结束时间"
    @confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
/**
 * @description 通过confirm-text设置按钮文字，通过confirm-disabled-text设置按钮禁用时的文字。
 */
import dayjs from 'dayjs'
import { ref } from 'vue'

const visible = ref<boolean>(false)
const dateStr = ref('')

const onShow = () => {
  visible.value = true
}

const onConfirm = (value: Date | Date[]) => {
  dateStr.value = (value as Date[]).map((item) => dayjs(item).format('YYYY-MM-DD')).join('~')
}
</script>
