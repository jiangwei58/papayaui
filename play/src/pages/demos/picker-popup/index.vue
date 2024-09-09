<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="远程数据">
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="远程分页数据">
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="创建条目">
    <Demo4 />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
import Demo4 from './demo-4.vue'
</script>

<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
