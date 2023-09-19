# Menu

<!--codes start-->

## 基础用法

```html [template]

<pa-menu>
  <pa-menu-item v-model="state.value1" :options="state.option1"></pa-menu-item>
  <pa-menu-item v-model="state.value2" :options="state.option2"></pa-menu-item>
</pa-menu>

```
```ts [script]

import { reactive } from 'vue'

const state = reactive({
  option1: [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
  ],
  option2: [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' },
  ],
  value1: 0,
  value2: 'a',
})

```
## 自定义菜单内容

```html [template]

<pa-menu>
  <pa-menu-item v-model="state.value1" :options="state.option1"></pa-menu-item>
  <pa-menu-item title="筛选">
    <pa-cell title="包邮">
      <pa-switch size="18px" />
    </pa-cell>
    <view class="px-16 py-10">
      <pa-button block round>确定</pa-button>
    </view>
  </pa-menu-item>
</pa-menu>

```
```ts [script]

import { reactive } from 'vue'

const state = reactive({
  option1: [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
  ],
  value1: 0,
})

```
## 自定义颜色

```html [template]

<pa-menu style="--pa-menu-active-color: red">
  <pa-menu-item v-model="state.value1" :options="state.option1"></pa-menu-item>
  <pa-menu-item v-model="state.value2" :options="state.option2"></pa-menu-item>
</pa-menu>

```
```ts [script]

import { reactive } from 'vue'

const state = reactive({
  option1: [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
  ],
  option2: [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' },
  ],
  value1: 0,
  value2: 'a',
})

```
## 向上展开

```html [template]

<pa-menu direction="up">
  <pa-menu-item v-model="state.value1" :options="state.option1"></pa-menu-item>
  <pa-menu-item v-model="state.value2" :options="state.option2"></pa-menu-item>
</pa-menu>

```
```ts [script]

import { reactive } from 'vue'

const state = reactive({
  option1: [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
  ],
  option2: [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' },
  ],
  value1: 0,
  value2: 'a',
})

```

<!--codes end-->

## Menu Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| direction | 菜单展开方向 | 'up'\|'down' |  'down' |
| zIndex | 菜单栏 z-index 层级 | number |  10 |
| duration | 动画时长，单位ms | (string \| number)[] |  200 |
| overlay | 是否显示遮罩 | boolean |  true |
| closeOnClickOverlay | 点击遮罩是否关闭弹窗 | boolean |  true |

## MenuItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| title | 菜单项标题 | string |  '' |
| modelValue | 当前选中项对应的 value | MenuItemOptionValue | - |
| options | 选项数组 | MenuItemOption[] |  () => [] |
| disabled | 是否禁用菜单 | boolean | - |
| titleClass | 标题额外类名 | string |  '' |

<!--props end-->

## Menu Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


## MenuItem Event

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: MenuItemOptionValue)  |
| change | (value: MenuItemOptionValue)  |

<!--event end-->

## Menu Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

## MenuItem Slot

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

