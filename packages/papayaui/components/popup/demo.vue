<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="关闭按钮">
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="圆角弹窗">
    <Demo3 />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import Demo1 from '../../demos/popup/demo-1.vue'
import Demo2 from '../../demos/popup/demo-2.vue'
import Demo3 from '../../demos/popup/demo-3.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
