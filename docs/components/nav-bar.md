# NavBar

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法" />
  <pa-nav-bar title="页面标题" :safe-area-inset-top="false" />

  <DocDemoBlock title="自定义" />
  <pa-nav-bar :safe-area-inset-top="false">
    <view class="flex items-center justify-center height-full">
      <text>页面标题</text>
      <pa-button class="m-0" width="120" height="54" block>按钮</pa-button>
    </view>
  </pa-nav-bar>

  <DocDemoBlock title="左侧图标" />
  <pa-nav-bar title="页面标题" left-menu="left" :safe-area-inset-top="false" @menu-click="onBack" />

  <DocDemoBlock title="胶囊菜单" />
  <pa-nav-bar
    title="页面标题"
    :left-menu="['left', 'home']"
    :safe-area-inset-top="false"
    @menu-click="onMenuClick"
  />

  <DocDemoBlock title="黑色主题" />
  <pa-nav-bar
    title="页面标题"
    bg-color="#000"
    theme="white"
    :left-menu="['left', 'search']"
    :safe-area-inset-top="false"
    @menu-click="onMenuClick"
  />
</template>
```
```ts [script]
<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const onBack = () => {
  uni.navigateBack()
}

const onMenuClick = (index: number) => {
  uni.showToast({
    icon: 'none',
    title: `点击第${index}个`,
  })
}
</script>
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

