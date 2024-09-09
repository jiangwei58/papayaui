<template>
  <DocDemoBlock>
    <pa-cell title="基础用法">
      <Demo1 />
    </pa-cell>
    <pa-cell title="步长设置">
      <Demo2 />
    </pa-cell>
    <pa-cell title="限制输入范围">
      <Demo3 />
    </pa-cell>
    <pa-cell title="输入小数">
      <Demo4 />
    </pa-cell>
    <pa-cell title="禁用状态">
      <Demo5 />
    </pa-cell>
    <pa-cell title="禁用输入框">
      <Demo6 />
    </pa-cell>
    <pa-cell title="异步">
      <Demo7 />
    </pa-cell>
    <pa-cell title="只显示输入框">
      <Demo8 />
    </pa-cell>
    <pa-cell title="聚焦选中全部内容">
      <Demo9 />
    </pa-cell>
  </DocDemoBlock>
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
