<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="显示字数统计">
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="自动增高">
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="禁用和只读">
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="配合表单使用">
    <Demo5 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/textarea/demo-1.vue'
import Demo2 from '../../demos/textarea/demo-2.vue'
import Demo3 from '../../demos/textarea/demo-3.vue'
import Demo4 from '../../demos/textarea/demo-4.vue'
import Demo5 from '../../demos/textarea/demo-5.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
