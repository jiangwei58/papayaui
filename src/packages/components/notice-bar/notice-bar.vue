<template>
  <view
    v-if="show"
    :class="[ns.b(), ns.is('wrapable', wrapable), ns.is('scrollable', scrollable ?? _scrollable)]"
    :style="ns.style({ color, backgroundColor: background })"
    @click="emit('click', $event)"
  >
    <IconComponent v-if="leftIcon" :class="ns.e('left-icon')" :name="leftIcon" />
    <slot name="left-icon" :class="ns.e('left-icon')" />
    <view :class="ns.e('wrap')">
      <view :class="ns.e('content')" :style="contentStyle">
        {{ text }}
        <slot v-if="!text" />
      </view>
    </view>
    <IconComponent
      v-if="mode"
      :class="ns.e('right-icon')"
      :name="rightIconName"
      @click.stop="onClose"
    />
    <slot name="right-icon" />
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { useNamespace } from '../../core'
import { useRect } from '../../hooks'
import IconComponent from '../icon/icon.vue'
import { noticeBarProps, noticeBarEmits } from './props'

const ns = useNamespace('notice-bar')

const props = defineProps(noticeBarProps)
const emit = defineEmits(noticeBarEmits)

const instance = getCurrentInstance()

const show = ref(true)
const _scrollable = ref(false)
const _animationDuration = ref(10)

const rightIconName = computed(() => {
  if (!props.mode) return ''
  return {
    closeable: 'close',
    link: 'right',
  }[props.mode]
})

const contentStyle = computed(() => {
  if (!_scrollable.value) return {}
  return {
    animationDuration: `${_animationDuration.value}s`,
    animationDelay: `${props.delay}ms`,
  }
})

const updateScrollable = () => {
  if (!instance || props.scrollable === false) return
  useRect(instance, `.${ns.e('wrap')}`).then((wrapNode) => {
    if (!wrapNode) return
    useRect(instance, `.${ns.e('content')}`).then((node) => {
      if (!node) return
      _scrollable.value = node.width > wrapNode.width
      _animationDuration.value = (node.width + wrapNode.width) / props.speed
    })
  })
}

const onClose = () => {
  show.value = false
  emit('close')
}

watch(
  () => props.text,
  () => {
    updateScrollable()
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
@import './notice-bar.scss';
</style>
