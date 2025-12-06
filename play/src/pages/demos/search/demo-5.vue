<template>
  <pa-search v-model="text" input-align="center" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref<string>('')
</script>
