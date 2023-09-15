<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="卡片风格">
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="展示箭头">
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="后缀">
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="图标">
    <Demo5 />
  </DocDemoBlock>

  <DocDemoBlock title="插槽">
    <Demo6 />
  </DocDemoBlock>

  <DocDemoBlock title="居中">
    <Demo7 />
  </DocDemoBlock>

  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/cell/demo-1.vue'
import Demo2 from '../../demos/cell/demo-2.vue'
import Demo3 from '../../demos/cell/demo-3.vue'
import Demo4 from '../../demos/cell/demo-4.vue'
import Demo5 from '../../demos/cell/demo-5.vue'
import Demo6 from '../../demos/cell/demo-6.vue'
import Demo7 from '../../demos/cell/demo-7.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
