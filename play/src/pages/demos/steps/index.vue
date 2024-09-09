<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="竖向步骤条" card>
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义" card>
    <Demo3 />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
</script>

<style lang="scss" scoped></style>
