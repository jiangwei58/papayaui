<template>
  <pa-search v-model="text" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref<string>('')
</script>
