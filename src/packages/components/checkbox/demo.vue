<template>
  <DocDemoBlock title="基础用法" card>
    <pa-checkbox v-model="singleValue">复选框</pa-checkbox>
    <view class="text-28 text-black-3 mt-30">
      <text>当前选中值</text>
      <text class="ml-10">{{ JSON.stringify(singleValue) }}</text>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="基础用法group" card>
    <pa-checkbox-group v-model="value">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
    <pa-checkbox-group v-model="value" class="block mt-50">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name" label-position="left">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
    <view class="text-28 text-black-3 mt-30">
      <text>当前选中值</text>
      <text class="ml-10">{{ JSON.stringify(value) }}</text>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="水平方向" card>
    <pa-checkbox-group v-model="value" direction="horizontal">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
    <pa-checkbox-group v-model="value" direction="horizontal" class="block mt-50">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name" label-position="left">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
  </DocDemoBlock>
  <DocDemoBlock title="形状" card>
    <pa-checkbox-group v-model="value">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name" shape="square">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
  </DocDemoBlock>
  <DocDemoBlock title="禁用" card>
    <pa-checkbox-group v-model="value">
      <pa-checkbox
        v-for="item in options"
        :key="item.name"
        :name="item.name"
        :disabled="item.name === 1"
      >
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
    <pa-checkbox-group v-model="value" disabled class="block mt-50">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
  </DocDemoBlock>
  <DocDemoBlock title="限制最大可选数（2个）" card>
    <pa-checkbox-group v-model="value" :max="2">
      <pa-checkbox v-for="item in options" :key="item.name" :name="item.name">
        {{ item.label }}
      </pa-checkbox>
    </pa-checkbox-group>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const singleValue = ref<boolean>(false)
const value = ref<number[]>([])

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '复选框' + index,
}))
</script>

<style lang="scss" scoped></style>
