<template>
  <scroll-view :class="ns.b()" scroll-y :scroll-top="scrollTop" @scroll="onThrottleScroll">
    <view :class="ns.e('sidebar')">
      <text
        v-for="(text, index) in sidebarList"
        :key="index"
        :class="[ns.e('index'), ns.is('index-active', sidebarActive === index)]"
        @click="onSelectActive(index)"
      >
        {{ text }}
      </text>
    </view>
    <slot />
  </scroll-view>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { useNamespace } from '../../core'
import type { EventDetail } from '../../types'
import { throttle } from '../../utils'
import type { IndexBarProps } from './props'
import { indexBarProps } from './props'

export interface IndexBarProvideData {
  stickyOffsetTop: IndexBarProps['stickyOffsetTop']
  setOffsetTop: (offsetTop: number) => void
}

const ns = useNamespace('index-bar')

const props = defineProps(indexBarProps)

const offsetTopList = ref<number[]>([])
const sidebarActive = ref<number>(0)
const scrollTop = ref<number>(0)

const sidebarList = computed(() => {
  return props.indexList.length ? props.indexList : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
})

const setAnchorOffsetTop = (offsetTop: number) => {
  offsetTopList.value.push(offsetTop)
}

const onScroll = (e: EventDetail<{ scrollTop: number }>) => {
  let current = 0
  const scrollTop = e.detail.scrollTop
  for (let i = 0; i < offsetTopList.value.length; i++) {
    if (scrollTop >= offsetTopList.value[i] - 10) {
      current = i
    }
  }
  sidebarActive.value = current
}
const onThrottleScroll = throttle(onScroll, 100)

const onSelectActive = (index: number) => {
  scrollTop.value = offsetTopList.value[index]
}

provide<IndexBarProvideData>(`${ns.b()}-provide`, {
  stickyOffsetTop: props.stickyOffsetTop,
  setOffsetTop: setAnchorOffsetTop,
})
</script>

<style lang="scss" scoped>
@import './index-bar.scss';
</style>
