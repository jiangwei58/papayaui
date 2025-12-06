<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="块级元素" card>
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="三种尺寸" card>
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="禁用状态" card>
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="禁用单个选项" card>
    <Demo5 />
  </DocDemoBlock>
  <DocDemoBlock title="简单数组" card>
    <Demo6 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义样式" card>
    <Demo7 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
import Demo4 from './demo-4.vue'
import Demo5 from './demo-5.vue'
import Demo6 from './demo-6.vue'
import Demo7 from './demo-7.vue'
</script>

<style lang="scss" scoped></style>
