<template>
  <view
    :class="[
      ns.b(),
      ns.is('border', index !== 0 && props.border),
      ns.is('expanded', expanded),
      ns.is('disabled', disabled),
      ns.is('readonly', readonly),
    ]"
  >
    <Cell
      :class="ns.e('title')"
      :name="name"
      :title="title"
      :icon="icon"
      :value="value"
      :is-link="isLink && !disabled"
      :border="border"
      @click.stop="onClick"
    >
      <template #title>
        <slot v-if="$slots.title" name="title" />
        <text>{{ title }}</text>
      </template>
      <template #default>
        <slot v-if="$slots.default" name="value" />
        <text>{{ value }}</text>
      </template>
    </Cell>
    <view :class="ns.e('wrapper')" :animation="wrapperAnimation">
      <view :class="ns.e('content')">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, type CSSProperties } from 'vue'
import { useNamespace } from '@papayaui/core'
import { useRect } from '../../hooks'
import { getParentInstance } from '@papayaui/utils'
import Cell from '../cell/cell.vue'
import type { CollapseExpose, CollapseProps } from '../collapse'
import { collapseItemProps, type CollapseItemValue } from './props'

const ns = useNamespace('collapse-item')

const props = defineProps(collapseItemProps)

const instance = getCurrentInstance()
const parent = getParentInstance<CollapseProps, CollapseExpose>(instance, 'collapse')

const index = ref<number | undefined>()
const name = computed(() => props.name ?? index.value ?? 0)
const expanded = ref(false)
const wrapperAnimation = ref<CSSProperties>()
let animating = false

const getRect = () => {
  if (!instance) return Promise.resolve(null)
  return useRect(instance, `.${ns.e('content')}`)
}

const updateExpanded = () => {
  if (!parent || animating) return

  const parentVal = parent.exposed.modelValue.value
  const newExpanded = parent.props.accordion
    ? parentVal === name.value
    : (parentVal as CollapseItemValue[]).includes(name.value)
  if (newExpanded !== expanded.value) {
    setContentAnimate(newExpanded)
  }
  expanded.value = newExpanded
}

const setContentAnimate = async (show: boolean, duration = 300) => {
  const rect = await getRect()
  if (!rect) return

  animating = true
  const animation = uni.createAnimation({
    duration: 0,
    timingFunction: 'ease-in-out',
  })
  if (show) {
    animation.height(rect.height).step({
      duration,
    })
    animation.height('auto').step()
  } else {
    animation.height(rect.height).step()
    // TODO: 这里第二步动画需要延迟执行，否则执行后无效果
    setTimeout(() => {
      animation.height(0).step({
        duration,
      })
      wrapperAnimation.value = animation.export()
    }, 16)
  }
  wrapperAnimation.value = animation.export()
  setTimeout(() => {
    animating = false
  }, duration)
}

const onClick = () => {
  if (props.disabled || props.readonly) return
  parent?.exposed.onChange(name.value, !expanded.value)
}

const init = () => {
  if (parent && parent.exposed) {
    // 操作父组件的children对象，按照添加顺序记录子组件的index
    index.value = parent.exposed.children.value.length
    parent.exposed.children.value.push({
      name,
      expanded,
      updateExpanded,
    })
  }
}

onMounted(() => {
  init()
  updateExpanded()
})

defineExpose({
  updateExpanded,
  setContentAnimate,
})
</script>

<style lang="scss">
@import './collapse-item.scss';
</style>
