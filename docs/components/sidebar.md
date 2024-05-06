# Sidebar

<!--codes start-->

## 基础用法

```html [template]

<pa-sidebar v-model="active">
  <pa-sidebar-item v-for="item in 3" :key="item" :title="`标签名${item}`" />
</pa-sidebar>

```
```ts [script]

import { ref } from 'vue'

const active = ref(0)

```
## 徽标提示

```html [template]

<pa-sidebar v-model="active">
  <pa-sidebar-item title="标签名" dot />
  <pa-sidebar-item title="标签名" badge="9" />
  <pa-sidebar-item title="标签名" badge="99+" />
</pa-sidebar>

```
```ts [script]

import { ref } from 'vue'

const active = ref(0)

```
## 禁用选项

```html [template]

<pa-sidebar v-model="active">
  <pa-sidebar-item
    v-for="item in 3"
    :key="item"
    :title="`标签名${item}`"
    :disabled="item === 2"
  />
</pa-sidebar>

```
```ts [script]

import { ref } from 'vue'

const active = ref(0)

```
## 切换事件

```html [template]

<pa-sidebar v-model="active" @change="onChange">
  <pa-sidebar-item title="标签名" />
  <pa-sidebar-item title="标签名" />
  <pa-sidebar-item title="标签名" />
</pa-sidebar>

```
```ts [script]

import { ref } from 'vue'
import type { SidebarValue } from '../..'

const active = ref(0)

const onChange = (value: SidebarValue) => {
  uni.showToast({
    icon: 'none',
    title: `你切换的值是 ${value}`,
  })
}

```

<!--codes end-->

## Sidebar Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 选择项值 | SidebarValue | - |
| customClass | 根节点样式类 | string | - |
| customStyle | 根节点样式 | string\|CSSProperties | - |

## SidebarItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| title | 标题 | string | - |
| name | 当前项标识值 | SidebarValue | - |
| dot | 是否展示为小点 | boolean | - |
| badge | 图标右上角徽标的内容 | string | - |
| disabled | 是否禁用该项 | boolean | - |
| customClass | 根节点样式类 | string | - |
| customStyle | 根节点样式 | string\|CSSProperties | - |

<!--props end-->

## Sidebar Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: SidebarValue)  |
| change | (value: SidebarValue)  |

## SidebarItem Event

| 事件名 | 参数 |
| --- | --- |
| click | (value: SidebarValue)  |

<!--event end-->

## Sidebar Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

## SidebarItem Slot

| 名称 | 说明 |
| --- | --- |
| title | - |
| after | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-sidebar-width | 80px |

<!--cssVar end-->

