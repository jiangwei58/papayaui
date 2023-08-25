<template>
  <DocDemoBlock title="基础用法">
    <pa-tabs v-model="tabActive">
      <pa-tab-pane title="标签1">内容1</pa-tab-pane>
      <pa-tab-pane title="标签2">内容2</pa-tab-pane>
      <pa-tab-pane title="标签3">内容3</pa-tab-pane>
      <pa-tab-pane title="标签4">内容4</pa-tab-pane>
    </pa-tabs>
  </DocDemoBlock>

  <DocDemoBlock title="通过名称匹配">
    <pa-tabs v-model="tabActive2">
      <pa-tab-pane title="标签1" name="a">内容1</pa-tab-pane>
      <pa-tab-pane title="标签2" name="b">内容2</pa-tab-pane>
      <pa-tab-pane title="标签3" name="c">内容3</pa-tab-pane>
    </pa-tabs>
  </DocDemoBlock>

  <DocDemoBlock title="标签栏滚动">
    <pa-tabs v-model="tabActive3" scrollable>
      <pa-tab-pane title="标签1">内容1</pa-tab-pane>
      <pa-tab-pane title="标签2">内容2</pa-tab-pane>
      <pa-tab-pane title="标签3">内容3</pa-tab-pane>
      <pa-tab-pane title="标签4">内容4</pa-tab-pane>
      <pa-tab-pane title="标签5">内容5</pa-tab-pane>
      <pa-tab-pane title="标签6">内容6</pa-tab-pane>
      <pa-tab-pane title="标签7">内容7</pa-tab-pane>
      <pa-tab-pane title="标签8">内容8</pa-tab-pane>
    </pa-tabs>
  </DocDemoBlock>

  <DocDemoBlock title="禁用标签">
    <pa-tabs v-model="tabActive4">
      <pa-tab-pane title="标签1">内容1</pa-tab-pane>
      <pa-tab-pane title="标签2" disabled>内容2</pa-tab-pane>
      <pa-tab-pane title="标签3">内容3</pa-tab-pane>
    </pa-tabs>
  </DocDemoBlock>

  <DocDemoBlock title="点击事件">
    <pa-tabs v-model="tabActive5" @change="onChange">
      <pa-tab-pane title="标签1">内容1</pa-tab-pane>
      <pa-tab-pane title="标签2">内容2</pa-tab-pane>
    </pa-tabs>
  </DocDemoBlock>

  <DocDemoBlock title="切换动画">
    <pa-tabs v-model="tabActive6" animated>
      <pa-tab-pane title="标签1">内容1</pa-tab-pane>
      <pa-tab-pane title="标签2">内容2</pa-tab-pane>
      <pa-tab-pane title="标签3">内容3</pa-tab-pane>
      <pa-tab-pane title="标签4">内容4</pa-tab-pane>
    </pa-tabs>
  </DocDemoBlock>

  <DocDemoBlock title="tabs传入方式 - 基础用法">
    <pa-tabs v-model="tabActive" :tabs="getData(3)" />
  </DocDemoBlock>

  <DocDemoBlock title="tabs传入方式 - 自定义索引值">
    <pa-tabs
      v-model="tabActive3"
      :tabs="getData(3)"
      label-key="label"
      value-key="value"
      @change="onChange2"
    />
  </DocDemoBlock>

  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { TabItem } from './props'

interface CustomTabItem {
  title: string
  label: string
  value: number
  name: number
}

const tabActive = ref<number>(0)
const tabActive2 = ref<number>(0)
const tabActive3 = ref<number>(0)
const tabActive4 = ref<number>(0)
const tabActive5 = ref<number>(0)
const tabActive6 = ref<number>(0)

const onChange = (item: TabItem) => {
  // 如果是使用tabs传入的方式，item为tabs里对应选中的对象
  uni.showToast({
    title: item.title,
    icon: 'none',
  })
}

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      title: `自定义${index}`,
      label: `标签${index}`,
      name: index,
      value: index,
    }
  })
}

const onChange2 = (item: CustomTabItem) => {
  uni.showToast({
    title: item.label,
    icon: 'none',
  })
}
</script>

<style lang="scss">
.pa-tab__pane {
  padding: 24px 20px;
  background-color: #fff;
}
</style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
