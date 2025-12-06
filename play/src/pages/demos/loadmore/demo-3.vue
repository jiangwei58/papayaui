<template>
  <pa-loadmore :status="LoadStatusEnum.LOADING" color="red" />
  <pa-loadmore :status="LoadStatusEnum.LOADING" text-color="red" />
</template>

<script lang="ts" setup>
import { LoadStatusEnum } from 'papayaui'
</script>
