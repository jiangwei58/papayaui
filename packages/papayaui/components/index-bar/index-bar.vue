<template>
  <scroll-view :class="ns.b()" scroll-y :scroll-top="scrollTop" @scroll="onThrottleScroll">
    <view :class="ns.e('sidebar')" @touchmove.stop="onTouchmove">
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
import { computed, getCurrentInstance, onMounted, provide, ref } from 'vue'
import { useNamespace } from '@papayaui/core'
import { useRect } from '../../hooks'
import type { EventDetail } from '@papayaui/types'
import { throttle } from '@papayaui/utils'
import type { IndexBarProps } from './props'
import { indexBarProps } from './props'

export interface IndexBarProvideData {
  stickyOffsetTop: IndexBarProps['stickyOffsetTop']
  setOffsetTop: (offsetTop: number) => void
}

const ns = useNamespace('index-bar')

const props = defineProps(indexBarProps)

const instance = getCurrentInstance()

const offsetTopList = ref<number[]>([])
const sidebarOffsetTopList = ref<number[]>([])
const sidebarActive = ref<number>(0)
const scrollTop = ref<number>(0)

const sidebarList = computed(() => {
  return props.indexList.length ? props.indexList : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
})

const setAnchorOffsetTop = (offsetTop: number) => {
  offsetTopList.value.push(offsetTop)
}

const getSidebarOffsetTop = () => {
  if (!instance) return
  useRect(instance, `.${ns.e('index')}`, true).then((nodes) => {
    if (nodes.length) {
      sidebarOffsetTopList.value = nodes.map((node) => node.top)
    }
  })
}

const setSidebarActive = (scrollTop: number) => {
  let current = 0
  for (let i = 0; i < offsetTopList.value.length; i++) {
    if (scrollTop >= offsetTopList.value[i] - 10) {
      current = i
    }
  }
  sidebarActive.value = current
}

const onScroll = (e: EventDetail<{ scrollTop: number }>) => {
  setSidebarActive(e.detail.scrollTop)
}
const onThrottleScroll = throttle(onScroll, 100)

const onTouchmove = (e: TouchEvent) => {
  const pageY = e.changedTouches[0].pageY
  let current = 0
  for (let i = 0; i < sidebarOffsetTopList.value.length; i++) {
    if (pageY >= sidebarOffsetTopList.value[i] - 10) {
      current = i
    }
  }
  onSelectActive(current)
}

const onSelectActive = (index: number) => {
  scrollTop.value = offsetTopList.value[index]
}

onMounted(() => {
  getSidebarOffsetTop()
})

provide<IndexBarProvideData>(`${ns.b()}-provide`, {
  stickyOffsetTop: props.stickyOffsetTop,
  setOffsetTop: setAnchorOffsetTop,
})
</script>

<style lang="scss">
@import './index-bar.scss';
</style>
