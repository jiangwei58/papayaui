<template>
  <pa-slider v-model="value" :min="-10" :max="10" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(-4)
</script>

<style lang="scss" scoped></style>
