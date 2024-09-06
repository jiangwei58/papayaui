<template>
  <pa-input-number :model-value="num" async-change @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { sleep } from '../../utils'

const num = ref(1)

const onChange = async (value: number) => {
  uni.showToast({
    icon: 'loading',
    title: '',
    duration: 2000,
  })
  await sleep(2000)
  num.value = value
  uni.hideToast()
}
</script>
