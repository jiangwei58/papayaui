# Popover

<!--codes start-->

## 基础用法

```html [template]

<pa-popover :actions="actions">
  <template #reference>
    <pa-button>浅色风格</pa-button>
  </template>
</pa-popover>

<pa-popover theme="dark" :actions="actions">
  <template #reference>
    <pa-button class="ml-30">深色风格</pa-button>
  </template>
</pa-popover>

```
```ts [script]

import { ref } from 'vue'

const actions = ref([{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }])

```
## 选项配置

```html [template]

<pa-popover :actions="actions1">
  <template #reference>
    <pa-button>展示图标</pa-button>
  </template>
</pa-popover>

<pa-popover theme="dark" :actions="actions2">
  <template #reference>
    <pa-button class="ml-30">禁用选项</pa-button>
  </template>
</pa-popover>

```
```ts [script]

import { ref } from 'vue'

const actions1 = ref([
  { text: '选项一', icon: 'plus' },
  { text: '选项二', icon: 'scan' },
  { text: '选项三', icon: 'refresh' },
])

const actions2 = ref([{ text: '选项一', disabled: true }, { text: '选项二' }, { text: '选项三' }])

```
## 自定义内容

```html [template]

<pa-popover>
  <template #reference>
    <pa-button>基础用法</pa-button>
  </template>
  <view class="p-20" style="width: 150px">
    <text class="text-32">标题</text>
    <text class="text-28 block">这是一段内容,这是一段内容,这是一段内容,这是一段内容。</text>
  </view>
</pa-popover>

```

<!--codes end-->

## Popover Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| text | 内容 | string |  '' |
| width | 浮窗宽度 | string \| number |  '300' |
| zIndex | 浮窗层级 | number |  9 |

<!--props end-->

## Popover Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Popover Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |
| popover-content | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-popover-radius | 8px |
| --pa-popover-action-height | 44px |
| --pa-popover-action-padding | 16px |
| --pa-popover-action-width | 128px |
| --pa-popover-arrow-size | 6px |
| --pa-popover-dark-background | #4c4c4c |
| --pa-popover-light-background | #fff |
| --pa-popover-action-font-size | 14px |
| --pa-popover-action-icon-size | 20px |
| --pa-popover-action-line-height | 20px |
| --pa-popover-dark-text-color | #fff |
| --pa-popover-light-text-color | #4c4c4c |

<!--cssVar end-->

