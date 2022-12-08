<template>
  <DocDemoBlock title="基础用法">
    <pa-tabs v-model="tabActive" :tabs="getData(3)" />
  </DocDemoBlock>

  <DocDemoBlock title="多个滚动">
    <pa-tabs v-model="tabActive2" :tabs="getData(10)" scrollable />
  </DocDemoBlock>

  <DocDemoBlock title="自定义索引值">
    <pa-tabs v-model="tabActive3" :tabs="getData(3)" value-key="name" />
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
      name: index,
    }
  })
}

const tabActive = ref<number>(0)
const tabActive2 = ref<number>(0)
const tabActive3 = ref<number>(0)
</script>

<style lang="scss" scoped></style>
