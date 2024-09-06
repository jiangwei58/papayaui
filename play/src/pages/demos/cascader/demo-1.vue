<template>
  <pa-cell title="单选" :value="value.toString()" is-link @click="onChangeVisible" />

  <pa-cascader v-model:show="visible" v-model="value" :options="treeData" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const value = ref<string[]>([])

const treeData = [
  {
    label: '广东省',
    value: 'gds',
    children: [
      {
        label: '深圳市',
        value: 'szs',
      },
      {
        label: '广州市',
        value: 'gzs',
      },
    ],
  },
  {
    label: '浙江省',
    value: 'zjs',
    children: [
      {
        label: '杭州市',
        value: 'hzs',
      },
    ],
  },
]

const onChangeVisible = () => {
  visible.value = true
}
</script>
