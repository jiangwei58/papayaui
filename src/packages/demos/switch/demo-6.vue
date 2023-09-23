<template>
  <pa-switch v-model="checked" active-color="#ee0a24" inactive-color="#aaa" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref<boolean>(true)
</script>

<style lang="scss" scoped></style>
