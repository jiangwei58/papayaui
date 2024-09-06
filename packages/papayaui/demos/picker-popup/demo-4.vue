<template>
  <pa-cell-group inset>
    <pa-cell title="单选" :value="value" is-link @click="visible = true" />
    <pa-cell title="多选" :value="value2.toString()" is-link @click="visible2 = true" />
  </pa-cell-group>

  <pa-picker-popup
    v-model:show="visible"
    v-model="value"
    :load="onLoad"
    show-search
    remote
    pagination
    allow-create
  />

  <pa-picker-popup
    v-model:show="visible2"
    v-model="value2"
    :load="onLoad"
    show-search
    remote
    pagination
    allow-create
    multiple
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface OptionItem {
  label: string
  value: string
}

const value = ref<string>()
const visible = ref(false)

const value2 = ref<string[]>([])
const visible2 = ref(false)

const onLoad = (query?: string, pageNumber?: number, pageSize?: number) => {
  if (query) return []
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

<style lang="scss" scoped></style>
