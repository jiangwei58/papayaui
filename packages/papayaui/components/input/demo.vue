<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="禁用和只读" card>
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="清除按钮" card>
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="配合表单使用" card>
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="聚焦全选内容" card>
    <Demo5 />
  </DocDemoBlock>

  <DocDemoBlock title="插槽" card>
    <Demo6 />
  </DocDemoBlock>

  <pa-safe-bottom />
</template>

<script setup lang="ts">
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/input/demo-1.vue'
import Demo2 from '../../demos/input/demo-2.vue'
import Demo3 from '../../demos/input/demo-3.vue'
import Demo4 from '../../demos/input/demo-4.vue'
import Demo5 from '../../demos/input/demo-5.vue'
import Demo6 from '../../demos/input/demo-6.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
