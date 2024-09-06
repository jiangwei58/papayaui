<template>
  <pa-cell-group inset>
    <pa-cell title="分页数据" :value="singleValue2" is-link @click="remoteVisible2 = true" />
  </pa-cell-group>

  <pa-picker-popup
    v-model:show="remoteVisible2"
    v-model="singleValue2"
    :load="onLoad2"
    show-search
    remote
    pagination
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface OptionItem {
  label: string
  value: string
}

const remoteVisible2 = ref<boolean>(false)
const singleValue2 = ref<string>()
const onLoad2 = (query?: string, pageNumber?: number, pageSize?: number) => {
  return new Promise<OptionItem[]>((resolve) => {
    setTimeout(() => {
      resolve(
        new Array(pageSize).fill(0).map((_item, index) => {
          const num = index + (pageNumber ?? 0) * (pageSize ?? 10)
          return {
            label: `${query ? `${query}搜索结果` : '选项'}: ${num}`,
            value: num.toString(),
          }
        }),
      )
    }, 600)
  })
}
</script>
