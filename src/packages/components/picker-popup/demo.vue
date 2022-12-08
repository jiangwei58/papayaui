<template>
  <DocDemoBlock title="基础用法">
    <pa-cell-group inset>
      <pa-cell title="单选" :value="singleValue" is-link @click="singleVisible = true" />
      <pa-cell
        title="多选"
        :value="multipleValue.toString()"
        is-link
        @click="multipleVisible = true"
      />
    </pa-cell-group>

    <pa-picker-popup
      v-model:show="singleVisible"
      v-model="singleValue"
      :data="syncOptions"
      show-search
    />
    <pa-picker-popup
      v-model:show="multipleVisible"
      v-model="multipleValue"
      :data="syncOptions"
      multiple
      show-search
    />
  </DocDemoBlock>

  <DocDemoBlock title="远程数据">
    <pa-cell-group inset>
      <pa-cell
        title="远程数据"
        :value="singleValue"
        is-link
        @click="
          () => {
            remoteVisible = true
            remote = false
          }
        "
      />
      <pa-cell
        title="远程搜索"
        :value="singleValue"
        is-link
        @click="
          () => {
            remoteVisible = true
            remote = true
          }
        "
      />
    </pa-cell-group>

    <pa-picker-popup
      v-model:show="remoteVisible"
      v-model="singleValue"
      :load="onLoad"
      show-search
      :remote="remote"
    />
  </DocDemoBlock>

  <DocDemoBlock title="远程分页数据">
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
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { ref } from 'vue'

interface OptionItem {
  label: string
  value: string
}

const singleVisible = ref<boolean>(false)
const singleValue = ref<string>()

const multipleVisible = ref<boolean>(false)
const multipleValue = ref<string[]>([])

const syncOptions = new Array(20)
  .fill(0)
  .map((_item, index) => ({ label: index.toString(), value: index.toString() }))

const remoteVisible = ref<boolean>(false)
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

<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
