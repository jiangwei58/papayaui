# Radio

<!--codes start-->

## 基础用法

```html [template]

<pa-radio-group v-model="value">
  <pa-radio v-for="item in options" :key="item.name" :name="item.name">
    {{ item.label }}
  </pa-radio>
</pa-radio-group>
<pa-radio-group v-model="value" class="block mt-50">
  <pa-radio v-for="item in options" :key="item.name" :name="item.name" label-position="left">
    {{ item.label }}
  </pa-radio>
</pa-radio-group>

```
```ts [script]

import { ref } from 'vue'

const value = ref<number>(0)

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '单选框' + index,
}))

```
## 水平方向

```html [template]

<pa-radio-group v-model="value" direction="horizontal">
  <pa-radio v-for="item in options" :key="item.name" :name="item.name">
    {{ item.label }}
  </pa-radio>
</pa-radio-group>
<pa-radio-group v-model="value" direction="horizontal" class="block mt-50">
  <pa-radio v-for="item in options" :key="item.name" :name="item.name" label-position="left">
    {{ item.label }}
  </pa-radio>
</pa-radio-group>

```
```ts [script]

import { ref } from 'vue'

const value = ref<number>(0)

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '单选框' + index,
}))

```
## 形状

```html [template]

<pa-radio-group v-model="value">
  <pa-radio v-for="item in options" :key="item.name" :name="item.name" shape="square">
    {{ item.label }}
  </pa-radio>
</pa-radio-group>

```
```ts [script]

import { ref } from 'vue'

const value = ref<number>(0)

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '单选框' + index,
}))

```
## 禁用

```html [template]

<pa-radio-group v-model="value">
  <pa-radio
    v-for="item in options"
    :key="item.name"
    :name="item.name"
    :disabled="item.name === 1"
  >
    {{ item.label }}
  </pa-radio>
</pa-radio-group>
<pa-radio-group v-model="value" disabled class="block mt-50">
  <pa-radio v-for="item in options" :key="item.name" :name="item.name">
    {{ item.label }}
  </pa-radio>
</pa-radio-group>

```
```ts [script]

import { ref } from 'vue'

const value = ref<number>(0)

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '单选框' + index,
}))

```

<!--codes end-->

## Radio Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 标识符 | RadioValue |  '' |
| shape | 形状 | 'square'\|'round' |  'round' |
| disabled | 是否为禁用状态 | boolean | - |
| labelDisabled | 是否禁用文本内容点击 | boolean | - |
| labelPosition | 文本位置 | 'left'\|'right' |  'right' |
| iconSize | 图标大小 | string \| number |  '20px' |
| checkedColor | 选中状态颜色 | CSSProperties['color'] | - |

## RadioGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| name | 标识符 | string |  '' |
| modelValue | 值 | RadioValue | - |
| direction | 方向 | 'horizontal'\|'vertical' |  'vertical' |
| disabled | 是否全部禁用 | boolean | - |

<!--props end-->

## Radio Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| change | (value: RadioValue)  |

## RadioGroup Event

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: RadioValue)  |
| change | (value: RadioValue, name: string)  |

<!--event end-->

## Radio Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |
| default | - |

## RadioGroup Slot

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-radio-size | 20px |
| --pa-radio-display | flex |
| --pa-radio-margin | 0 |
| --pa-radio-font-size | 16px |
| --pa-radio-label-color | var(--pa-color-black) |
| --pa-radio-checked-color | var(--pa-color-primary) |
| --pa-radio-checked-color | var(--pa-color-primary) |

<!--cssVar end-->

