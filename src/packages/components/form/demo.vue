<template>
  <DocDemoBlock title="基础用法">
    <Demo1 />
  </DocDemoBlock>
  <DocDemoBlock title="校验规则">
    <Demo2 />
  </DocDemoBlock>
  <DocDemoBlock title="单个校验触发">
    <Demo3 />
  </DocDemoBlock>
  <DocDemoBlock title="复杂类型">
    <Demo4 />
  </DocDemoBlock>
  <DocDemoBlock title="动态表单">
    <Demo5 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import Demo1 from '../../demos/form/demo-1.vue'
import Demo2 from '../../demos/form/demo-2.vue'
import Demo3 from '../../demos/form/demo-3.vue'
import Demo4 from '../../demos/form/demo-4.vue'
import Demo5 from '../../demos/form/demo-5.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
