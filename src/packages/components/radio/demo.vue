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
import Demo1 from '../../demos/radio/demo-1.vue'
import Demo2 from '../../demos/radio/demo-2.vue'
import Demo3 from '../../demos/radio/demo-3.vue'
import Demo4 from '../../demos/radio/demo-4.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
