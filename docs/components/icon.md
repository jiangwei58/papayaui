# Icon

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
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
  </DocDemoBlock>

  <DocDemoBlock title="颜色大小" card>
    <pa-icon name="success" size="100" />
    <pa-icon name="success" size="50" color="green" />
    <!-- 样式形式，方便继承父级样式 -->
    <pa-icon name="success" style="font-size: 50px; color: red" />
  </DocDemoBlock>
  <pa-safe-bottom />
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import iconsJSON from '../../fonts/iconfont.json'

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
</script>
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

