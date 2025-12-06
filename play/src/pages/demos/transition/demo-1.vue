<template>
  <view style="width: 100px; height: 100px">
    <pa-transition :show="show" :mode="mode">
      <view style="width: 100px; height: 100px; background-color: #009c5d"></view>
    </pa-transition>
  </view>

  <view class="grid grid-cols-2 gap-30 mt-30">
    <pa-button v-for="modeKey in modeList" :key="modeKey" block @click="onShow(modeKey)">
      {{ modeKey }}
    </pa-button>
  </view>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { TransitionMode } from 'papayaui'

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
