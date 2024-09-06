<template>
  <pa-input-number v-model="value" min="2" max="6" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
