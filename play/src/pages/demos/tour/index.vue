<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="无目标居中气泡" card>
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义配置" card>
    <Demo3 />
  </DocDemoBlock>

  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
</script>

<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
