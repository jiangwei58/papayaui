<template>
  <pa-cell-group inset>
    <pa-cell title="动态数据" :value="value.toString()" is-link @click="onChangeVisible" />
  </pa-cell-group>

  <pa-cascader v-model:show="visible" v-model="value" :lazy-load="onLoad" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderNode } from 'papayaui'

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
          return { label: `节点${path}`, value: path, leaf: node.level === 9 } as NodeItem
        }),
      )
    }, 300)
  })
}

const onChangeVisible = () => {
  visible.value = true
}
</script>
