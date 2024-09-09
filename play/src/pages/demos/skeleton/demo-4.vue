<template>
  <pa-switch v-model="loaded" class="block ml-32 mb-32" />
  <pa-skeleton avatar title row="3" animate :loading="!loaded">
    <pa-image :src="src" width="64" height="64" round />
    <view class="ml-32">
      <view>这是标题</view>
      <text class="text-28 text-black-2">
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
      </text>
    </view>
  </pa-skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import src from '../../../images/demo.jpeg'

const loaded = ref(false)
</script>
