# Icon

<!--codes start-->

## 基础用法

```html [template]

<pa-icon name="appreciate" />

```
## 颜色大小

```html [template]

<pa-icon name="success" size="100" />
<pa-icon name="success" size="50" color="green" />
<!-- 样式形式，方便继承父级样式 -->
<pa-icon name="success" style="font-size: 50px; color: red" />

```
## 全部图标

```html [template]

<view class="grid grid-cols-4">
  <view
    v-for="(name, index) in icons"
    :key="index"
    class="flex flex-col items-center justify-center"
    style="height: 100px"
    @tap="onCopy(name)"
  >
    <pa-icon :name="name" size="50" />
    <text class="text-24">{{ name }}</text>
  </view>
</view>

```
```ts [script]

import { ref } from 'vue'
import iconsJSON from 'papayaui/fonts/iconfont.json'

const icons = ref<string[]>(iconsJSON.glyphs.map((item) => item.font_class))

const onCopy = (name: string) => {
  uni.setClipboardData({
    data: `<pa-icon name="${name}" />`,
    success: function () {
      uni.showToast({
        icon: 'none',
        title: '复制成功',
      })
    },
  })
}

```

<!--codes end-->

## Icon Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 图标名称 | string | - |
| size | 图标大小 | string | - |
| color | 图标颜色 | CSSProperties['color'] | - |
| block | 是否块级元素 | boolean | - |
| customClass | 自定义类名 | string | - |
| customStyle | 自定义样式 | CSSProperties | - |
| classPrefix | 类名前缀 | string | - |

<!--props end-->

## Icon Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | (value: Event)  |

<!--event end-->

## Icon Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-icon-size | inherit |

<!--cssVar end-->

