<template>
  <DocDemoBlock title="选择年月日" card>
    <Demo1 />
  </DocDemoBlock>

  <DocDemoBlock title="配合Popup使用" card>
    <Demo2 />
  </DocDemoBlock>

  <DocDemoBlock title="选择年月" card>
    <Demo3 />
  </DocDemoBlock>

  <DocDemoBlock title="选择月日" card>
    <Demo4 />
  </DocDemoBlock>

  <DocDemoBlock title="选择时间" card>
    <Demo5 />
  </DocDemoBlock>

  <DocDemoBlock title="选择完整时间" card>
    <Demo6 />
  </DocDemoBlock>

  <DocDemoBlock title="选择年月日小时" card>
    <Demo7 />
  </DocDemoBlock>

  <DocDemoBlock title="显示列标题" card>
    <Demo8 />
  </DocDemoBlock>

  <DocDemoBlock title="选项过滤器" card>
    <Demo9 />
  </DocDemoBlock>

  <DocDemoBlock title="选择顺序控制" card>
    <Demo10 />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Demo1 from '../../demos/date-picker/demo-1.vue'
import Demo2 from '../../demos/date-picker/demo-2.vue'
import Demo3 from '../../demos/date-picker/demo-3.vue'
import Demo4 from '../../demos/date-picker/demo-4.vue'
import Demo5 from '../../demos/date-picker/demo-5.vue'
import Demo6 from '../../demos/date-picker/demo-6.vue'
import Demo7 from '../../demos/date-picker/demo-7.vue'
import Demo8 from '../../demos/date-picker/demo-8.vue'
import Demo9 from '../../demos/date-picker/demo-9.vue'
import Demo10 from '../../demos/date-picker/demo-10.vue'
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
