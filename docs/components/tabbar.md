# Tabbar

<!--codes start-->

## 基础用法

```html [template]

<pa-tabbar v-model="active" :fixed="false" :safe-area-inset-bottom="false">
  <pa-tabbar-item icon="home" text="首页"></pa-tabbar-item>
  <pa-tabbar-item icon="message" text="消息"></pa-tabbar-item>
  <pa-tabbar-item icon="cart" text="订单"></pa-tabbar-item>
  <pa-tabbar-item icon="setting" text="设置"></pa-tabbar-item>
</pa-tabbar>

```
```ts [script]

import { ref } from 'vue'

const active = ref(0)

```
## 通过名称匹配

```html [template]

<pa-tabbar v-model="active" :fixed="false" :safe-area-inset-bottom="false">
  <pa-tabbar-item icon="home" text="首页" name="home"></pa-tabbar-item>
  <pa-tabbar-item icon="message" text="消息" name="message"></pa-tabbar-item>
  <pa-tabbar-item icon="cart" text="订单" name="cart"></pa-tabbar-item>
  <pa-tabbar-item icon="setting" text="设置" name="setting"></pa-tabbar-item>
</pa-tabbar>

```
```ts [script]

import { ref } from 'vue'

const active = ref('home')

```
## 徽标提示

```html [template]

<pa-tabbar v-model="active" :fixed="false" :safe-area-inset-bottom="false">
  <pa-tabbar-item icon="home" text="首页"></pa-tabbar-item>
  <pa-tabbar-item icon="message" text="消息" dot></pa-tabbar-item>
  <pa-tabbar-item icon="cart" text="订单" info="5"></pa-tabbar-item>
  <pa-tabbar-item icon="setting" text="设置" info="99"></pa-tabbar-item>
</pa-tabbar>

```
```ts [script]

import { ref } from 'vue'

const active = ref(0)

```
## 自定义图标

```html [template]

<!-- 图片如果自带留白，可以尺寸设置大一点，然后将和间距调小一点（如下示例），保证核心图标大小为22px左右视觉效果最佳 -->
<pa-tabbar
  v-model="tabbarActive"
  :fixed="false"
  :safe-area-inset-bottom="false"
  style="--pa-tabbar-item-icon-margin-bottom: 1px"
>
  <pa-tabbar-item text="首页" info="6">
    <template #icon="{ active }">
      <image
        v-if="active"
        src="../../../images/menu_active.png"
        style="width: 25px; height: 25px"
      />
      <image v-else src="../../../images/menu_normal.png" style="width: 25px; height: 25px" />
    </template>
  </pa-tabbar-item>
  <pa-tabbar-item text="订单">
    <template #icon="{ active }">
      <image
        v-if="active"
        src="../../../images/cart_active.png"
        style="width: 25px; height: 25px"
      />
      <image v-else src="../../../images/cart_normal.png" style="width: 25px; height: 25px" />
    </template>
  </pa-tabbar-item>
  <pa-tabbar-item text="消息">
    <template #icon="{ active }">
      <image
        v-if="active"
        src="../../../images/sale_active.png"
        style="width: 25px; height: 25px"
      />
      <image v-else src="../../../images/sale_normal.png" style="width: 25px; height: 25px" />
    </template>
  </pa-tabbar-item>
  <pa-tabbar-item text="我的">
    <template #icon="{ active }">
      <image
        v-if="active"
        src="../../../images/user_active.png"
        style="width: 25px; height: 25px"
      />
      <image v-else src="../../../images/user_normal.png" style="width: 25px; height: 25px" />
    </template>
  </pa-tabbar-item>
</pa-tabbar>

```
```ts [script]

import { ref } from 'vue'

const tabbarActive = ref(0)

```
## 自定义颜色

```html [template]

<pa-tabbar
  v-model="active"
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

```
```ts [script]

import { ref } from 'vue'

const active = ref(0)

```
## 监听事件

```html [template]

<pa-tabbar v-model="active" :fixed="false" :safe-area-inset-bottom="false" @change="onChange">
  <pa-tabbar-item icon="home" text="首页"></pa-tabbar-item>
  <pa-tabbar-item icon="message" text="消息"></pa-tabbar-item>
  <pa-tabbar-item icon="cart" text="订单"></pa-tabbar-item>
  <pa-tabbar-item icon="setting" text="设置"></pa-tabbar-item>
</pa-tabbar>

```
```ts [script]

import { ref } from 'vue'

const active = ref(0)

const onChange = (name: string | number) => {
  uni.showToast({
    title: `切换到第${name}个标签`,
    icon: 'none',
  })
}

```
## 固定在底部

```html [template]

<view style="height: 300px"></view>
<pa-tabbar v-model="active" placeholder>
  <pa-tabbar-item icon="home" text="首页"></pa-tabbar-item>
  <pa-tabbar-item icon="message" text="消息"></pa-tabbar-item>
  <pa-tabbar-item icon="cart" text="订单"></pa-tabbar-item>
  <pa-tabbar-item icon="setting" text="设置"></pa-tabbar-item>
</pa-tabbar>

```
```ts [script]

import { ref } from 'vue'

const active = ref(0)

```

<!--codes end-->

## Tabbar Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 当前选中标签的索引 | string \| number | - |
| fixed | 是否固定在底部 | boolean |  true |
| placeholder | 固定在底部时，是否在标签位置生成一个等高的占位元素 | boolean | - |
| border | 是否展示外边框 | boolean |  true |
| zIndex | 元素层级z-index | number |  1 |
| activeColor | 选中标签的颜色 | string | - |
| inactiveColor | 未选中标签的颜色 | string | - |
| safeAreaInsetBottom | 是否为 iPhoneX 留出底部安全距离 | boolean |  true |

## TabbarItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 标签名称，作为匹配的标识符 | string \| number | - |
| text | 标签标题 | string | - |
| icon | 图标名称，可选值见 Icon 组件 | string | - |
| iconPrefix | 图标类名前缀，同 Icon 组件的 class-prefix 属性 | string | - |
| dot | 是否显示小红点 | boolean | - |
| info | 图标右上角提示信息 | string | - |
| url | 点击后跳转的链接地址, 需要以 / 开头 | string | - |
| linkType | 链接跳转类型，可选值为 redirectTo、switchTab、reLaunch | 'redirectTo'\|'switchTab'\|'reLaunch' |  'switchTab' |

<!--props end-->

## Tabbar Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (name: string \| number)  |
| change | (name: string \| number)  |

## TabbarItem Event

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Tabbar Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

## TabbarItem Slot

| 名称 | 说明 |
| --- | --- |
| icon" :active="isActive | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-tabbar-height | 48px |
| --pa-tabbar-background-color | #fff |

<!--cssVar end-->

