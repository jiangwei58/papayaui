<template>
  <DocDemoBlock title="提示弹窗">
    <pa-cell-group inset>
      <Demo1 />
      <Demo2 />
      <Demo3 />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="圆角按钮样式">
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="异步关闭">
    <Demo5 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义内容">
    <pa-cell-group inset>
      <Demo6 />
      <Demo7 />
    </pa-cell-group>
  </DocDemoBlock>
</template>

<script setup lang="ts">
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
