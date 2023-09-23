<template>
  <pa-loadmore :status="LoadStatusEnum.LOADMORE" />
  <pa-loadmore :status="LoadStatusEnum.LOADING" />
  <pa-loadmore :status="LoadStatusEnum.NOMORE" />
</template>

<script lang="ts" setup>
import { LoadStatusEnum } from '../../core/useList'
</script>
