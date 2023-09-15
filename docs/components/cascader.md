# Cascader

<!--codes start-->

## 单选

```html [template]

<pa-cell title="单选" :value="value.toString()" is-link @click="onChangeVisible" />

<pa-cascader v-model:show="visible" v-model="value" :options="treeData" />

```
```ts [script]

import { ref } from 'vue'

const visible = ref(false)
const value = ref<string[]>([])

const treeData = [
  {
    label: '广东省',
    value: 'gds',
    children: [
      {
        label: '深圳市',
        value: 'szs',
      },
      {
        label: '广州市',
        value: 'gzs',
      },
    ],
  },
  {
    label: '浙江省',
    value: 'zjs',
    children: [
      {
        label: '杭州市',
        value: 'hzs',
      },
    ],
  },
]

const onChangeVisible = () => {
  visible.value = true
}

```
## 多选

```html [template]

<pa-cell title="多选" :value="value.join('、')" is-link @click="onChangeVisible" />

<pa-cascader v-model:show="visible" v-model="value" :options="treeData" multiple />

```
```ts [script]

import { ref } from 'vue'

const visible = ref(false)
const value = ref<string[]>([])

const treeData = [
  {
    label: '广东省',
    value: 'gds',
    children: [
      {
        label: '深圳市',
        value: 'szs',
      },
      {
        label: '广州市',
        value: 'gzs',
      },
    ],
  },
  {
    label: '浙江省',
    value: 'zjs',
    children: [
      {
        label: '杭州市',
        value: 'hzs',
      },
    ],
  },
]

const onChangeVisible = () => {
  visible.value = true
}

```
## 异步加载选项

```html [template]

<pa-cell-group inset>
  <pa-cell title="动态数据" :value="value.toString()" is-link @click="onChangeVisible" />
</pa-cell-group>

<pa-cascader v-model:show="visible" v-model="value" :lazy-load="onLoad" />

```
```ts [script]

import { ref } from 'vue'
import type { CascaderNode } from '../..'

interface NodeItem {
  label: string
  value: string
  leaf?: boolean
  children?: NodeItem[]
}

const visible = ref(false)
const value = ref<string[]>([])

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

const onChangeVisible = () => {
  visible.value = true
}

```
## 自定义字段名

```html [template]

<pa-cell-group inset>
  <pa-cell title="选项" :value="value.toString()" is-link @click="onChangeVisible" />
</pa-cell-group>

<pa-cascader
  v-model:show="visible"
  v-model="value"
  :field-names="fieldNames"
  :lazy-load="onLoad"
/>

```
```ts [script]

/**
 * @description 通过 `fieldNames` 属性可以自定义字段名
 */
import { ref } from 'vue'
import type { CascaderNode } from '../..'

interface NodeItem {
  name: string
  code: string
  leaf?: boolean
  childList?: NodeItem[]
}

const visible = ref(false)
const fieldNames = { label: 'name', value: 'code', children: 'childList' }
const value = ref<string[]>([])

const onLoad = (node: CascaderNode<NodeItem>) => {
  return new Promise<NodeItem[]>((resolve) => {
    setTimeout(() => {
      resolve(
        new Array(20).fill(0).map((_item, index) => {
          const path = node.props ? `${node.props.code}-${index}` : index.toString()
          return { name: `节点${path}`, code: path, leaf: node.level === 2 } as NodeItem
        }),
      )
    }, 300)
  })
}

const onChangeVisible = () => {
  visible.value = true
}

```
## 本地搜索

```html [template]

<pa-cell title="本地搜索" :value="value.toString()" is-link @click="onChangeVisible" />

<pa-cascader v-model:show="visible" v-model="value" :options="treeData" show-search />

```
```ts [script]

/**
 * @description 设置 show-search 为 true 显示搜索栏，默认是本地搜索
 */
import { ref } from 'vue'

const visible = ref(false)
const value = ref<string[]>([])

const nodeCount = 20
const treeData = new Array(nodeCount).fill(0).map((_item, index) => {
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
  visible.value = true
}

```
## 远程搜索

```html [template]

<pa-cell title="远程搜索" :value="value.toString()" is-link @click="onChangeVisible" />

<pa-cascader
  v-model:show="visible"
  v-model="value"
  show-search
  :lazy-load="onLoad"
  :lazy-search="onLoadSearch"
/>

```
```ts [script]

/**
 * @description 通过 lazy-search 属性指定远程搜索方法，返回的数据格式为 field-names 数组数据
 */
import { ref } from 'vue'
import type { CascaderNode } from '../..'

interface NodeItem {
  label: string
  value: string
  leaf?: boolean
  children?: NodeItem[]
}

const visible = ref(false)
const value = ref<string[]>([])

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

const onLoadSearch = (query: string) => {
  /**
   * 搜索结果可以是选项里存在的数据，也可以是不存在的数据
   */
  return new Promise<NodeItem[]>((resolve) => {
    setTimeout(() => {
      resolve([{ label: `搜索结果${query}`, value: '0000' }])
    }, 1000)
  })
}

const onChangeVisible = () => {
  visible.value = true
}

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

