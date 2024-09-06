<template>
  <DocDemoBlock title="基础用法">
    <pa-cell-group inset>
      <Demo1 />
      <Demo2 />
    </pa-cell-group>
  </DocDemoBlock>
  <DocDemoBlock title="异步加载选项">
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义字段名">
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="搜索">
    <pa-cell-group inset>
      <Demo5 />
      <Demo6 />
    </pa-cell-group>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import Demo1 from '../../demos/cascader/demo-1.vue'
import Demo2 from '../../demos/cascader/demo-2.vue'
import Demo3 from '../../demos/cascader/demo-3.vue'
import Demo4 from '../../demos/cascader/demo-4.vue'
import Demo5 from '../../demos/cascader/demo-5.vue'
import Demo6 from '../../demos/cascader/demo-6.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
