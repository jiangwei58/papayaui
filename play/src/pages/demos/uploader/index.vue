<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="文件预览" card>
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="限制上传数量" card>
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="限制上传大小" card>
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义上传样式" card>
    <Demo5 />
  </DocDemoBlock>

  <DocDemoBlock title="禁用文件上传" card>
    <Demo6 />
  </DocDemoBlock>

  <DocDemoBlock title="独立控制删除" card>
    <Demo7 />
  </DocDemoBlock>

  <DocDemoBlock title="其他文件类型" card>
    <Demo8 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义预览" card>
    <Demo9 />
  </DocDemoBlock>

  <pa-safe-bottom />
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
import Demo8 from './demo-8.vue'
import Demo9 from './demo-9.vue'
</script>

<style lang="scss" scoped></style>
