<template>
  <view style="display: flex; flex-direction: column; gap: 16px">
    <pa-segmented v-model="value" :options="options" size="small" />
    <pa-segmented v-model="value" :options="options" size="medium" />
    <pa-segmented v-model="value" :options="options" size="large" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
const options = [
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 },
]
</script>

<style lang="scss" scoped></style>
