<template>
  <pa-search v-model="text" background="var(--pa-color-primary)" input-background="#fff" />
</template>

<script lang="ts" setup>
/**
 * @tips 更推荐使用 CSS 变量的方式来修改样式
 */
import { ref } from 'vue'

const text = ref<string>('')
</script>
