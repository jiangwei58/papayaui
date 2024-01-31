# SwipeCell

<!--codes start-->

## 基础用法

```html [template]

<pa-swipe-cell :options="options" @open="onOpen">
  <pa-cell title="单元格" value="内容" />
</pa-swipe-cell>

```
```ts [script]

import type { SwipeCellOption } from '../..'

const options: SwipeCellOption[] = [{ text: '删除' }]

const onOpen = () => {
  console.log('open')
}

```
## 自定义内容

```html [template]

<pa-swipe-cell :options="options">
  <view class="flex bg-white p-20">
    <pa-image src="" width="200" height="200" round="10" />
    <view class="flex-1 ml-15 text-28">
      <text class="text-black block">内容标题</text>
      <text class="text-black-3 block">描述信息</text>
      <view class="flex justify-between mt-80">
        <text class="text-price">2.00</text>
        <text class="text-black-3">x2</text>
      </view>
    </view>
  </view>
</pa-swipe-cell>

```
```ts [script]

import type { SwipeCellOption } from '../..'

const options: SwipeCellOption[] = [{ text: '删除' }]

```
## 多个按钮

```html [template]

<pa-swipe-cell name="name" :options="options" @click="onClick">
  <pa-cell title="单元格" value="内容" />
</pa-swipe-cell>

```
```ts [script]

import type { SwipeCellOption, SwipeCellProps } from '../..'

const options: SwipeCellOption[] = [
  {
    text: '收藏',
    style: { backgroundColor: 'var(--pa-color-primary)' },
    click: (name: SwipeCellProps['name']) => {
      console.log('当前点击的name:', name)
    },
  },
  { text: '删除' },
]

const onClick = (name: string | number, index: number, item: SwipeCellOption) => {
  uni.showToast({
    title: `点击了 ${item.text}`,
    icon: 'none',
  })
  console.log(name, index, item)
}

```
## 禁用

```html [template]

<pa-swipe-cell :options="options" disabled>
  <pa-cell title="单元格" value="内容" />
</pa-swipe-cell>

```
```ts [script]

import type { SwipeCellOption, SwipeCellProps } from '../..'

const options: SwipeCellOption[] = [
  {
    text: '收藏',
    style: { backgroundColor: 'var(--pa-color-primary)' },
    click: (name: SwipeCellProps['name']) => {
      console.log('当前点击的name:', name)
    },
  },
  { text: '删除' },
]

```
## 插槽

```html [template]

<pa-swipe-cell>
  <pa-cell title="单元格" value="内容" />
  <template #right>
    <view
      class="flex items-center justify-center"
      style="
        width: 100px;
        height: 100%;
        border-radius: 0 100px 100px 0;
        color: #fff;
        background: linear-gradient(315deg, rgb(73, 143, 242) 0%, rgb(73, 101, 242) 100%);
      "
    >
      自定义内容
    </view>
  </template>
</pa-swipe-cell>

```

<!--codes end-->

## SwipeCell Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 标识名 | string \| number |  '' |
| show | 控制打开或者关闭 | boolean |  false |
| disabled | 是否禁用 | boolean |  false |
| threshold | 滑动距离阈值，只有大于此值，才被认为是要打开菜单 | number |  20 |
| options | 右侧按钮内容 | SwipeCellOption[] |  () => [] |

<!--props end-->

## SwipeCell Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| open | ()  |
| close | ()  |
| click | (name: SwipeCellProps['name'], index: number, option: SwipeCellOption)  |

<!--event end-->

## SwipeCell Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |
| right | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

:see_no_evil:

<!--cssVar end-->

