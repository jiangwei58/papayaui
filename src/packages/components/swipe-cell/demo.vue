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
import Demo1 from '../../demos/swipe-cell/demo-1.vue'
import Demo2 from '../../demos/swipe-cell/demo-2.vue'
import Demo3 from '../../demos/swipe-cell/demo-3.vue'
import Demo4 from '../../demos/swipe-cell/demo-4.vue'
import Demo5 from '../../demos/swipe-cell/demo-5.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
