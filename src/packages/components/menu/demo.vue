<template>
  <DocDemoBlock title="基础用法">
    <pa-menu>
      <pa-menu-item v-model="state.value1" :options="state.option1"></pa-menu-item>
      <pa-menu-item v-model="state.value2" :options="state.option2"></pa-menu-item>
    </pa-menu>
  </DocDemoBlock>
  <DocDemoBlock title="自定义菜单内容">
    <pa-menu>
      <pa-menu-item v-model="state.value1" :options="state.option1"></pa-menu-item>
      <pa-menu-item title="筛选">
        <pa-cell title="包邮">
          <pa-switch size="18px" />
        </pa-cell>
        <view class="px-16 py-10">
          <pa-button block round>确定</pa-button>
        </view>
      </pa-menu-item>
    </pa-menu>
  </DocDemoBlock>
  <DocDemoBlock title="自定义颜色" style="--pa-menu-active-color: red">
    <pa-menu>
      <pa-menu-item v-model="state.value1" :options="state.option1"></pa-menu-item>
      <pa-menu-item v-model="state.value2" :options="state.option2"></pa-menu-item>
    </pa-menu>
  </DocDemoBlock>
  <DocDemoBlock title="向上展开">
    <pa-menu direction="up">
      <pa-menu-item v-model="state.value1" :options="state.option1"></pa-menu-item>
      <pa-menu-item v-model="state.value2" :options="state.option2"></pa-menu-item>
    </pa-menu>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const state = reactive({
  option1: [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
  ],
  option2: [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' },
  ],
  value1: 0,
  value2: 'a',
})
</script>

<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
