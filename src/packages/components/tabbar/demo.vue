<template>
  <DocDemoBlock title="基础用法">
    <pa-tabbar v-model="value1" :fixed="false" :safe-area-inset-bottom="false">
      <pa-tabbar-item icon="home" text="首页"></pa-tabbar-item>
      <pa-tabbar-item icon="message" text="消息"></pa-tabbar-item>
      <pa-tabbar-item icon="cart" text="订单"></pa-tabbar-item>
      <pa-tabbar-item icon="setting" text="设置"></pa-tabbar-item>
    </pa-tabbar>
  </DocDemoBlock>

  <DocDemoBlock title="通过名称匹配">
    <pa-tabbar v-model="value2" :fixed="false" :safe-area-inset-bottom="false">
      <pa-tabbar-item icon="home" text="首页" name="home"></pa-tabbar-item>
      <pa-tabbar-item icon="message" text="消息" name="message"></pa-tabbar-item>
      <pa-tabbar-item icon="cart" text="订单" name="cart"></pa-tabbar-item>
      <pa-tabbar-item icon="setting" text="设置" name="setting"></pa-tabbar-item>
    </pa-tabbar>
  </DocDemoBlock>

  <DocDemoBlock title="徽标提示">
    <pa-tabbar v-model="value3" :fixed="false" :safe-area-inset-bottom="false">
      <pa-tabbar-item icon="home" text="首页"></pa-tabbar-item>
      <pa-tabbar-item icon="message" text="消息" dot></pa-tabbar-item>
      <pa-tabbar-item icon="cart" text="订单" info="5"></pa-tabbar-item>
      <pa-tabbar-item icon="setting" text="设置" info="99"></pa-tabbar-item>
    </pa-tabbar>
  </DocDemoBlock>

  <DocDemoBlock title="自定义图标">
    <!-- 图片如果自带留白，可以尺寸设置大一点，然后将和间距调小一点（如下示例），保证核心图标大小为22px左右视觉效果最佳 -->
    <pa-tabbar
      v-model="value4"
      :fixed="false"
      :safe-area-inset-bottom="false"
      style="--pa-tabbar-item-icon-margin-bottom: 1px"
    >
      <pa-tabbar-item text="首页" info="6">
        <template #icon="{ active }">
          <image
            v-if="active"
            src="../../images/menu_active.png"
            style="width: 25px; height: 25px"
          />
          <image v-else src="../../images/menu_normal.png" style="width: 25px; height: 25px" />
        </template>
      </pa-tabbar-item>
      <pa-tabbar-item text="订单">
        <template #icon="{ active }">
          <image
            v-if="active"
            src="../../images/cart_active.png"
            style="width: 25px; height: 25px"
          />
          <image v-else src="../../images/cart_normal.png" style="width: 25px; height: 25px" />
        </template>
      </pa-tabbar-item>
      <pa-tabbar-item text="消息">
        <template #icon="{ active }">
          <image
            v-if="active"
            src="../../images/sale_active.png"
            style="width: 25px; height: 25px"
          />
          <image v-else src="../../images/sale_normal.png" style="width: 25px; height: 25px" />
        </template>
      </pa-tabbar-item>
      <pa-tabbar-item text="我的">
        <template #icon="{ active }">
          <image
            v-if="active"
            src="../../images/user_active.png"
            style="width: 25px; height: 25px"
          />
          <image v-else src="../../images/user_normal.png" style="width: 25px; height: 25px" />
        </template>
      </pa-tabbar-item>
    </pa-tabbar>
  </DocDemoBlock>

  <DocDemoBlock title="自定义颜色">
    <pa-tabbar
      v-model="value5"
      :fixed="false"
      :safe-area-inset-bottom="false"
      active-color="var(--pa-color-danger)"
      inactive-color="#000"
    >
      <pa-tabbar-item icon="home" text="首页"></pa-tabbar-item>
      <pa-tabbar-item icon="message" text="消息"></pa-tabbar-item>
      <pa-tabbar-item icon="cart" text="订单"></pa-tabbar-item>
      <pa-tabbar-item icon="setting" text="设置"></pa-tabbar-item>
    </pa-tabbar>
  </DocDemoBlock>

  <DocDemoBlock title="监听事件">
    <pa-tabbar v-model="value6" :fixed="false" :safe-area-inset-bottom="false" @change="onChange">
      <pa-tabbar-item icon="home" text="首页"></pa-tabbar-item>
      <pa-tabbar-item icon="message" text="消息"></pa-tabbar-item>
      <pa-tabbar-item icon="cart" text="订单"></pa-tabbar-item>
      <pa-tabbar-item icon="setting" text="设置"></pa-tabbar-item>
    </pa-tabbar>
  </DocDemoBlock>

  <DocDemoBlock title="固定在底部">
    <view style="height: 300px"></view>
    <pa-tabbar v-model="value7" placeholder>
      <pa-tabbar-item icon="home" text="首页"></pa-tabbar-item>
      <pa-tabbar-item icon="message" text="消息"></pa-tabbar-item>
      <pa-tabbar-item icon="cart" text="订单"></pa-tabbar-item>
      <pa-tabbar-item icon="setting" text="设置"></pa-tabbar-item>
    </pa-tabbar>
  </DocDemoBlock>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const value1 = ref(0)
const value2 = ref('home')
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)
const value6 = ref(0)
const value7 = ref(0)

const onChange = (name: string | number) => {
  uni.showToast({
    title: `切换到第${name}个标签`,
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped></style>
