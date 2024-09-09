<template>
  <pa-swipe-cell name="name" :options="options" @click="onClick">
    <pa-cell title="单元格" value="内容" />
  </pa-swipe-cell>
</template>

<script lang="ts" setup>
import type { SwipeCellOption, SwipeCellProps } from 'papayaui'

const options: SwipeCellOption[] = [
  {
    text: '收藏',
    style: { backgroundColor: 'var(--pa-color-primary)' },
    click: (name: SwipeCellProps['name']) => {
      console.log('当前点击的name:', name)
    },
  },
  { text: '删除' },
]

const onClick = (name: string | number, index: number, item: SwipeCellOption) => {
  uni.showToast({
    title: `点击了 ${item.text}`,
    icon: 'none',
  })
  console.log(name, index, item)
}
</script>
