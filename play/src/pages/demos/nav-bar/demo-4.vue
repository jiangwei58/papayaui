<template>
  <pa-nav-bar
    title="页面标题"
    :left-menu="['left', 'home']"
    :safe-area-inset-top="false"
    @menu-click="onMenuClick"
  />
</template>

<script lang="ts" setup>
const onMenuClick = (index: number) => {
  uni.showToast({
    icon: 'none',
    title: `点击第${index}个`,
  })
}
</script>
