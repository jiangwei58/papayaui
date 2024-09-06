<template>
  <pa-input-number v-model="value" min="0" step="0.2" :decimal-length="2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
