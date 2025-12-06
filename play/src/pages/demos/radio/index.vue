<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="水平方向" card>
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="形状" card>
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="禁用" card>
    <Demo4 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
import Demo4 from './demo-4.vue'
</script>

<style lang="scss" scoped></style>
