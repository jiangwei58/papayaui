# PickerPopup

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-cell-group inset>
      <pa-cell title="单选" :value="singleValue" is-link @click="singleVisible = true" />
      <pa-cell
        title="多选"
        :value="multipleValue.toString()"
        is-link
        @click="multipleVisible = true"
      />
    </pa-cell-group>

    <pa-picker-popup
      v-model:show="singleVisible"
      v-model="singleValue"
      :data="syncOptions"
      show-search
    />
    <pa-picker-popup
      v-model:show="multipleVisible"
      v-model="multipleValue"
      :data="syncOptions"
      multiple
      show-search
    />
  </DocDemoBlock>

  <DocDemoBlock title="远程数据">
    <pa-cell-group inset>
      <pa-cell
        title="远程数据"
        :value="singleValue"
        is-link
        @click="
          () => {
            remoteVisible = true
            remote = false
          }
        "
      />
      <pa-cell
        title="远程搜索"
        :value="singleValue"
        is-link
        @click="
          () => {
            remoteVisible = true
            remote = true
          }
        "
      />
    </pa-cell-group>

    <pa-picker-popup
      v-model:show="remoteVisible"
      v-model="singleValue"
      :load="onLoad"
      show-search
      :remote="remote"
    />
  </DocDemoBlock>

  <DocDemoBlock title="远程分页数据">
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
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { ref } from 'vue'

interface OptionItem {
  label: string
  value: string
}

const singleVisible = ref<boolean>(false)
const singleValue = ref<string>()

const multipleVisible = ref<boolean>(false)
const multipleValue = ref<string[]>([])

const syncOptions = new Array(20)
  .fill(0)
  .map((_item, index) => ({ label: index.toString(), value: index.toString() }))

const remoteVisible = ref<boolean>(false)
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
</script>
```

<!--codes end-->

## PickerPopup Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| modelValue | 选择的值 | OptionValue\|OptionValue[] | - |
| data | 选项数据 | Option[] |  () => [] |
| labelKey | 数据标题的字段名 | string |  'label' |
| valueKey | 数据值的字段名 | string |  'value' |
| showSearch | 是否显示搜索 | boolean | - |
| multiple | 是否多选 | boolean |  false |
| load | 动态获取下一级节点数据 | (query?:string,pageNumber?:number,pageSize?:number,extra?:Record\<string,unknown\>,)=\>Option[]\|Promise\<Option[]\> | - |
| remote | 是否远程搜索 | boolean |  false |
| pagination | 是否支持分页 | boolean\|UseListProps\<Option\> |  false |
| initData | 每次打开重新加载数据 | boolean | - |
| confirmButtonText | 确认按钮的文案 | string |  '确定' |
| resetAfterConfirm | 确定后是否重置数据 | boolean | - |
| itemClass | 列表项的样式类 | string | - |
| itemStyle | 列表项的样式 | string\|CSSProperties | - |

<!--props end-->

## PickerPopup Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: OptionValue \| OptionValue[])  |
| change | (item: Option \| Option[])  |
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
| default | - |

<!--slot end-->

