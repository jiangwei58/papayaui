<template>
  <pa-switch :model-value="checked" :loading="loading" @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SwitchValue } from '../..'

const checked = ref<boolean>(true)
const loading = ref<boolean>(false)

const onChange = (value: SwitchValue) => {
  loading.value = true
  setTimeout(() => {
    checked.value = value as boolean
    loading.value = false
  }, 2000)
}
</script>

<style lang="scss" scoped></style>
