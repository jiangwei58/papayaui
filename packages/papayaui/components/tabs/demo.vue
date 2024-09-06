<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="通过名称匹配">
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="标签栏滚动">
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="禁用标签">
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="点击事件">
    <Demo5 />
  </DocDemoBlock>

  <DocDemoBlock title="切换动画">
    <Demo6 />
  </DocDemoBlock>

  <DocDemoBlock title="tabs传入方式 - 基础用法">
    <Demo7 />
  </DocDemoBlock>

  <DocDemoBlock title="tabs传入方式 - 自定义索引值">
    <Demo8 />
  </DocDemoBlock>

  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import Demo1 from '../../demos/tabs/demo-1.vue'
import Demo2 from '../../demos/tabs/demo-2.vue'
import Demo3 from '../../demos/tabs/demo-3.vue'
import Demo4 from '../../demos/tabs/demo-4.vue'
import Demo5 from '../../demos/tabs/demo-5.vue'
import Demo6 from '../../demos/tabs/demo-6.vue'
import Demo7 from '../../demos/tabs/demo-7.vue'
import Demo8 from '../../demos/tabs/demo-8.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss">
.pa-tab__pane {
  padding: 24px 20px;
  background-color: #fff;
}
</style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
