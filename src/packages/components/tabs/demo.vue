<template>
  <DocDemoBlock title="基础用法">
    <wei-tabs v-model="tabActive" :tabs="getData(3)" />
  </DocDemoBlock>

  <DocDemoBlock title="多个滚动">
    <wei-tabs v-model="tabActive2" :tabs="getData(10)" scrollable />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

interface TabItem {
  label: string
  value: number
}

const getData = (count: number) => {
  return new Array(count).fill(0).map<TabItem>((_item, index) => {
    return {
      label: `标签${index}`,
      value: index,
    }
  })
}

const tabActive = ref<number>(0)
const tabActive2 = ref<number>(0)
</script>

<style lang="scss" scoped></style>
