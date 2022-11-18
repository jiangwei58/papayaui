<template>
  <DocDemoBlock title="基础用法">
    <wei-loadmore :status="LoadStatusEnum.LOADMORE" />
    <wei-loadmore :status="LoadStatusEnum.LOADING" />
    <wei-loadmore :status="LoadStatusEnum.NOMORE" />
  </DocDemoBlock>

  <DocDemoBlock title="自定义文案">
    <wei-loadmore :config="customConfig" :status="LoadStatusEnum.LOADMORE" />
    <wei-loadmore :config="customConfig" :status="LoadStatusEnum.LOADING" />
    <wei-loadmore :config="customConfig" :status="LoadStatusEnum.NOMORE" />
  </DocDemoBlock>

  <DocDemoBlock title="颜色">
    <wei-loadmore :status="LoadStatusEnum.LOADING" color="red" />
    <wei-loadmore :status="LoadStatusEnum.LOADING" text-color="red" />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { LoadStatusEnum } from '../../core/useList'

const customConfig = { loadmore: '给我上划', loading: '努力加载...', nomore: '真的没有了' }
</script>

<style lang="scss" scoped></style>
