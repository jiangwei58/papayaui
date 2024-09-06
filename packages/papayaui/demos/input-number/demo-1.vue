<template>
  <pa-input-number v-model="value" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
