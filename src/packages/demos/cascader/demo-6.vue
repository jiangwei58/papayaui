<template>
  <pa-cell title="远程搜索" :value="value.toString()" is-link @click="onChangeVisible" />

  <pa-cascader
    v-model:show="visible"
    v-model="value"
    show-search
    :lazy-load="onLoad"
    :lazy-search="onLoadSearch"
  />
</template>

<script setup lang="ts">
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
</script>
