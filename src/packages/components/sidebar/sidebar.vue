<template>
  <view :class="[ns.b(), customClass]" :style="customStyle">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { provide, ref, toRefs } from 'vue'
import { useNamespace } from '../../core'
import { useSelect } from '../../core/useSelect'
import type { SidebarItemInstance } from '../sidebar-item/sidebar-item.vue'
import { sidebarEmits, sidebarProps } from './props'

export type SidebarValue = string | number

export interface SidebarProvideData {
  setChildren: (node: SidebarItemInstance) => void
  onSelect: (value: SidebarValue) => void
  isSelected: (value: SidebarValue) => boolean
}

const ns = useNamespace('sidebar')

const props = defineProps(sidebarProps)
const emit = defineEmits(sidebarEmits)

const { modelValue } = toRefs(props)
const children = ref<SidebarItemInstance[]>([])

const { onSelect, isSelected } = useSelect({ defaultValue: modelValue })

const setChildren = (node: SidebarItemInstance) => {
  node.index.value = children.value.length
  children.value.push(node as any)
}

const onChildSelect = (value: SidebarValue) => {
  onSelect(value)
  emit('update:modelValue', value)
  emit('change', value)
}

provide<SidebarProvideData>(`${ns.b()}-provide`, {
  setChildren,
  onSelect: onChildSelect,
  isSelected,
})
</script>

<style lang="scss" scoped>
@import './sidebar.scss';
</style>
