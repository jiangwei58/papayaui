<template>
  <DocDemoBlock>
    <pa-cell title="基础用法">
      <pa-input-number v-model="input1" />
    </pa-cell>
    <pa-cell title="步长设置">
      <pa-input-number v-model="input2" step="2" />
    </pa-cell>
    <pa-cell title="限制输入范围">
      <pa-input-number v-model="input3" min="2" max="6" />
    </pa-cell>
    <pa-cell title="输入小数">
      <pa-input-number v-model="input4" min="0" step="0.2" :decimal-length="2" />
    </pa-cell>
    <pa-cell title="禁用状态">
      <pa-input-number v-model="input5" disabled />
    </pa-cell>
    <pa-cell title="禁用输入框">
      <pa-input-number v-model="input6" readonly />
    </pa-cell>
    <pa-cell title="异步">
      <pa-input-number :model-value="input7" async-change @change="onChange" />
    </pa-cell>
    <pa-cell title="只显示输入框">
      <pa-input-number v-model="input8" :controls="false" input-width="92px" />
    </pa-cell>
    <pa-cell title="输入样式">
      <pa-input-number
        v-model="input9"
        :controls="false"
        block
        input-align="right"
        plain
        placeholder="请输入"
      />
    </pa-cell>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { sleep } from '../../utils/common'

const input1 = ref<number>(1)
const input2 = ref<number>(1)
const input3 = ref<number>(1)
const input4 = ref<number>(1)
const input5 = ref<number>(1)
const input6 = ref<number>(1)
const input7 = ref<number>(1)
const input8 = ref<number>(1)
const input9 = ref<number>(1)

const onChange = async (value: number) => {
  uni.showToast({
    icon: 'loading',
    title: '',
    duration: 2000,
  })
  await sleep(2000)
  input7.value = value
  uni.hideToast()
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
