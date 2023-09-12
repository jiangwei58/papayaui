<template>
  <pa-cell-group inset>
    <pa-cell title="基础用法" is-link @click="visible = true" />
  </pa-cell-group>

  <pa-bottom-popup v-model:show="visible" title="标题">
    <view class="px-20">{{ text }}</view>
  </pa-bottom-popup>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const visible = ref<boolean>(false)

const text = computed(() => {
  return new Array(100)
    .fill(0)
    .map(() => '内容')
    .join('')
})
</script>
