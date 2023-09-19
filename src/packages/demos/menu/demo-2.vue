<template>
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
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  option1: [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
  ],
  value1: 0,
})
</script>
