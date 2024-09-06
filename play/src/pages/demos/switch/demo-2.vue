<template>
  <pa-switch v-model="checked" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref<boolean>(true)
</script>

<style lang="scss" scoped></style>
