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
import Demo1 from '../../demos/input-number/demo-1.vue'
import Demo2 from '../../demos/input-number/demo-2.vue'
import Demo3 from '../../demos/input-number/demo-3.vue'
import Demo4 from '../../demos/input-number/demo-4.vue'
import Demo5 from '../../demos/input-number/demo-5.vue'
import Demo6 from '../../demos/input-number/demo-6.vue'
import Demo7 from '../../demos/input-number/demo-7.vue'
import Demo8 from '../../demos/input-number/demo-8.vue'
import Demo9 from '../../demos/input-number/demo-9.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
