<template>
  <DocDemoBlock title="演示" card>
    <view style="width: 100px; height: 100px">
      <pa-transition :show="show" :mode="mode">
        <view style="width: 100px; height: 100px; background-color: #009c5d"></view>
      </pa-transition>
    </view>
  </DocDemoBlock>
  <DocDemoBlock title="基础用法" card>
    <view class="grid grid-cols-2 gap-30">
      <pa-button v-for="modeKey in modeList" :key="modeKey" block @click="onShow(modeKey)">
        {{ modeKey }}
      </pa-button>
    </view>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import type { TransitionMode } from './props'

const show = ref<boolean>(true)
const mode = ref<TransitionMode>('fade')

const modeList = ref<TransitionMode[]>([
  'fade',
  'zoom',
  'fade-zoom',
  'fade-up',
  'fade-down',
  'fade-left',
  'fade-right',
  'slide-up',
  'slide-down',
  'slide-left',
  'slide-right',
])

const onShow = async (newMode: TransitionMode) => {
  mode.value = newMode
  show.value = false
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
  await nextTick()
  show.value = true
}
</script>

<style lang="scss" scoped></style>
