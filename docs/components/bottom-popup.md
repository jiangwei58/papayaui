# BottomPopup

<!--codes start-->

## 基础用法

```html [template]

<pa-cell-group inset>
  <pa-cell title="基础用法" is-link @click="visible = true" />
</pa-cell-group>

<pa-bottom-popup v-model:show="visible" title="标题">
  <view class="px-20">{{ text }}</view>
</pa-bottom-popup>

```
```ts [script]

import { computed, ref } from 'vue'

const visible = ref<boolean>(false)

const text = computed(() => {
  return new Array(100)
    .fill(0)
    .map(() => '内容')
    .join('')
})

```
## 自定义底部

```html [template]

<pa-cell-group inset>
  <pa-cell title="自定义底部" is-link @click="visible = true" />
</pa-cell-group>

<pa-bottom-popup v-model:show="visible" title="标题">
  <view class="px-20">{{ text }}</view>
  <template #footer>
    <view class="flex justify-around px-26">
      <pa-button type="default" block style="width: 50%">取消</pa-button>
      <pa-button class="ml-15" block style="width: 50%">确定</pa-button>
    </view>
  </template>
</pa-bottom-popup>

```
```ts [script]

import { computed, ref } from 'vue'

const visible = ref<boolean>(false)

const text = computed(() => {
  return new Array(100)
    .fill(0)
    .map(() => '内容')
    .join('')
})

```

<!--codes end-->

## BottomPopup Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| show | 是否显示 | boolean |  false |
| zIndex | z-index层级 | number |  999 |
| overlay | 是否显示遮罩 | boolean |  true |
| bgColor | 背景色 | CSSProperties['background-color'] | - |
| safeAreaInsetBottom | 是否适配底部安全区 | boolean |  true |
| title | 标题 | string | - |
| height | 弹窗高度 | string |  '80vh' |
| round | 是否圆角 | (boolean \| string)[] |  true |
| closeable | 是否显示关闭按钮 | boolean |  true |
| closeOnClickOverlay | 点击遮罩是否关闭弹窗 | boolean |  true |
| duration | 动画的执行时间，单位ms | string \| number |  300 |

<!--props end-->

## BottomPopup Event

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

## BottomPopup Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| before-title | - |
| after-title | - |
| default | - |
| footer | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

:see_no_evil:

<!--cssVar end-->

