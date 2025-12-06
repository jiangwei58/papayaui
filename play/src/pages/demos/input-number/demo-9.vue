<template>
  <pa-input-number v-model="value" :controls="false" input-width="92px" select-all-on-focus />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(999)
</script>
