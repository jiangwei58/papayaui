<template>
  <pa-slider v-model="value" show-range />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(25)
</script>

<style lang="scss" scoped></style>
