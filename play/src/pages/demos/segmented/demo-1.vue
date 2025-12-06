<template>
  <pa-segmented v-model="value" :options="options" />
  <view style="margin-top: 16px">当前值: {{ value }}</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('iOS')
const options = [
  { label: 'iOS', value: 'iOS' },
  { label: 'Android', value: 'Android' },
  { label: 'Web', value: 'Web' },
]
</script>

<style lang="scss" scoped></style>
