<template>
  <pa-loadmore :config="customConfig" :status="LoadStatusEnum.LOADMORE" />
  <pa-loadmore :config="customConfig" :status="LoadStatusEnum.LOADING" />
  <pa-loadmore :config="customConfig" :status="LoadStatusEnum.NOMORE" />
</template>

<script lang="ts" setup>
import { LoadStatusEnum } from 'papayaui'

const customConfig = { loadmore: '给我上划', loading: '努力加载...', nomore: '真的没有了' }
</script>
