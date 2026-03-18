# Tour

<!--codes start-->

## 基础用法

```html [template]

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

```
```ts [script]

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

```
## 无目标居中气泡

```html [template]

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

```
```ts [script]

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

```
## 自定义配置

```html [template]

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

```
```ts [script]

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

```

<!--codes end-->

## Tour Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| show | 是否显示引导 | boolean |  false |
| steps | 引导步骤列表 | TourStep[] |  () => [] |
| current | 当前步骤索引，支持 v-model:current | number |  0 |
| maskClosable | 点击遮罩是否关闭引导 | boolean |  false |
| showClose | 是否显示关闭按钮 | boolean |  true |
| padding | 高亮区域内边距，单位 px | number |  8 |
| prevText | 上一步按钮文字 | string |  '上一步' |
| nextText | 下一步按钮文字 | string |  '下一步' |
| finishText | 完成按钮文字 | string |  '完成' |
| maskColor | 遮罩颜色 | string |  'rgba(0, 0, 0, 0.5)' |
| zIndex | z-index 层级 | number |  9999 |
| scope | 包含目标元素的组件实例，传入调用方的 getCurrentInstance()。
在微信小程序中，createSelectorQuery 的查询范围由组件实例决定，
必须传入实际持有目标元素的那个组件实例才能正确获取元素位置。 | ComponentInternalInstance |  null |

<!--props end-->

## Tour Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:show | : |
| update:current | : |
| change | : |
| close | : |
| finish | : |

<!--event end-->

## Tour Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

## 样式变量

<!--cssVar start-->

:see_no_evil:

<!--cssVar end-->

