<template>
  <pa-cell title="日期区间最大范围" :value="dateStr" is-link @click="onShow()" />

  <pa-calendar v-model:show="visible" type="range" :max-range="3" @confirm="onConfirm" />
</template>

<script lang="ts" setup>
/**
 * @description 选择日期区间时，可以通过max-range属性来指定最多可选天数
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
