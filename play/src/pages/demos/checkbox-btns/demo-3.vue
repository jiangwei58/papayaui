<template>
  <pa-checkbox-btns v-model="selectedValue" :options="getData(8)" :column="4" gap="10" round />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValue = ref<number>()

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      label: `选项${index}`,
      value: index,
    }
  })
}
</script>
