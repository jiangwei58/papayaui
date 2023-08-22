<template>
  <DocDemoBlock title="基础用法">
    <pa-collapse v-model="collapseValue" @change="onChange" @open="onOpen" @close="onClose">
      <pa-collapse-item v-for="index in 3" :key="index" :title="`标题${index}`">
        折叠内容折叠内容折叠内容折叠内容
      </pa-collapse-item>
    </pa-collapse>
  </DocDemoBlock>

  <DocDemoBlock title="手风琴">
    <pa-collapse accordion @change="onChange" @open="onOpen" @close="onClose">
      <pa-collapse-item v-for="index in 3" :key="index" :title="`标题${index}`">
        折叠内容折叠内容折叠内容折叠内容
      </pa-collapse-item>
    </pa-collapse>
  </DocDemoBlock>

  <DocDemoBlock title="禁用状态">
    <pa-collapse>
      <pa-collapse-item
        v-for="index in 3"
        :key="index"
        :title="`标题${index}`"
        :disabled="index !== 1"
      >
        折叠内容折叠内容折叠内容折叠内容
      </pa-collapse-item>
    </pa-collapse>
  </DocDemoBlock>

  <DocDemoBlock title="自定义标题内容">
    <pa-collapse>
      <pa-collapse-item>
        <template #title>
          <span class="color-primary">标题1</span>
          <pa-icon name="question" color="var(--pa-color-danger)" />
        </template>
        折叠内容折叠内容折叠内容折叠内容
      </pa-collapse-item>
      <pa-collapse-item title="标题2" icon="setting" value="内容">
        折叠内容折叠内容折叠内容折叠内容
      </pa-collapse-item>
    </pa-collapse>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { CollapseItemValue } from '../collapse-item/props'

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

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--pa-color-gray);
}
</style>
