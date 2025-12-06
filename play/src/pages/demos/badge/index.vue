<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="最大值" card>
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义颜色" card>
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义内容" card>
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="自定义位置" card>
    <Demo5 />
  </DocDemoBlock>
  <DocDemoBlock title="边框" card>
    <Demo7 />
  </DocDemoBlock>
  <DocDemoBlock title="独立展示" card>
    <Demo6 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
import Demo4 from './demo-4.vue'
import Demo5 from './demo-5.vue'
import Demo6 from './demo-6.vue'
import Demo7 from './demo-7.vue'
</script>

<style lang="scss">
.demo-badge {
  :deep(.pa-badge) {
    margin-right: 42px;
  }
}
:deep(.demo-badge-block) {
  width: 40px;
  height: 40px;
  background-color: rgb(238, 238, 238);
  border-radius: 3px;
}
</style>
