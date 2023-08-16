# Tabbar

## 示例

<!--codes start-->

::: code-group

```html [template]
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
    <pa-tabbar v-model="value4" :fixed="false" :safe-area-inset-bottom="false">
      <pa-tabbar-item text="首页">
        <template #icon="{ active }">
          <img v-if="active" src="../../images/demo.jpeg" style="width: 22px; height: 22px" />
          <img v-else src="../../images/demo2.jpeg" style="width: 22px; height: 22px" />
        </template>
      </pa-tabbar-item>
      <pa-tabbar-item icon="message" text="消息" dot></pa-tabbar-item>
      <pa-tabbar-item icon="cart" text="订单" info="5"></pa-tabbar-item>
      <pa-tabbar-item icon="setting" text="设置" info="99"></pa-tabbar-item>
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
      <pa-tabbar-item icon="message" text="消息" dot></pa-tabbar-item>
      <pa-tabbar-item icon="cart" text="订单" info="5"></pa-tabbar-item>
      <pa-tabbar-item icon="setting" text="设置" info="99"></pa-tabbar-item>
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
```
```ts [script]
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
| icon | 图标名称，可选值见 Icon 组件 |  | - |
| iconPrefix | 图标类名前缀，同 Icon 组件的 class-prefix 属性 |  | - |
| dot | 是否显示小红点 |  | - |
| info | 图标右上角提示信息 |  | - |
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

