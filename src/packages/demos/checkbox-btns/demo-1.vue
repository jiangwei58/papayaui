<template>
  <pa-checkbox-btns v-model="selectedValue" :options="getData(6)" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValue = ref<number>(0)

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      label: `选项${index}`,
      value: index,
    }
  })
}
</script>
