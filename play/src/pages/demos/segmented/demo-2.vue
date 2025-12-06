<template>
  <pa-segmented v-model="value" :options="options" block />
  <view style="margin-top: 16px">当前值: {{ value }}</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('list')
const options = [
  { label: '列表', value: 'list' },
  { label: '看板', value: 'kanban' },
  { label: '日历', value: 'calendar' },
]
</script>

<style lang="scss" scoped></style>
