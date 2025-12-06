<template>
  <pa-switch v-model="checked" active-value="开" inactive-value="关" />
  <text class="ml-40">{{ checked }}</text>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref<string>('开')
</script>

<style lang="scss" scoped></style>
