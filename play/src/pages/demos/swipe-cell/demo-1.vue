<template>
  <pa-swipe-cell :options="options" @open="onOpen">
    <pa-cell title="单元格" value="内容" />
  </pa-swipe-cell>
</template>

<script lang="ts" setup>
import type { SwipeCellOption } from 'papayaui'

const options: SwipeCellOption[] = [{ text: '删除' }]

const onOpen = () => {
  console.log('open')
}
</script>
