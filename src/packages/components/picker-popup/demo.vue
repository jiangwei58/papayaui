<template>
  <DocDemoBlock title="基础用法">
    <wei-cell-group inset>
      <wei-cell title="单选" :value="singleValue" is-link @click="singleVisible = true" />
      <wei-cell
        title="多选"
        :value="multipleValue.toString()"
        is-link
        @click="multipleVisible = true"
      />
    </wei-cell-group>

    <wei-picker-popup
      v-model:show="singleVisible"
      v-model="singleValue"
      :data="syncOptions"
      show-search
    />
    <wei-picker-popup
      v-model:show="multipleVisible"
      v-model="multipleValue"
      :data="syncOptions"
      multiple
      show-search
    />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { ref } from 'vue'

const singleVisible = ref<boolean>(false)
const singleValue = ref<string>()

const multipleVisible = ref<boolean>(false)
const multipleValue = ref<string[]>([])

const syncOptions = new Array(20)
  .fill(0)
  .map((_item, index) => ({ label: index.toString(), value: index.toString() }))
</script>

<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
