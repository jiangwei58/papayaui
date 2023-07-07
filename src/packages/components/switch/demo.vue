<template>
  <DocDemoBlock title="基础用法" card>
    <pa-switch v-model="checked" />
  </DocDemoBlock>
  <DocDemoBlock title="禁用状态" card>
    <pa-switch v-model="checked" disabled />
  </DocDemoBlock>
  <DocDemoBlock title="加载状态" card>
    <pa-switch v-model="checked" loading />
  </DocDemoBlock>
  <DocDemoBlock title="自定义大小" card>
    <pa-switch v-model="checked" size="18px" />
  </DocDemoBlock>
  <DocDemoBlock title="异步控制" card>
    <pa-switch :model-value="checked" :loading="loading" @change="onChange" />
  </DocDemoBlock>
  <DocDemoBlock title="自定义颜色" card>
    <pa-switch v-model="checked" active-color="#ee0a24" inactive-color="#aaa" />
  </DocDemoBlock>
  <DocDemoBlock title="自定义值" card>
    <pa-switch v-model="customChecked" active-value="开" inactive-value="关" />
    <text class="ml-40">{{ customChecked }}</text>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { SwitchValue } from './props'

const checked = ref<boolean>(true)
const loading = ref<boolean>(false)

const onChange = (value: SwitchValue) => {
  loading.value = true
  setTimeout(() => {
    checked.value = value as boolean
    loading.value = false
  }, 2000)
}

const customChecked = ref<string>('开')
</script>

<style lang="scss" scoped></style>
