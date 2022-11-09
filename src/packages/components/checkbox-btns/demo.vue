<template>
  <DocDemoBlock title="基础用法" card>
    <wei-checkbox-btns v-model="selectedValue1" :options="getData(6)" />
  </DocDemoBlock>

  <DocDemoBlock title="多选" card>
    <wei-checkbox-btns v-model="selectedValue2" :options="getData(6)" multiple />
  </DocDemoBlock>

  <DocDemoBlock title="自定义布局" card>
    <wei-checkbox-btns v-model="selectedValue3" :options="getData(8)" :column="4" gap="10" round />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

interface Option {
  label: string
  value: number
}

const selectedValue1 = ref<Option['value']>()
const selectedValue2 = ref<Option['value'][]>([])
const selectedValue3 = ref<Option['value']>()

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      label: `选项${index}`,
      value: index,
    }
  })
}
</script>

<style lang="scss" scoped></style>
