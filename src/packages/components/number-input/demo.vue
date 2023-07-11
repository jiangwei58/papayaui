<template>
  <DocDemoBlock title="基础用法">
    <pa-cell title="单元格">
      <pa-number-input v-model="input1" placeholder="请输入" align="right" />
    </pa-cell>
  </DocDemoBlock>

  <DocDemoBlock title="最大最小值">
    <pa-cell title="单元格">
      <pa-number-input v-model="input2" placeholder="请输入" align="right" :min="5" :max="999" />
    </pa-cell>
  </DocDemoBlock>

  <DocDemoBlock title="整数小数位长度限制">
    <pa-cell title="单元格">
      <pa-number-input
        v-model="input3"
        placeholder="请输入"
        align="right"
        :int-length="5"
        :precision="2"
      />
    </pa-cell>
  </DocDemoBlock>

  <DocDemoBlock title="禁用">
    <pa-cell title="单元格">
      <pa-number-input model-value="9999" placeholder="请输入" align="right" disabled />
    </pa-cell>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const input1 = ref<string>()
const input2 = ref<string>()
const input3 = ref<string>()
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
