<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="圆角">
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="前后插槽">
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="前后缀插槽">
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="搜索框内容对齐">
    <Demo5 />
  </DocDemoBlock>
  <DocDemoBlock title="禁用和只读搜索框">
    <Demo6 />
  </DocDemoBlock>
  <DocDemoBlock title="背景色">
    <Demo7 />
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
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
