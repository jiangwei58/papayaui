<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义右侧">
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义标题">
    <Demo3 />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import Demo1 from '../../demos/section/demo-1.vue'
import Demo2 from '../../demos/section/demo-2.vue'
import Demo3 from '../../demos/section/demo-3.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
