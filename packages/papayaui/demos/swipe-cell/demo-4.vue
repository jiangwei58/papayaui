<template>
  <pa-swipe-cell :options="options" disabled>
    <pa-cell title="单元格" value="内容" />
  </pa-swipe-cell>
</template>

<script lang="ts" setup>
import type { SwipeCellOption, SwipeCellProps } from '../..'

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
</script>
