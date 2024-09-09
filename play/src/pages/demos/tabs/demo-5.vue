<template>
  <pa-tabs v-model="tabActive" @change="onChange">
    <pa-tab-pane title="标签1">内容1</pa-tab-pane>
    <pa-tab-pane title="标签2">内容2</pa-tab-pane>
  </pa-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabItem } from 'papayaui'

const tabActive = ref<number>(0)

const onChange = (item: TabItem) => {
  // 如果是使用tabs传入的方式，item为tabs里对应选中的对象
  uni.showToast({
    title: item.title,
    icon: 'none',
  })
}
</script>
