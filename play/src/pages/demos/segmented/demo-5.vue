<template>
  <pa-segmented v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('read')
const options = [
  { label: '只读', value: 'read' },
  { label: '编辑', value: 'edit' },
  { label: '禁用', value: 'disabled', disabled: true },
]
</script>

<style lang="scss" scoped></style>
