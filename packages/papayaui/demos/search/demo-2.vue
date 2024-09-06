<template>
  <pa-search v-model="text" shape="round" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref<string>('')
</script>
