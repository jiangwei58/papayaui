<template>
  <pa-cell-group inset>
    <pa-cell
      title="远程数据"
      :value="value"
      is-link
      @click="
        () => {
          visible = true
          remote = false
        }
      "
    />
    <pa-cell
      title="远程搜索"
      :value="value"
      is-link
      @click="
        () => {
          visible = true
          remote = true
        }
      "
    />
  </pa-cell-group>

  <pa-picker-popup
    v-model:show="visible"
    v-model="value"
    :load="onLoad"
    show-search
    :remote="remote"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface OptionItem {
  label: string
  value: string
}

const value = ref<string>()
const visible = ref<boolean>(false)
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
</script>
