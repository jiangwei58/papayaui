# Overlay

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法" card>
    <pa-button @click="onShow(0)">显示遮罩层</pa-button>
  </DocDemoBlock>
  <DocDemoBlock title="嵌入内容" card>
    <pa-button @click="onShow(1)">嵌入内容</pa-button>
  </DocDemoBlock>
  <pa-overlay :show="showArray[0]" @click="onShow(0, false)" />
  <pa-overlay :show="showArray[1]" @click="onShow(1, false)">
    <view class="flex items-center justify-center height-full">
      <view style="width: 200px; height: 200px; background-color: #fff"></view>
    </view>
  </pa-overlay>
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

const showArray = ref<boolean[]>([false, false])

const onShow = (index: number, show = true) => {
  showArray.value[index] = show
}
</script>
```

<!--codes end-->

## Overlay Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| show | 是否展示遮罩层 | boolean | - |
| zIndex | z-index 层级 | number |  1 |
| duration | 动画时长，单位毫秒 |  | - |
| customClass | 自定义class | string | - |
| customStyle | 自定义style | CSSProperties | - |

<!--props end-->

## Overlay Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| click | ()  |

<!--event end-->

## Overlay Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

