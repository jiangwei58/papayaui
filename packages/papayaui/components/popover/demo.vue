<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="选项配置" card>
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义内容" card>
    <Demo3 />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/popover/demo-1.vue'
import Demo2 from '../../demos/popover/demo-2.vue'
import Demo3 from '../../demos/popover/demo-3.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
