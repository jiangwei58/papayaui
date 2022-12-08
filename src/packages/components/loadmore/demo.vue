<template>
  <DocDemoBlock title="基础用法">
    <pa-loadmore :status="LoadStatusEnum.LOADMORE" />
    <pa-loadmore :status="LoadStatusEnum.LOADING" />
    <pa-loadmore :status="LoadStatusEnum.NOMORE" />
  </DocDemoBlock>

  <DocDemoBlock title="自定义文案">
    <pa-loadmore :config="customConfig" :status="LoadStatusEnum.LOADMORE" />
    <pa-loadmore :config="customConfig" :status="LoadStatusEnum.LOADING" />
    <pa-loadmore :config="customConfig" :status="LoadStatusEnum.NOMORE" />
  </DocDemoBlock>

  <DocDemoBlock title="颜色">
    <pa-loadmore :status="LoadStatusEnum.LOADING" color="red" />
    <pa-loadmore :status="LoadStatusEnum.LOADING" text-color="red" />
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import { LoadStatusEnum } from '../../core/useList'

const customConfig = { loadmore: '给我上划', loading: '努力加载...', nomore: '真的没有了' }
</script>

<style lang="scss" scoped></style>
