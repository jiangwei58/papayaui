<template>
  <DocDemoBlock title="基础用法">
    <pa-cell-group inset>
      <Demo1 />
      <Demo2 />
      <Demo3 />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="快捷选择">
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="自定义日历">
    <pa-cell-group inset>
      <Demo5 />
      <Demo6 />
      <Demo7 />
      <Demo8 />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="平铺展示" card>
    <Demo9 />
  </DocDemoBlock>
  <SafeBottom />
</template>

<script lang="ts" setup>
import Demo1 from '../../demos/calendar/demo-1.vue'
import Demo2 from '../../demos/calendar/demo-2.vue'
import Demo3 from '../../demos/calendar/demo-3.vue'
import Demo4 from '../../demos/calendar/demo-4.vue'
import Demo5 from '../../demos/calendar/demo-5.vue'
import Demo6 from '../../demos/calendar/demo-6.vue'
import Demo7 from '../../demos/calendar/demo-7.vue'
import Demo8 from '../../demos/calendar/demo-8.vue'
import Demo9 from '../../demos/calendar/demo-9.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
