<template>
  <view style="height: 200px">
    <pa-steps :steps="steps" :current="current" direction="vertical" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const steps = [
  {
    title: '步骤一',
    desc: '描述信息',
  },
  {
    title: '步骤二',
    desc: '描述信息',
  },
  {
    title: '步骤三',
    desc: '描述信息',
  },
]

const current = ref<number>(0)
</script>
