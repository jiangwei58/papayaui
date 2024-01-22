<template>
  <pa-slider v-model="value" active-color="red" inactive-color="#ccc" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(20)
</script>

<style lang="scss" scoped></style>
