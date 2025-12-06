<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="显示头像">
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="头像样式">
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="显示子组件">
    <Demo4 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script setup lang="ts">
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
import Demo4 from './demo-4.vue'
</script>

<style lang="scss" scoped></style>
