<template>
  <DocDemoBlock title="基础用法" card>
    <pa-checkbox-btns v-model="selectedValue1" :options="getData(6)" />
  </DocDemoBlock>

  <DocDemoBlock title="多选" card>
    <pa-checkbox-btns v-model="selectedValue2" :options="getData(6)" multiple />
  </DocDemoBlock>

  <DocDemoBlock title="自定义布局" card>
    <pa-checkbox-btns v-model="selectedValue3" :options="getData(8)" :column="4" gap="10" round />
  </DocDemoBlock>

  <DocDemoBlock title="自定义内容" card>
    <pa-checkbox-btns v-model="selectedValue4" :options="getData(8)">
      <template #default="{ item, index }">
        <pa-icon :name="index % 2 === 0 ? 'success' : 'close'" />
        <text>{{ item.label }}</text>
      </template>
    </pa-checkbox-btns>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

interface Option {
  label: string
  value: number
}

const selectedValue1 = ref<Option['value']>()
const selectedValue2 = ref<Option['value'][]>([])
const selectedValue3 = ref<Option['value']>()
const selectedValue4 = ref<Option['value']>()

const getData = (count: number) => {
  return new Array(count).fill(0).map((_item, index) => {
    return {
      label: `选项${index}`,
      value: index,
    }
  })
}
</script>

<style lang="scss" scoped></style>
