<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="滚动播放">
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="多行展示">
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="通知栏模式">
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="可关闭">
    <Demo5 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义样式">
    <Demo6 />
  </DocDemoBlock>
</template>

<script setup lang="ts">
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
import Demo4 from './demo-4.vue'
import Demo5 from './demo-5.vue'
import Demo6 from './demo-6.vue'
</script>

<style lang="scss" scoped></style>
