# NavBar

<!--codes start-->

## 基础用法

```html [template]

<!-- 默认开启刘海处的填充，此为示例，为了美观，设置为关闭，实际开发通常无需设置 -->
<pa-nav-bar title="页面标题" :safe-area-inset-top="false" />

```
## 自定义

```html [template]

<pa-nav-bar :safe-area-inset-top="false">
  <view class="flex items-center justify-center height-full">
    <text>页面标题</text>
    <pa-button class="ml-15" size="small">按钮</pa-button>
  </view>
</pa-nav-bar>

```
## 左侧图标

```html [template]

<pa-nav-bar title="页面标题" left-menu="left" :safe-area-inset-top="false" @menu-click="onBack" />

```
```ts [script]

const onBack = () => {
  uni.navigateBack()
}

```
## 胶囊菜单

```html [template]

<pa-nav-bar
  title="页面标题"
  :left-menu="['left', 'home']"
  :safe-area-inset-top="false"
  @menu-click="onMenuClick"
/>

```
```ts [script]

const onMenuClick = (index: number) => {
  uni.showToast({
    icon: 'none',
    title: `点击第${index}个`,
  })
}

```
## 黑色主题

```html [template]

<pa-nav-bar
  title="页面标题"
  bg-color="#000"
  theme="white"
  :left-menu="['left', 'search']"
  :safe-area-inset-top="false"
  @menu-click="onMenuClick"
/>

```
```ts [script]

const onMenuClick = (index: number) => {
  uni.showToast({
    icon: 'none',
    title: `点击第${index}个`,
  })
}

```

<!--codes end-->

## NavBar Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| title | 标题 | string |  '标题' |
| bgColor | 背景色 | string |  '#fff' |
| theme | 主题样式 | 'black'\|'white' |  'black' |
| leftMenu | 左侧返回按钮或胶囊菜单 | string\|[string,string] | - |
| safeAreaInsetTop | 是否开启顶部安全区适配 | boolean |  true |

<!--props end-->

## NavBar Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| menuClick | (index: number)  |

<!--event end-->

## NavBar Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

