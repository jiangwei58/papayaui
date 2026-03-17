<template>
  <view class="demo-wrap">
    <!-- 示例功能区域，作为引导步骤的目标元素 -->
    <view class="demo-header tour-target-header">
      <text class="demo-header__title">个人中心</text>
    </view>

    <view class="demo-cards">
      <view class="demo-card tour-target-stats">
        <text class="demo-card__num">128</text>
        <text class="demo-card__label">收藏</text>
      </view>
      <view class="demo-card tour-target-orders">
        <text class="demo-card__num">6</text>
        <text class="demo-card__label">订单</text>
      </view>
      <view class="demo-card tour-target-coupons">
        <text class="demo-card__num">3</text>
        <text class="demo-card__label">优惠券</text>
      </view>
    </view>

    <view class="demo-action tour-target-settings">
      <text>⚙️ 设置</text>
    </view>

    <view class="demo-start">
      <pa-button type="primary" @tap="startTour">开始引导</pa-button>
    </view>

    <!-- Tour 组件：传入当前组件实例供小程序查询目标元素 -->
    <pa-tour
      v-model:show="tourShow"
      v-model:current="tourCurrent"
      :steps="steps"
      :scope="instance"
      @finish="onFinish"
      @close="onClose"
    />
  </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
import type { TourStep } from 'papayaui'

const tourShow = ref(false)
const tourCurrent = ref(0)

/** 引导步骤列表 */
const steps: TourStep[] = [
  {
    target: '.tour-target-header',
    title: '欢迎来到个人中心',
    content: '这里是你的个人主页，可以查看和管理个人信息。',
  },
  {
    target: '.tour-target-stats',
    title: '我的收藏',
    content: '点击这里查看你收藏的所有商品和内容。',
  },
  {
    target: '.tour-target-orders',
    title: '我的订单',
    content: '在这里查看所有历史订单状态和物流信息。',
  },
  {
    target: '.tour-target-coupons',
    title: '优惠券',
    content: '你有 3 张优惠券待使用，赶快去购物吧！',
  },
  {
    target: '.tour-target-settings',
    title: '个人设置',
    content: '在设置页面可以修改头像、昵称、绑定手机号等。',
    placement: 'top',
  },
]

const instance = getCurrentInstance()

const startTour = () => {
  tourCurrent.value = 0
  tourShow.value = true
}

const onFinish = () => {
  uni.showToast({ title: '引导完成！', icon: 'success' })
}

const onClose = () => {
  uni.showToast({ title: '已关闭引导', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.demo-wrap {
  padding: 0 0 32px;
}

.demo-header {
  padding: 24px 16px 16px;
  background: linear-gradient(135deg, #1989fa, #0056c7);

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
}

.demo-cards {
  display: flex;
  padding: 16px;
  gap: 12px;
}

.demo-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &__num {
    font-size: 20px;
    font-weight: 700;
    color: #323233;
  }

  &__label {
    margin-top: 4px;
    font-size: 12px;
    color: #969799;
  }
}

.demo-action {
  margin: 0 16px;
  padding: 14px 16px;
  background: #fff;
  border-radius: 10px;
  font-size: 14px;
  color: #323233;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.demo-start {
  margin: 24px 16px 0;
}
</style>
