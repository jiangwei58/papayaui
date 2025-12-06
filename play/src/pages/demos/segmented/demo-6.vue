<template>
  <pa-segmented v-model="value" :options="options" />
  <view style="margin-top: 16px">当前值: {{ value }}</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('apple')
const options = ['apple', 'orange', 'banana']
</script>

<style lang="scss" scoped></style>
