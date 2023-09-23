<template>
  <pa-sidebar v-model="active">
    <pa-sidebar-item title="标签名" dot />
    <pa-sidebar-item title="标签名" badge="9" />
    <pa-sidebar-item title="标签名" badge="99+" />
  </pa-sidebar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
