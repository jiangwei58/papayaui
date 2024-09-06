<template>
  <pa-nav-bar title="页面标题" left-menu="left" :safe-area-inset-top="false" @menu-click="onBack" />
</template>

<script lang="ts" setup>
const onBack = () => {
  uni.navigateBack()
}
</script>
