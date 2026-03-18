<template>
  <DocDemoBlock title="年月日区间" card>
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="年月日时分区间" card>
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="带 label 的年月日区间" card>
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="禁用、只读与可清空" card>
    <Demo4 />
  </DocDemoBlock>

  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../../components/doc-demo-block.vue'
import Demo1 from './demo-1.vue'
import Demo2 from './demo-2.vue'
import Demo3 from './demo-3.vue'
import Demo4 from './demo-4.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>

