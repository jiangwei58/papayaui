<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="样式定制" card>
    <Demo2 />
  </DocDemoBlock>
</template>

<script setup lang="ts">
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/circle/demo-1.vue'
import Demo2 from '../../demos/circle/demo-2.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
