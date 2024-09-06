<template>
  <pa-tabs v-model="tabActive" :tabs="getData(3)" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tabActive = ref<number>(0)

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      title: `自定义${index}`,
      label: `标签${index}`,
      name: index,
      value: index,
    }
  })
}
</script>
