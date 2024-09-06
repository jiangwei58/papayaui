<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义文案">
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="颜色">
    <Demo3 />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import Demo1 from '../../demos/loadmore/demo-1.vue'
import Demo2 from '../../demos/loadmore/demo-2.vue'
import Demo3 from '../../demos/loadmore/demo-3.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
