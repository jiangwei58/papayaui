<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义底部">
    <Demo2 />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/bottom-popup/demo-1.vue'
import Demo2 from '../../demos/bottom-popup/demo-2.vue'
</script>

<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
