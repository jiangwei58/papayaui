<template>
  <DocDemoBlock title="基础用法">
    <pa-cell-group inset>
      <Demo1 />
      <Demo2 />
      <Demo3 />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="快捷选择">
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义日历">
    <pa-cell-group inset>
      <Demo5 />
      <Demo6 />
      <Demo7 />
      <Demo8 />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="平铺展示" card>
    <Demo9 />
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
import Demo8 from './demo-8.vue'
import Demo9 from './demo-9.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
