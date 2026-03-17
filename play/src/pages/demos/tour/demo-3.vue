<template>
  <view class="demo-wrap">
    <view class="demo-desc">
      <text>配置 mask-closable 允许点击遮罩关闭，隐藏关闭按钮，并自定义按钮文字。</text>
    </view>

    <!-- 目标元素 -->
    <view class="demo-section">
      <view class="demo-item tour-custom-a">
        <text class="demo-item__icon">🔔</text>
        <text class="demo-item__text">消息通知</text>
      </view>
      <view class="demo-item tour-custom-b">
        <text class="demo-item__icon">🛡️</text>
        <text class="demo-item__text">隐私保护</text>
      </view>
      <view class="demo-item tour-custom-c">
        <text class="demo-item__icon">🌙</text>
        <text class="demo-item__text">深色模式</text>
      </view>
    </view>

    <view class="demo-start">
      <pa-button type="primary" @tap="startTour">自定义配置引导</pa-button>
    </view>

    <!-- Tour：点击遮罩可关闭，隐藏关闭按钮，自定义文字 -->
    <pa-tour
      v-model:show="tourShow"
      v-model:current="tourCurrent"
      :steps="steps"
      :scope="instance"
      :show-close="false"
      :mask-closable="true"
      prev-text="← 返回"
      next-text="继续 →"
      finish-text="知道了"
      @finish="onFinish"
      @close="onClose"
    />
  </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
import type { TourStep } from 'papayaui'

const instance = getCurrentInstance()
const tourShow = ref(false)
const tourCurrent = ref(0)

const steps: TourStep[] = [
  {
    target: '.tour-custom-a',
    title: '消息通知',
    content: '你可以在这里设置哪些类型的消息需要推送，避免打扰。',
    placement: 'bottom',
  },
  {
    target: '.tour-custom-b',
    title: '隐私保护',
    content: '查看和管理应用对你个人数据的访问权限，随时可撤销授权。',
    placement: 'bottom',
  },
  {
    target: '.tour-custom-c',
    title: '深色模式',
    content: '开启深色模式，保护眼睛，节省电量，夜间使用更舒适。',
    placement: 'top',
  },
]

const startTour = () => {
  tourCurrent.value = 0
  tourShow.value = true
}

const onFinish = () => {
  uni.showToast({ title: '设置引导完成', icon: 'success' })
}

const onClose = () => {
  uni.showToast({ title: '点击遮罩关闭', icon: 'none' })
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

.demo-section {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.demo-item {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #f2f3f5;

  &:last-child {
    border-bottom: none;
  }

  &__icon {
    font-size: 18px;
    margin-right: 12px;
  }

  &__text {
    font-size: 15px;
    color: #323233;
  }
}
</style>
