<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="多选" card>
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义布局" card>
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义内容" card>
    <Demo4 />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/checkbox-btns/demo-1.vue'
import Demo2 from '../../demos/checkbox-btns/demo-2.vue'
import Demo3 from '../../demos/checkbox-btns/demo-3.vue'
import Demo4 from '../../demos/checkbox-btns/demo-4.vue'
</script>

<style lang="scss" scoped></style>
