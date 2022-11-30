<template>
  <DocDemoBlock title="基础用法" card>
    <view class="grid grid-cols-4">
      <view
        v-for="(name, index) in icons"
        :key="index"
        class="flex flex-col items-center justify-center"
        style="height: 100px"
        @tap="onCopy(name)"
      >
        <wei-icon :name="name" size="50" />
        <text class="text-24">{{ name }}</text>
      </view>
    </view>
  </DocDemoBlock>

  <DocDemoBlock title="颜色大小" card>
    <wei-icon name="success" size="100" />
    <wei-icon name="success" size="50" color="green" />
  </DocDemoBlock>
  <wei-safe-bottom />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import iconsJSON from '../../fonts/iconfont.json'

const icons = ref<string[]>(iconsJSON.glyphs.map((item) => item.font_class))

const onCopy = (name: string) => {
  uni.setClipboardData({
    data: `<wei-icon name="${name}" />`,
    success: function () {
      uni.showToast({
        icon: 'none',
        title: '复制成功',
      })
    },
  })
}
</script>

<style lang="scss" scoped></style>
