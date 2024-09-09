<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义内容">
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="多个按钮">
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="禁用">
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="插槽">
    <Demo5 />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
import Demo4 from './demo-4.vue'
import Demo5 from './demo-5.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
