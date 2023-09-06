# Popup

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-cell-group inset>
      <pa-cell title="顶部弹出" is-link @click="onOpen('top')" />
      <pa-cell title="底部弹出" is-link @click="onOpen('bottom')" />
      <pa-cell title="左侧弹出" is-link @click="onOpen('left')" />
      <pa-cell title="右侧弹出" is-link @click="onOpen('right')" />
      <pa-cell title="中间弹出" is-link @click="onOpen('center')" />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="关闭按钮">
    <pa-cell-group inset>
      <pa-cell title="关闭按钮" is-link @click="onOpen('bottom', true)" />
    </pa-cell-group>
  </DocDemoBlock>

  <DocDemoBlock title="圆角弹窗">
    <pa-cell-group inset>
      <pa-cell title="圆角弹窗" is-link @click="onOpen('bottom', true, true)" />
    </pa-cell-group>
  </DocDemoBlock>

  <pa-popup v-model:show="visible" :position="position" :closeable="closeable" :round="round">
    <view style="width: 200px; height: 200px"></view>
  </pa-popup>
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { PopupPosition } from './props'

const visible = ref<boolean>(false)
const position = ref<PopupPosition>('bottom')
const closeable = ref<boolean>(false)
const round = ref<boolean>(false)

const onOpen = (_position: PopupPosition, _closeable = false, _round = false) => {
  position.value = _position
  closeable.value = _closeable
  round.value = _round
  visible.value = true
}
</script>
```

<!--codes end-->

## Popup Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| show | 是否显示 | boolean |  false |
| zIndex | z-index层级 | number |  999 |
| position | 弹出方式 | PopupPosition |  'bottom' |
| overlay | 是否显示遮罩 | boolean |  true |
| closeOnClickOverlay | 点击遮罩是否关闭弹窗 | boolean |  true |
| width | 弹出宽度 | string | - |
| height | 弹窗高度 | string | - |
| bgColor | 背景色 | CSSProperties['background-color'] | - |
| round | 是否圆角 | boolean \| string | - |
| closeable | 是否显示关闭按钮 | boolean | - |
| safeAreaInsetBottom | 是否适配底部安全区 | boolean |  true |
| safeAreaInsetTop | 是否留出顶部安全距离（状态栏高度） | boolean | - |
| customClass | 自定义样式类 | string | - |
| customStyle | 自定义弹出层样式 | CSSProperties | - |
| contentClass | 内容自定义样式类 | string | - |
| overlayStyle | 自定义遮罩层样式 | CSSProperties | - |

<!--props end-->

## Popup Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:show | (value: PopupProps['show'])  |
| open | ()  |
| opened | ()  |
| close | ()  |
| closed | ()  |
| clickOverlay | ()  |

<!--event end-->

## Popup Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

