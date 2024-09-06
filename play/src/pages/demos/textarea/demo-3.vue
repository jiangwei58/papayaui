<template>
  <pa-textarea v-model="text" auto-height />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>
