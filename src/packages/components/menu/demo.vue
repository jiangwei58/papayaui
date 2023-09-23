<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义菜单内容">
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义颜色">
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="向上展开">
    <Demo4 />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import Demo1 from '../../demos/menu/demo-1.vue'
import Demo2 from '../../demos/menu/demo-2.vue'
import Demo3 from '../../demos/menu/demo-3.vue'
import Demo4 from '../../demos/menu/demo-4.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
