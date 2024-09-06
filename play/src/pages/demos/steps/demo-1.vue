<template>
  <pa-steps :steps="steps" :current="current" />
  <view class="text-center mt-30">
    <pa-button round @click="onNext()">下一步</pa-button>
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

const onNext = () => {
  current.value += 1
  if (current.value >= steps.length) {
    current.value = 0
  }
}
</script>
