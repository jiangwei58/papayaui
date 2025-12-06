<template>
  <pa-segmented v-model="value" :options="options" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('daily')
const options = [
  { label: '每日', value: 'daily' },
  { label: '每周', value: 'weekly' },
  { label: '每月', value: 'monthly' },
]
</script>

<style lang="scss" scoped></style>
