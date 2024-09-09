<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="禁用状态" card>
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="加载状态" card>
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义大小" card>
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="异步控制" card>
    <Demo5 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义颜色" card>
    <Demo6 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义值" card>
    <Demo7 />
  </DocDemoBlock>
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
