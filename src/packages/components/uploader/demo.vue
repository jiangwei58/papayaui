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

  <pa-safe-bottom />
</template>

<script setup lang="ts">
import Demo1 from '../../demos/uploader/demo-1.vue'
import Demo2 from '../../demos/uploader/demo-2.vue'
import Demo3 from '../../demos/uploader/demo-3.vue'
import Demo4 from '../../demos/uploader/demo-4.vue'
import Demo5 from '../../demos/uploader/demo-5.vue'
import Demo6 from '../../demos/uploader/demo-6.vue'
import Demo7 from '../../demos/uploader/demo-7.vue'
import Demo8 from '../../demos/uploader/demo-8.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
