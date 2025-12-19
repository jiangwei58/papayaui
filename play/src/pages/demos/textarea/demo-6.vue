<template>
  <pa-textarea v-model="text" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>
