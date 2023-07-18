<template>
  <DocDemoBlock title="基础用法" card>
    <pa-count-to
      ref="countToRef"
      :start-num="0"
      :end-num="999"
      custom-class="text-60 text-black"
      @click="countToRef?.restart()"
    />
  </DocDemoBlock>
  <DocDemoBlock title="倒计时" card>
    <pa-count-to
      ref="countToRef2"
      :start-num="999"
      :end-num="0"
      custom-class="text-60 text-black"
      @click="countToRef2?.restart()"
    />
  </DocDemoBlock>
  <DocDemoBlock title="显示小数" card>
    <pa-count-to
      ref="countToRef3"
      :start-num="0"
      :end-num="999.99"
      custom-class="text-60 text-black"
      @click="countToRef3?.restart()"
    />
  </DocDemoBlock>
  <DocDemoBlock title="自定义格式化值" card>
    <pa-count-to
      ref="countToRef4"
      :start-num="0"
      :end-num="9999"
      :formatter="
        (num) =>
          num.toString().replace(/\d+/, (s) => {
            return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
          })
      "
      custom-class="text-60 text-black"
      @click="countToRef4?.restart()"
    />
  </DocDemoBlock>
  <DocDemoBlock title="自定义控制" card>
    <pa-count-to
      ref="countToRef5"
      :start-num="0"
      :end-num="999"
      custom-class="text-60 text-black"
    />
    <view class="grid grid-cols-3 gap-20 mt-30">
      <pa-button block @click="countToRef5?.start">开始</pa-button>
      <pa-button block @click="countToRef5?.pause">暂停</pa-button>
      <pa-button block @click="countToRef5?.resume">继续</pa-button>
      <pa-button block @click="countToRef5?.reset">重置</pa-button>
      <pa-button block @click="countToRef5?.restart">重新开始</pa-button>
    </view>
  </DocDemoBlock>
  <pa-safe-bottom />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type CountTo from '../count-to/count-to.vue'

const countToRef = ref<InstanceType<typeof CountTo>>()
const countToRef2 = ref<InstanceType<typeof CountTo>>()
const countToRef3 = ref<InstanceType<typeof CountTo>>()
const countToRef4 = ref<InstanceType<typeof CountTo>>()
const countToRef5 = ref<InstanceType<typeof CountTo>>()
</script>

<style lang="scss" scoped></style>
