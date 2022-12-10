<template>
  <DocDemoBlock title="基础用法">
    <pa-steps :steps="steps" :current="current" />
    <view class="text-center mt-30">
      <pa-button round @click="onNext()">下一步</pa-button>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="竖向步骤条">
    <view style="height: 200px">
      <pa-steps :steps="steps" :current="current" direction="vertical" />
    </view>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

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

<style lang="scss" scoped></style>
