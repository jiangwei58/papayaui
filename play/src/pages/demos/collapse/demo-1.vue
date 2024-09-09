<template>
  <pa-collapse v-model="collapseValue" @change="onChange" @open="onOpen" @close="onClose">
    <pa-collapse-item v-for="index in 3" :key="index" :title="`标题${index}`">
      折叠内容折叠内容折叠内容折叠内容
    </pa-collapse-item>
  </pa-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CollapseItemValue } from 'papayaui'

const collapseValue = ref<number[]>([0])

const onChange = (value: CollapseItemValue | CollapseItemValue[]) => {
  console.log('change', value)
}

const onOpen = (value: CollapseItemValue) => {
  console.log('open', value)
}

const onClose = (value: CollapseItemValue) => {
  console.log('close', value)
}
</script>
