<template>
  <DocDemoBlock title="基础用法">
    <pa-search v-model="text" />
  </DocDemoBlock>
  <DocDemoBlock title="圆角">
    <pa-search v-model="text" shape="round" />
  </DocDemoBlock>
  <DocDemoBlock title="前后插槽">
    <pa-search v-model="text">
      <template #before>
        <text class="pr-12">前部</text>
      </template>
      <template #after>
        <text class="pl-12">搜索</text>
      </template>
    </pa-search>
  </DocDemoBlock>
  <DocDemoBlock title="前后缀插槽">
    <pa-search v-model="text">
      <template #prefix>
        <text class="p-12">地址</text>
      </template>
      <template #suffix>
        <text class="p-12">后缀</text>
      </template>
    </pa-search>
  </DocDemoBlock>
  <DocDemoBlock title="搜索框内容对齐">
    <pa-search v-model="text" input-align="center" />
  </DocDemoBlock>
  <DocDemoBlock title="只读搜索框">
    <pa-search v-model="text" readonly @click-input="onClick" />
  </DocDemoBlock>
  <DocDemoBlock title="禁用搜索框">
    <pa-search v-model="text" disabled @click-input="onClick" />
  </DocDemoBlock>
  <DocDemoBlock title="背景色">
    <pa-search v-model="text" background="var(--pa-color-primary)" input-background="#fff" />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const text = ref<string>('')

const onClick = () => {
  uni.showToast({
    icon: 'none',
    title: '点击输入框',
  })
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
