<template>
  <view :class="ns.b()" :style="{ top: indexBarProvide.stickyOffsetTop }">{{ index }}</view>
</template>

<script setup lang="ts">
import { noop } from '../../utils'
import { getCurrentInstance, inject, onMounted } from 'vue'
import { useNamespace } from '../../core'
import { useRect } from '../../hooks'
import type { IndexBarProvideData } from '../index-bar/index-bar.vue'
import { indexAnchorProps } from './props'

const ns = useNamespace('index-anchor')

const instance = getCurrentInstance()

defineProps(indexAnchorProps)

const indexBarProvide = inject<IndexBarProvideData>(`${ns.namespace}-index-bar-provide`, {
  stickyOffsetTop: 0,
  setOffsetTop: noop,
})

const getOffsetTop = () => {
  if (!instance) return
  useRect(instance, `.${ns.namespace}-index-anchor`).then((node) => {
    if (node) {
      indexBarProvide.setOffsetTop(node.top)
    }
  })
}

onMounted(() => {
  getOffsetTop()
})
</script>

<style lang="scss" scoped>
@import './index-anchor.scss';
</style>
