<template>
  <pa-tabs v-model="tabActive">
    <pa-tab-pane name="home" title="首页" title-slot="home-title">
      <view class="content">首页内容</view>
    </pa-tab-pane>
    
    <pa-tab-pane name="hot" title="热门" title-slot="hot-title">
      <view class="content">热门内容</view>
    </pa-tab-pane>
    
    <pa-tab-pane name="message" title="消息" title-slot="message-title">
      <view class="content">消息内容</view>
    </pa-tab-pane>
    
    <pa-tab-pane name="user" title="我的">
      <view class="content">个人中心</view>
    </pa-tab-pane>

    <template #home-title>
      <view class="custom-tab-title">
        <text class="tab-icon">🏠</text>
        <text>首页</text>
      </view>
    </template>
    
    <template #hot-title>
      <view class="custom-tab-title">
        <text>热门</text>
        <view class="red-dot"></view>
      </view>
    </template>
    
    <template #message-title>
      <view class="custom-tab-title">
        <text>消息</text>
        <view class="badge">
          <text class="badge-text">99+</text>
        </view>
      </view>
    </template>
  </pa-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tabActive = ref<string>('home')
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  color: #666;
}

.custom-tab-title {
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
}

.tab-icon {
  font-size: 16px;
}

.red-dot {
  width: 8px;
  height: 8px;
  background-color: #ff0000;
  border-radius: 50%;
  position: absolute;
  top: -2px;
  right: -8px;
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background-color: #ff0000;
  border-radius: 8px;
  margin-left: 4px;
}

.badge-text {
  color: #ffffff;
  font-size: 10px;
  line-height: 1;
  transform: scale(0.9);
}
</style>
