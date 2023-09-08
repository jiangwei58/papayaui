# Cascader

## 示例

<!--codes start-->

::: code-group

```html [template]
<template>
  <DocDemoBlock title="基础用法">
    <pa-cell-group inset>
      <pa-cell title="静态数据" :value="value.toString()" is-link @click="onChangeVisible" />
      <pa-cell
        title="动态数据"
        :value="asyncValue.toString()"
        is-link
        @click="onAsyncChangeVisible"
      />
    </pa-cell-group>

    <pa-cascader v-model:show="visible" v-model="value" :options="syncTreeData" show-search />
    <pa-cascader v-model:show="asyncVisible" v-model="asyncValue" :lazy-load="onLoad" />
  </DocDemoBlock>

  <DocDemoBlock title="搜索">
    <pa-cell-group inset>
      <pa-cell
        title="本地搜索"
        :value="searchValue.toString()"
        is-link
        @click="onSearchChangeVisible()"
      />
      <pa-cell
        title="远程搜索"
        :value="searchValue.toString()"
        is-link
        @click="onSearchChangeVisible(true)"
      />
    </pa-cell-group>

    <pa-cascader
      v-model:show="searchVisible"
      v-model="searchValue"
      show-search
      :lazy-load="onLoad"
      :lazy-search="searchRemote ? onLoadSearch : undefined"
    />
  </DocDemoBlock>

  <DocDemoBlock title="多选">
    <pa-cell-group inset>
      <pa-cell
        title="多选"
        :value="multipleValue.join('/')"
        is-link
        @click="onMultipleChangeVisible()"
      />
    </pa-cell-group>

    <pa-cascader
      v-model:show="multipleVisible"
      v-model="multipleValue"
      :lazy-load="onLoad"
      multiple
      show-search
      :lazy-search="onLoadSearch"
    />
  </DocDemoBlock>
</template>
```
```ts [script]
<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { CascaderNode } from './props'

type NodeItem = { label: string; value: string; leaf?: boolean; children?: NodeItem[] }

const visible = ref<boolean>(false)
const value = ref<string[]>([])

const nodeCount = 20
const syncTreeData = new Array(nodeCount).fill(0).map((_item, index) => {
  const key: string = index.toString()
  const children =
    index !== nodeCount - 1
      ? new Array(nodeCount).fill(0).map((_child, childIndex) => {
          const childKey = `${key}-${childIndex}`
          return { label: childKey, value: childKey }
        })
      : []
  return { label: key, value: key, children }
})

const onChangeVisible = () => {
  visible.value = !visible.value
}

const asyncVisible = ref<boolean>(false)
const asyncValue = ref<string[]>([])

const onAsyncChangeVisible = () => {
  asyncVisible.value = !asyncVisible.value
}

const onLoad = (node: CascaderNode<NodeItem>) => {
  return new Promise<NodeItem[]>((resolve) => {
    setTimeout(() => {
      resolve(
        new Array(20).fill(0).map((_item, index) => {
          const path = node.props ? `${node.props.value}-${index}` : index.toString()
          return { label: `节点${path}`, value: path, leaf: node.level === 2 } as NodeItem
        }),
      )
    }, 300)
  })
}

const searchVisible = ref<boolean>(false)
const searchValue = ref<string[]>([])
const searchRemote = ref<boolean>(false)

const onSearchChangeVisible = (remote = false) => {
  searchRemote.value = remote
  searchVisible.value = !searchVisible.value
}

const onLoadSearch = (searchText: string) => {
  return new Promise<NodeItem[]>((resolve) => {
    setTimeout(() => {
      resolve([{ label: `搜索结果${searchText}`, value: '000000' }])
    }, 1000)
  })
}

const multipleVisible = ref<boolean>(false)
const multipleValue = ref<string[]>([])

const onMultipleChangeVisible = () => {
  multipleVisible.value = !multipleVisible.value
}
</script>
```

<!--codes end-->

## Cascader Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| show | 是否显示 | boolean |  false |
| title | 标题 | string | - |
| height | 弹窗高度 | string |  '80vh' |
| safeAreaInsetBottom | 是否适配底部安全区 | boolean |  true |
| modelValue | 值 | CascaderValue[] | - |
| options | 可选项数据源 | CascaderOption[] |  () => [] |
| fieldNames | 自定义 options 结构中的字段 | Partial\<UseTreeFieldNames\<CascaderOption\>\> |  () => defaultFieldNames |
| maxLevel | 最大层级，把哪一层级作为叶子节点 | number |  Number.MAX_SAFE_INTEGER |
| multiple | 是否多选 | boolean |  false |
| showSearch | 是否显示搜索 | boolean | - |
| lazyLoad | 动态获取下一级节点数据 | (node:CascaderNode)=\>CascaderOption[]\|Promise\<CascaderOption[]\> | - |
| lazySearch | 远程搜索 | (searchText:string)=\>CascaderOption[]\|Promise\<CascaderOption[]\> | - |
| confirmButtonText | 确定按钮文案，多选时默认数量显示的文案也要自己定义 | string | - |
| resetButtonText | 重置按钮文案 | string |  '重置' |
| resetAfterConfirm | 确定后是否重置数据 | boolean | - |
| showConfirm | 是否显示底部确认重置按钮，多选时强制开启 | boolean | - |
| allowEmpty | 是否允许空值，只在显示底部操作按钮时有效（通常使用场景是未选中值时允许确认） | boolean | - |
| itemClass | 列表项的样式类 | string | - |
| itemStyle | 列表项的样式 | string\|CSSProperties | - |

<!--props end-->

## Cascader Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| update:modelValue | (value: CascaderValue[])  |
| change | (value: CascaderValue[],items: CascaderOption[],extra: { tabIndex: number; isSearch: boolean })  |
| reset | ()  |
| confirm | ()  |
| nodeClick | (node: TreeNode\<CascaderOption\>)  |
| update:show | (value: PopupProps['show'])  |
| open | ()  |
| opened | ()  |
| close | ()  |
| closed | ()  |
| clickOverlay | ()  |

<!--event end-->

## Cascader Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |

<!--slot end-->

