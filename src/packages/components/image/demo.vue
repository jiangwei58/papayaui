<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="填充模式" card>
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="圆角" card>
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="加载中" card>
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="加载失败" card>
    <Demo5 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import Demo1 from '../../demos/image/demo-1.vue'
import Demo2 from '../../demos/image/demo-2.vue'
import Demo3 from '../../demos/image/demo-3.vue'
import Demo4 from '../../demos/image/demo-4.vue'
import Demo5 from '../../demos/image/demo-5.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
