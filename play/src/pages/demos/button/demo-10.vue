<template>
  <pa-button type="primary" :sync-click="onClick">点击加载</pa-button>
</template>

<script setup lang="ts">
const onClick = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
</script>
