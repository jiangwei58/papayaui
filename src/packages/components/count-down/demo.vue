<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义格式" card>
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="毫秒级渲染" card>
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义样式" card>
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="手动控制" card>
    <Demo5 />
  </DocDemoBlock>
</template>

<script setup lang="ts">
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/count-down/demo-1.vue'
import Demo2 from '../../demos/count-down/demo-2.vue'
import Demo3 from '../../demos/count-down/demo-3.vue'
import Demo4 from '../../demos/count-down/demo-4.vue'
import Demo5 from '../../demos/count-down/demo-5.vue'
</script>
