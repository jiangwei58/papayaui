<template>
  <view :class="[ns.b(), ns.is('active', isActive)]" :style="customStyle">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, toRefs } from 'vue'
import { useNamespace } from '../../core'
import { getParentInstance } from '../../utils/component'
import type { TabsExpose, TabsProps } from '../tabs/props'
import { tabPaneProps } from './props'

const ns = useNamespace('tab__pane')

const props = defineProps(tabPaneProps)

const { title, disabled } = toRefs(props)

const instance = getCurrentInstance()
const parent = getParentInstance<TabsProps, TabsExpose>(instance, 'tabs')

const index = ref<number | undefined>()

const name = computed(() => {
  return props.name ?? index.value ?? 0
})

const isActive = computed(() => {
  return name.value === parent?.props.modelValue
})

const customStyle = computed(() => {
  if (parent?.props.animated) return
  return {
    display: isActive.value ? 'block' : 'none',
  }
})

const init = () => {
  if (parent && parent.exposed) {
    // 操作父组件的children对象，按照添加顺序记录子组件的index
    index.value = parent.exposed.children.value.length
    parent.exposed.children.value.push({
      name,
      title,
      disabled,
    })
  }
}

init()
</script>

<style lang="scss">
@import './tab-pane.scss';
/* #ifdef MP */
:host {
  width: 100%;
  flex-shrink: 0;
}
/* #endif */
</style>
