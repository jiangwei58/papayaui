<template>
  <DocDemoBlock title="基础用法">
    <wei-cell-group inset>
      <wei-cell title="静态数据" :value="value.join('/')" is-link @click="onChangeVisible" />
      <wei-cell
        title="动态数据"
        :value="asyncValue.join('/')"
        is-link
        @click="onAsyncChangeVisible"
      />
    </wei-cell-group>

    <wei-cascader v-model:show="visible" v-model="value" :data="syncTreeData" show-search />
    <wei-cascader v-model:show="asyncVisible" v-model="asyncValue" :load="onLoad" />
  </DocDemoBlock>

  <DocDemoBlock title="搜索">
    <wei-cell-group inset>
      <wei-cell
        title="本地搜索"
        :value="searchValue.join('/')"
        is-link
        @click="onSearchChangeVisible()"
      />
      <wei-cell
        title="远程搜索"
        :value="searchValue.join('/')"
        is-link
        @click="onSearchChangeVisible(true)"
      />
    </wei-cell-group>

    <wei-cascader
      v-model:show="searchVisible"
      v-model="searchValue"
      show-search
      :load="onLoad"
      :load-search="searchRemote ? onLoadSearch : undefined"
    />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { ref } from 'vue'
import { CascaderNode } from './cascader.vue'

type NodeItem = { label: string; value: string; leaf?: boolean; children?: NodeItem[] }

const visible = ref<boolean>(false)
const value = ref<string[]>([])

const syncTreeData = [
  { label: '1', value: '1', children: [{ label: '1-1', value: '1-1' }] },
  { label: '2', value: '2', children: [{ label: '2-2', value: '2-2' }] },
  { label: '3', value: '3', children: [] },
]

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
      resolve([{ label: `搜索结果${searchText}`, value: '0' }])
    }, 1000)
  })
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
