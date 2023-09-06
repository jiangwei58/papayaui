<template>
  <view :class="ns.b()" :style="{ backgroundColor: bgColor }">
    <sticky v-if="useHeaderSlot" :z-index="_zIndex">
      <view :class="ns.b('header')" :style="{ backgroundColor: headerBgColor }">
        <slot name="header"></slot>
      </view>
    </sticky>

    <view
      :class="ns.b('body')"
      :style="{
        height: partialContent ? `calc(100vh - ${headerHeight}px - ${bottomHeight}px)` : 'auto',
      }"
    >
      <slot></slot>

      <watermark v-if="showWatermark" :contents="watermarkContents" />
    </view>

    <view
      :class="ns.is('safe-bottom', !isExistFooter && safeBottom)"
      :style="{ height: bottomHeight + 'px' }"
    />
    <view
      v-if="isExistFooter"
      :class="ns.b('bottom-fixed')"
      :style="ns.style({ zIndex: _zIndex - 1 })"
    >
      <slot name="bottom"></slot>
      <SafeBottom v-if="safeBottom" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref, useSlots, watch } from 'vue'
import useNamespace from '../../core/useNamespace'
import useRect from '../../hooks/useRect'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import sticky from '../sticky/sticky.vue'
import watermark from '../watermark/watermark.vue'
import { containerProps } from './props'

const ns = useNamespace('container')

const props = defineProps(containerProps)

const slots = useSlots()

const headerHeight = ref<number>(0)
const bottomHeight = ref<number>(0)

const internalInstance = getCurrentInstance()

const _zIndex = computed(() => {
  return props.zIndex ?? 99
})

const isExistFooter = computed(() => {
  return props.useFooterSlot && !!slots.bottom
})

const updateHeight = () => {
  nextTick(() => {
    if (!internalInstance) return
    useRect(internalInstance, `.${ns.b('header')}`).then((res) => {
      headerHeight.value = res ? res.height : 0
    })
    useRect(internalInstance, `.${ns.b('bottom-fixed')}`).then((res) => {
      bottomHeight.value = res ? res.height : 0
    })
  })
}

onMounted(() => {
  updateHeight()
})

watch([() => props.useHeaderSlot, () => props.useFooterSlot], () => {
  updateHeight()
})

defineExpose({
  updateHeight,
})
</script>

<style lang="scss" scoped>
@import './container.scss';
</style>
