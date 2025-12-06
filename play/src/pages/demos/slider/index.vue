<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="双滑块" card>
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="指定范围" card>
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="设置步长" card>
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="显示范围" card>
    <Demo5 />
  </DocDemoBlock>
  <DocDemoBlock title="显示标签" card>
    <Demo6 class="block mt-40" />
  </DocDemoBlock>
  <DocDemoBlock title="禁用" card>
    <Demo7 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义样式" card>
    <Demo8 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义按钮" card>
    <Demo9 />
  </DocDemoBlock>
  <DocDemoBlock title="刻度标记" card>
    <Demo10 />
  </DocDemoBlock>
  <pa-safe-bottom class="block mt-30" />
</template>

<script setup lang="ts">
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo10 from './demo-10.vue'
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
