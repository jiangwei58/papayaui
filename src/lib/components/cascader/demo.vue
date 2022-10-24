<template>
  <view>静态数据</view>
  <view>当前值：{{ value }}</view>
  <button @click="onChangeVisible">打开</button>
  <Cascader v-model:show="visible" v-model="value" :data="syncTreeData" :max="2" />

  <view class="mt-30">动态数据</view>
  <view>当前值：{{ asyncValue }}</view>
  <button @click="onAsyncChangeVisible">打开</button>
  <Cascader v-model:show="asyncVisible" v-model="asyncValue" :max="6" :load="onLoad" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Cascader from './cascader.vue'

type NodeItem = { label: string; value: string; children: NodeItem[] }

const visible = ref<boolean>(false)
const value = ref<string>()

const syncTreeData = [
  { label: '1', value: '1', children: [{ label: '1-1', value: '1-1' }] },
  { label: '2', value: '2', children: [{ label: '2-2', value: '2-2' }] },
]

const onChangeVisible = () => {
  visible.value = !visible.value
}

const asyncVisible = ref<boolean>(false)
const asyncValue = ref<string>()

const onAsyncChangeVisible = () => {
  asyncVisible.value = !asyncVisible.value
}

const onLoad = (_level: number, node: NodeItem) => {
  return new Promise<NodeItem[]>((resolve) => {
    setTimeout(() => {
      resolve(
        new Array(10).fill(0).map((_item, index) => {
          const path = node ? `${node.value}-${index}` : index
          return { label: `节点: ${path}`, value: path } as NodeItem
        }),
      )
    }, 300)
  })
}
</script>

<style lang="scss" scoped></style>
