<template>
  <pa-index-bar>
    <view v-for="index in indexes.length" :key="index">
      <pa-index-anchor :index="indexes[index - 1]" />
      <pa-cell v-for="cellIndex in 12" :key="cellIndex" title="文本" />
    </view>
  </pa-index-bar>
</template>

<script setup lang="ts">
const indexes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
</script>

<style lang="scss" scoped></style>
