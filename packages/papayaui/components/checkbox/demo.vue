<template>
  <DocDemoBlock title="基础用法" card>
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="半选状态" card>
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="复选框组" card>
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="水平方向" card>
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="形状" card>
    <Demo5 />
  </DocDemoBlock>
  <DocDemoBlock title="禁用" card>
    <Demo6 />
  </DocDemoBlock>
  <DocDemoBlock title="限制最大可选数（2个）" card>
    <Demo7 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/checkbox/demo-1.vue'
import Demo2 from '../../demos/checkbox/demo-2.vue'
import Demo3 from '../../demos/checkbox/demo-3.vue'
import Demo4 from '../../demos/checkbox/demo-4.vue'
import Demo5 from '../../demos/checkbox/demo-5.vue'
import Demo6 from '../../demos/checkbox/demo-6.vue'
import Demo7 from '../../demos/checkbox/demo-7.vue'
</script>

<style lang="scss" scoped></style>
