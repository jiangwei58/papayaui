<template>
  <pa-count-to ref="countToRef" :start-num="0" :end-num="999" custom-class="text-60 text-black" />
  <view class="grid grid-cols-3 gap-20 mt-30">
    <pa-button block @click="countToRef?.start">开始</pa-button>
    <pa-button block @click="countToRef?.pause">暂停</pa-button>
    <pa-button block @click="countToRef?.resume">继续</pa-button>
    <pa-button block @click="countToRef?.reset">重置</pa-button>
    <pa-button block @click="countToRef?.restart">重新开始</pa-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { CountToInstance } from '../..'

const countToRef = ref<CountToInstance>()
</script>
