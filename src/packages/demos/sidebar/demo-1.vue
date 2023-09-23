<template>
  <pa-sidebar v-model="active">
    <pa-sidebar-item v-for="item in 3" :key="item" :title="`标签名${item}`" />
  </pa-sidebar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
