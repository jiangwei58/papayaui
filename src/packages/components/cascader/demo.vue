<template>
  <DocDemoBlock title="基础用法">
    <wei-cell-group inset>
      <wei-cell title="静态数据" :value="value" is-link @click="onChangeVisible" />
      <wei-cell title="动态数据" :value="asyncValue" is-link @click="onAsyncChangeVisible" />
    </wei-cell-group>

    <wei-cascader v-model:show="visible" v-model="value" :data="syncTreeData" />
    <wei-cascader v-model:show="asyncVisible" v-model="asyncValue" :max-level="3" :load="onLoad" />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { ref } from 'vue'

type NodeItem = { label: string; value: string; children: NodeItem[] }

const visible = ref<boolean>(false)
const value = ref<string>()

const syncTreeData = [
  { label: '1', value: '1', children: [{ label: '1-1', value: '1-1' }] },
  { label: '2', value: '2', children: [{ label: '2-2', value: '2-2' }] },
]

const onChangeVisible = () => {
  visible.value = !visible.value
}

const asyncVisible = ref<boolean>(false)
const asyncValue = ref<string>()

const onAsyncChangeVisible = () => {
  asyncVisible.value = !asyncVisible.value
}

const onLoad = (_level: number, node: NodeItem) => {
  return new Promise<NodeItem[]>((resolve) => {
    setTimeout(() => {
      resolve(
        new Array(20).fill(0).map((_item, index) => {
          const path = node ? `${node.value}-${index}` : index
          return { label: `节点: ${path}`, value: path } as NodeItem
        }),
      )
    }, 300)
  })
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
