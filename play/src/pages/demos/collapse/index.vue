<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="手风琴">
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="禁用状态">
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义标题内容">
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="嵌套使用">
    <Demo5 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script setup lang="ts">
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
import Demo4 from './demo-4.vue'
import Demo5 from './demo-5.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
