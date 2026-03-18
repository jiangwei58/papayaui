<template>
  <view class="demo-wrap">
    <view class="demo-desc">
      <text>步骤不指定 target 时，气泡会居中显示，适合用于介绍整体功能或欢迎语等场景。</text>
    </view>

    <view class="demo-start">
      <pa-button type="primary" @tap="startTour">无目标居中引导</pa-button>
    </view>

    <!-- Tour 组件：无目标元素，气泡居中显示 -->
    <pa-tour
      v-model:show="tourShow"
      v-model:current="tourCurrent"
      :steps="steps"
      :mask-color="maskColor"
      @finish="onFinish"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TourStep } from 'papayaui'

const tourShow = ref(false)
const tourCurrent = ref(0)
const maskColor = 'rgba(0, 0, 0, 0.6)'

/** 无目标居中气泡步骤 */
const steps: TourStep[] = [
  {
    title: '🎉 欢迎使用 PapayaUI',
    content: 'PapayaUI 是一款专为 UniApp 打造的高质量移动端组件库，助力快速构建精美界面。',
  },
  {
    title: '📦 丰富的组件',
    content: '内置 60+ 常用业务组件，覆盖表单、反馈、展示、导航等各种场景，开箱即用。',
  },
  {
    title: '🎨 灵活的主题',
    content: '支持通过 CSS 变量自定义主题色和设计 Token，轻松实现品牌定制化。',
  },
  {
    title: '🚀 开始使用',
    content: '文档详尽，示例丰富。立即前往官网查看完整文档，开始你的高效开发之旅！',
  },
]

const startTour = () => {
  tourCurrent.value = 0
  tourShow.value = true
}

const onFinish = () => {
  uni.showToast({ title: '了解完毕，开始使用吧！', icon: 'success' })
}
</script>

<style lang="scss" scoped>
.demo-wrap {
  padding: 16px;
}

.demo-desc {
  margin-bottom: 16px;
  padding: 12px;
  background: #f7f8fa;
  border-radius: 8px;
  font-size: 13px;
  color: #646566;
  line-height: 20px;
}

.demo-start {
  margin-top: 8px;
}
</style>
