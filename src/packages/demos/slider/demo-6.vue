<template>
  <pa-slider v-model="value" show-tag />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(29)
</script>

<style lang="scss" scoped></style>
