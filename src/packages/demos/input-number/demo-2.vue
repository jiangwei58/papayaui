<template>
  <pa-input-number v-model="value" step="2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
