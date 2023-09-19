<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="图片类型">
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="底部内容">
    <Demo3 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/empty/demo-1.vue'
import Demo2 from '../../demos/empty/demo-2.vue'
import Demo3 from '../../demos/empty/demo-3.vue'
</script>

<style lang="scss" scoped></style>
