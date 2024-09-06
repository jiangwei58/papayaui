<template>
  <pa-cell-group inset>
    <pa-cell title="空心样式">
      <pa-tag plain>标签</pa-tag>
    </pa-cell>
    <pa-cell title="圆角样式">
      <pa-tag round>标签</pa-tag>
    </pa-cell>
    <pa-cell title="标记样式">
      <pa-tag mark>标签</pa-tag>
    </pa-cell>
    <pa-cell title="可关闭标签">
      <pa-tag closeable @close="onClose">标签</pa-tag>
    </pa-cell>
  </pa-cell-group>
</template>

<script lang="ts" setup>
const onClose = () => {
  uni.showToast({
    title: '点击关闭',
    icon: 'none',
  })
}
</script>
