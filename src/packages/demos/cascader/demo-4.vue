<template>
  <pa-cell-group inset>
    <pa-cell title="选项" :value="value.toString()" is-link @click="onChangeVisible" />
  </pa-cell-group>

  <pa-cascader
    v-model:show="visible"
    v-model="value"
    :field-names="fieldNames"
    :lazy-load="onLoad"
  />
</template>

<script setup lang="ts">
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
</script>
