<template>
  <pa-slider v-model="value" range />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([20, 50])
</script>

<style lang="scss" scoped></style>
