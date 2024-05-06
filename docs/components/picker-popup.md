# PickerPopup

<!--codes start-->

## 基础用法

```html [template]

<pa-cell-group inset>
  <pa-cell title="单选" :value="value" is-link @click="visible = true" />
  <pa-cell title="多选" :value="value2.toString()" is-link @click="visible2 = true" />
</pa-cell-group>

<pa-picker-popup v-model:show="visible" v-model="value" :data="syncOptions" show-search />
<pa-picker-popup
  v-model:show="visible2"
  v-model="value2"
  :data="syncOptions"
  multiple
  show-search
/>

```
```ts [script]

import { ref } from 'vue'

const value = ref<string>()
const visible = ref(false)

const value2 = ref<string[]>([])
const visible2 = ref(false)

const syncOptions = new Array(20)
  .fill(0)
  .map((_item, index) => ({ label: index.toString(), value: index.toString() }))

```
## 远程数据

```html [template]

<pa-cell-group inset>
  <pa-cell
    title="远程数据"
    :value="value"
    is-link
    @click="
      () => {
        visible = true
        remote = false
      }
    "
  />
  <pa-cell
    title="远程搜索"
    :value="value"
    is-link
    @click="
      () => {
        visible = true
        remote = true
      }
    "
  />
</pa-cell-group>

<pa-picker-popup
  v-model:show="visible"
  v-model="value"
  :load="onLoad"
  show-search
  :remote="remote"
/>

```
```ts [script]

import { ref } from 'vue'

interface OptionItem {
  label: string
  value: string
}

const value = ref<string>()
const visible = ref<boolean>(false)
const remote = ref<boolean>(false)

const onLoad = (query?: string) => {
  return new Promise<OptionItem[]>((resolve) => {
    setTimeout(() => {
      resolve(
        new Array(20).fill(0).map((_item, index) => {
          return {
            label: `${query ? `${query}搜索结果` : '选项'}: ${index}`,
            value: index.toString(),
          }
        }),
      )
    }, 600)
  })
}

```
## 远程分页数据

```html [template]

<pa-cell-group inset>
  <pa-cell title="分页数据" :value="singleValue2" is-link @click="remoteVisible2 = true" />
</pa-cell-group>

<pa-picker-popup
  v-model:show="remoteVisible2"
  v-model="singleValue2"
  :load="onLoad2"
  show-search
  remote
  pagination
/>

```
```ts [script]

import { ref } from 'vue'

interface OptionItem {
  label: string
  value: string
}

const remoteVisible2 = ref<boolean>(false)
const singleValue2 = ref<string>()
const onLoad2 = (query?: string, pageNumber?: number, pageSize?: number) => {
  return new Promise<OptionItem[]>((resolve) => {
    setTimeout(() => {
      resolve(
        new Array(pageSize).fill(0).map((_item, index) => {
          const num = index + (pageNumber ?? 0) * (pageSize ?? 10)
          return {
            label: `${query ? `${query}搜索结果` : '选项'}: ${num}`,
            value: num.toString(),
          }
        }),
      )
    }, 600)
  })
}

```
## 创建条目

```html [template]

<pa-cell-group inset>
  <pa-cell title="单选" :value="value" is-link @click="visible = true" />
  <pa-cell title="多选" :value="value2.toString()" is-link @click="visible2 = true" />
</pa-cell-group>

<pa-picker-popup
  v-model:show="visible"
  v-model="value"
  :load="onLoad"
  show-search
  remote
  pagination
  allow-create
/>

<pa-picker-popup
  v-model:show="visible2"
  v-model="value2"
  :load="onLoad"
  show-search
  remote
  pagination
  allow-create
  multiple
/>

```
```ts [script]

import { ref } from 'vue'

interface OptionItem {
  label: string
  value: string
}

const value = ref<string>()
const visible = ref(false)

const value2 = ref<string[]>([])
const visible2 = ref(false)

const onLoad = (query?: string, pageNumber?: number, pageSize?: number) => {
  if (query) return []
  return new Promise<OptionItem[]>((resolve) => {
    setTimeout(() => {
      resolve(
        new Array(pageSize).fill(0).map((_item, index) => {
          const num = index + (pageNumber ?? 0) * (pageSize ?? 10)
          return {
            label: `${query ? `${query}搜索结果` : '选项'}: ${num}`,
            value: num.toString(),
          }
        }),
      )
    }, 600)
  })
}

```

<!--codes end-->

## PickerPopup Props

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
| modelValue | 选择的值 | OptionValue\|OptionValue[] | - |
| data | 选项数据 | Option[] |  () => [] |
| labelKey | 数据标题的字段名 | string |  'label' |
| valueKey | 数据值的字段名 | string |  'value' |
| showSearch | 是否显示搜索 | boolean | - |
| searchProps | 搜索框的props | Partial\<SearchProps\> |  () => ({}) |
| multiple | 是否多选 | boolean |  false |
| load | 动态获取下一级节点数据 | (query?:string,pageNumber?:number,pageSize?:number,extra?:Record\<string,unknown\>)<br />=\>Option[]\|Promise\<Option[]\> | - |
| remote | 是否远程搜索 | boolean |  false |
| pagination | 是否支持分页 | boolean\|UseListProps\<Option\> |  false |
| initData | 每次打开重新加载数据 | boolean | - |
| confirmButtonText | 确认按钮的文案 | string |  '确定' |
| resetAfterConfirm | 确定后是否重置数据 | boolean | - |
| showConfirm | 是否显示确认按钮，多选时强制开启 | boolean | - |
| allowCreate | 是否允许用户创建新条目，需配合 showSearch 使用 | boolean | - |
| beforeCreate | 创建前处理 | (text:string)=\>Option\|Promise\<Option\> | - |
| itemClass | 列表项的样式类 | string | - |
| itemStyle | 列表项的样式 | string\|CSSProperties | - |

<!--props end-->

## PickerPopup Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: OptionValue \| OptionValue[])  |
| select | (item: Option)  |
| change | (item: Option \| Option[])  |
| create | (text: string) |
| update:show | (value: PopupProps['show'])  |
| open | ()  |
| opened | ()  |
| close | ()  |
| closed | ()  |
| clickOverlay | ()  |

<!--event end-->

## PickerPopup Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| before | - |
| default | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

:see_no_evil:

<!--cssVar end-->

