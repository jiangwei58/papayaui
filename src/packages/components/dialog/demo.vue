<template>
  <docDemoBlock title="提示弹窗">
    <Demo1 />
  </docDemoBlock>

  <docDemoBlock title="圆角按钮样式">
    <Demo2 />
  </docDemoBlock>

  <docDemoBlock title="异步关闭">
    <Demo3 />
  </docDemoBlock>

  <docDemoBlock title="自定义内容">
    <Demo4 />
  </docDemoBlock>

  <pa-button @click="onClick">弹窗</pa-button>
  <pa-dialog id="pa-dialog" />
</template>

<script setup lang="ts">
import docDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/dialog/demo-1.vue'
import Demo2 from '../../demos/dialog/demo-2.vue'
import Demo3 from '../../demos/dialog/demo-3.vue'
import Demo4 from '../../demos/dialog/demo-4.vue'
import Dialog from './dialog'

const onClick = () => {
  Dialog()
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
