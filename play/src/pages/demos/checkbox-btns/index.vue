<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="多选" card>
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义布局" card>
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义内容" card>
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="禁用状态" card>
    <Demo5 />
  </DocDemoBlock>

  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
import Demo4 from './demo-4.vue'
import Demo5 from './demo-5.vue'
</script>

<style lang="scss" scoped></style>
