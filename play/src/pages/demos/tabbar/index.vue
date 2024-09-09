<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="通过名称匹配">
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="徽标提示">
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义图标">
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义颜色">
    <Demo5 />
  </DocDemoBlock>

  <DocDemoBlock title="监听事件">
    <Demo6 />
  </DocDemoBlock>

  <DocDemoBlock title="固定在底部">
    <Demo7 />
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
import Demo7 from './demo-7.vue'
</script>

<style lang="scss" scoped></style>
