<template>
  <pa-cell title="文本">
    <pa-input placeholder="请输入" />
  </pa-cell>
  <pa-cell title="数字">
    <pa-input type="number" placeholder="请输入" />
  </pa-cell>
  <pa-cell title="小数">
    <pa-input type="number" :decimal-length="2" placeholder="请输入" />
  </pa-cell>
  <pa-cell title="最大最小值">
    <pa-input v-model.number="value" type="number" :min="2" :max="99" placeholder="请输入" />
  </pa-cell>
  <pa-cell title="允许输入负数">
    <pa-input
      v-model.number="negativeValue"
      type="number"
      :min="-100"
      :max="100"
      :decimal-length="2"
      allow-negative
      placeholder="请输入"
    />
  </pa-cell>
</template>

<script setup lang="ts">
/**
 * @tip 数据值默认都为 string 类型，如需要 number 类型，你可以在 v-model 后添加 .number 修饰符
 */
import { ref } from 'vue'

const value = ref<number>()
const negativeValue = ref<number>()
</script>
