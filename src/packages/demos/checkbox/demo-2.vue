<template>
  <pa-checkbox v-model="checkValue" indeterminate>复选框</pa-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkValue = ref(false)
</script>
