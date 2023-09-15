<template>
  <pa-cell title="本地搜索" :value="value.toString()" is-link @click="onChangeVisible" />

  <pa-cascader v-model:show="visible" v-model="value" :options="treeData" show-search />
</template>

<script setup lang="ts">
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
</script>
