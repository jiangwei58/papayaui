<template>
  <pa-slider v-model="value" :step="5" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(20)
</script>

<style lang="scss" scoped></style>
