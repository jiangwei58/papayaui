# Collapse

<!--codes start-->

## 基础用法

```html [template]

<pa-collapse v-model="collapseValue" @change="onChange" @open="onOpen" @close="onClose">
  <pa-collapse-item v-for="index in 3" :key="index" :title="`标题${index}`">
    折叠内容折叠内容折叠内容折叠内容
  </pa-collapse-item>
</pa-collapse>

```
```ts [script]

import { ref } from 'vue'
import type { CollapseItemValue } from 'papayaui'

const collapseValue = ref<number[]>([0])

const onChange = (value: CollapseItemValue | CollapseItemValue[]) => {
  console.log('change', value)
}

const onOpen = (value: CollapseItemValue) => {
  console.log('open', value)
}

const onClose = (value: CollapseItemValue) => {
  console.log('close', value)
}

```
## 手风琴

```html [template]

<pa-collapse accordion>
  <pa-collapse-item v-for="index in 3" :key="index" :title="`标题${index}`">
    折叠内容折叠内容折叠内容折叠内容
  </pa-collapse-item>
</pa-collapse>

```
## 禁用状态

```html [template]

<pa-collapse>
  <pa-collapse-item
    v-for="index in 3"
    :key="index"
    :title="`标题${index}`"
    :disabled="index !== 1"
  >
    折叠内容折叠内容折叠内容折叠内容
  </pa-collapse-item>
</pa-collapse>

```
## 自定义标题内容

```html [template]

<pa-collapse>
  <pa-collapse-item>
    <template #title>
      <span class="color-primary">标题1</span>
      <pa-icon name="question" color="var(--pa-color-danger)" />
    </template>
    折叠内容折叠内容折叠内容折叠内容
  </pa-collapse-item>
  <pa-collapse-item title="标题2" icon="setting" value="内容">
    折叠内容折叠内容折叠内容折叠内容
  </pa-collapse-item>
</pa-collapse>

```
## 嵌套使用

```html [template]

<pa-collapse v-model="collapseValue">
  <pa-collapse-item title="测试" :border="false">
    <pa-collapse v-model="collapseChildValue" :border="false">
      <pa-collapse-item title="嵌套测试" :border="false">
        嵌套内容，嵌套内容，嵌套内容
      </pa-collapse-item>
    </pa-collapse>
    <view>测试内容，测试内容，测试内容</view>
  </pa-collapse-item>
</pa-collapse>

```
```ts [script]

import { ref } from 'vue'

const collapseValue = ref<number[]>([])
const collapseChildValue = ref<number[]>([])

```

<!--codes end-->

## Collapse Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 当前展开面板的 name | CollapseItemValue\|CollapseItemValue[] | - |
| accordion | 是否开启手风琴模式 | boolean | - |
| border | 是否显示外边框 | boolean |  true |

## CollapseItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 唯一标识符，默认为索引值 | CollapseItemValue | - |
| title | 标题栏左侧内容 | string |  '' |
| icon | 标题栏左侧图标名称或图片链接，可选值见 Icon 组件 | string |  'right-icon' |
| value | 标题栏右侧内容 | string | - |
| border | 是否显示内边框 | boolean |  true |
| isLink | 是否展示标题栏右侧箭头并开启点击反馈 | boolean |  true |
| disabled | 是否禁用面板 | boolean | - |
| readonly | 是否为只读状态，只读状态下无法操作面板 | boolean | - |

<!--props end-->

## Collapse Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: NonNullable\<CollapseProps['modelValue']\>)  |
| change | (value: NonNullable\<CollapseProps['modelValue']\>)  |
| open | (name: CollapseItemValue)  |
| close | (name: CollapseItemValue)  |

## CollapseItem Event

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Collapse Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

## CollapseItem Slot

| 名称 | 说明 |
| --- | --- |
| title | - |
| value | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

:see_no_evil:

<!--cssVar end-->

