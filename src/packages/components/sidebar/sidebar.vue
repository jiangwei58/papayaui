<template>
  <view :class="[ns.b(), customClass]" :style="customStyle">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import useNamespace from '../../core/useNamespace'
import useSelect from '../../core/useSelect'
import { sidebarEmits, sidebarProps } from './props'

export type SidebarValue = string | number

export interface SidebarExposeData {
  onSelect: (value: SidebarValue) => void
  isSelected: (value: SidebarValue) => boolean
}

const ns = useNamespace('sidebar')

const props = defineProps(sidebarProps)
const emit = defineEmits(sidebarEmits)

const { modelValue } = toRefs(props)

const { onSelect, isSelected } = useSelect({ defaultValue: modelValue })

const onChildSelect = (value: SidebarValue) => {
  onSelect(value)
  emit('update:modelValue', value)
  emit('change', value)
}

defineExpose<SidebarExposeData>({
  onSelect: onChildSelect,
  isSelected,
})
</script>

<style lang="scss" scoped>
@import './sidebar.scss';
</style>
