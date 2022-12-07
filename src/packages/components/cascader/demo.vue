<template>
  <DocDemoBlock title="基础用法">
    <wei-cell-group inset>
      <wei-cell title="静态数据" :value="value.toString()" is-link @click="onChangeVisible" />
      <wei-cell
        title="动态数据"
        :value="asyncValue.toString()"
        is-link
        @click="onAsyncChangeVisible"
      />
    </wei-cell-group>

    <wei-cascader v-model:show="visible" v-model="value" :options="syncTreeData" show-search />
    <wei-cascader v-model:show="asyncVisible" v-model="asyncValue" :lazy-load="onLoad" />
  </DocDemoBlock>

  <DocDemoBlock title="搜索">
    <wei-cell-group inset>
      <wei-cell
        title="本地搜索"
        :value="searchValue.toString()"
        is-link
        @click="onSearchChangeVisible()"
      />
      <wei-cell
        title="远程搜索"
        :value="searchValue.toString()"
        is-link
        @click="onSearchChangeVisible(true)"
      />
    </wei-cell-group>

    <wei-cascader
      v-model:show="searchVisible"
      v-model="searchValue"
      show-search
      :lazy-load="onLoad"
      :lazy-search="searchRemote ? onLoadSearch : undefined"
    />
  </DocDemoBlock>

  <DocDemoBlock title="多选">
    <wei-cell-group inset>
      <wei-cell
        title="多选"
        :value="multipleValue.join('/')"
        is-link
        @click="onMultipleChangeVisible()"
      />
    </wei-cell-group>

    <wei-cascader
      v-model:show="multipleVisible"
      v-model="multipleValue"
      :lazy-load="onLoad"
      multiple
      show-search
      :lazy-search="onLoadSearch"
    />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { CascaderNode } from './cascader.vue'

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

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
