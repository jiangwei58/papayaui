<template>
  <pa-sidebar v-model="active" @change="onChange">
    <pa-sidebar-item title="标签名" />
    <pa-sidebar-item title="标签名" />
    <pa-sidebar-item title="标签名" />
  </pa-sidebar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { SidebarValue } from 'papayaui'

const active = ref(0)

const onChange = (value: SidebarValue) => {
  uni.showToast({
    icon: 'none',
    title: `你切换的值是 ${value}`,
  })
}
</script>
