<template>
  <docDemoBlock title="提示弹窗">
    <pa-cell-group inset>
      <Demo1 />
      <Demo2 />
      <Demo3 />
    </pa-cell-group>
  </docDemoBlock>

  <docDemoBlock title="圆角按钮样式">
    <Demo4 />
  </docDemoBlock>

  <docDemoBlock title="异步关闭">
    <Demo5 />
  </docDemoBlock>

  <docDemoBlock title="自定义内容">
    <pa-cell-group inset>
      <Demo6 />
      <Demo7 />
    </pa-cell-group>
  </docDemoBlock>
</template>

<script setup lang="ts">
import docDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/dialog/demo-1.vue'
import Demo2 from '../../demos/dialog/demo-2.vue'
import Demo3 from '../../demos/dialog/demo-3.vue'
import Demo4 from '../../demos/dialog/demo-4.vue'
import Demo5 from '../../demos/dialog/demo-5.vue'
import Demo6 from '../../demos/dialog/demo-6.vue'
import Demo7 from '../../demos/dialog/demo-7.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
