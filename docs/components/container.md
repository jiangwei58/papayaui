# Container

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <pa-container ref="containerRef">
    <template #header>
      <pa-search placeholder="这是固定头部，通常放置搜索栏、下拉菜单等" />
    </template>

    <view class="px-25">
      <view
        v-for="index in 10"
        :key="index"
        class="p-15 text-28 text-black-2 border mt-20"
        style="height: 100px"
      >
        放置页面内容，已自动处理固定头部和底部的填充
      </view>
    </view>

    <template #bottom>
      <view v-if="showBottom" class="px-26 py-12">
        <pa-button type="primary" block @click="updateHeight">
          这是固定底部，通常放置操作按钮
        </pa-button>
      </view>
    </template>
  </pa-container>
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import paContainer from './container.vue'

const containerRef = ref<InstanceType<typeof paContainer>>()
const showBottom = ref<boolean>(true)

const updateHeight = () => {
  showBottom.value = !showBottom.value
  // 如果固定头部或底部有动态内容会影响高度的，可以使用updateHeight方法重新刷新高度，防止多余填充留白
  containerRef.value?.updateHeight()
}
</script>
```

<!--codes end-->

## Container Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| safeBottom | 是否填充底部安全区 | boolean |  true |
| headerBgColor | 头部背景色 | string |  'transparent' |
| bgColor | 背景色 | string |  'transparent' |
| showFixedBottom | 是否显示固定底部 | boolean |  true |
| showWatermark | 是否显示水印 | boolean | - |
| watermarkContents | 水印内容 |  | - |
| partialContent | 是否局部内容布局，默认内容在页面，使用页面滚动；如需内容区只占中间部分设为true | boolean | - |

<!--props end-->

## Container Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Container Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| header | - |
| default | - |
| bottom | - |

<!--slot end-->

