<template>
  <pa-swipe-cell :options="options">
    <view class="flex bg-white p-20">
      <pa-image src="" width="200" height="200" round="10" />
      <view class="flex-1 ml-15 text-28">
        <text class="text-black block">内容标题</text>
        <text class="text-black-3 block">描述信息</text>
        <view class="flex justify-between mt-80">
          <text class="text-price">2.00</text>
          <text class="text-black-3">x2</text>
        </view>
      </view>
    </view>
  </pa-swipe-cell>
</template>

<script lang="ts" setup>
import type { SwipeCellOption } from 'papayaui'

const options: SwipeCellOption[] = [{ text: '删除' }]
</script>
