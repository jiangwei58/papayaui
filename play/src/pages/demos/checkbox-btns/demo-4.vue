<template>
  <pa-checkbox-btns v-model="selectedValue" :options="getData(8)">
    <template #default="{ item, index }">
      <pa-icon :name="index % 2 === 0 ? 'success' : 'close'" />
      <text>{{ item.label }}</text>
    </template>
  </pa-checkbox-btns>
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
