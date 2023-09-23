<template>
  <pa-input-number v-model="value" :controls="false" input-width="92px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
