<template>
  <view :class="[ns.b(), customClass]" :style="customStyle">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { toRefs, SVGAttributes } from 'vue'
import useNamespace from '../../core/useNamespace'
import useSelect from '../../core/useSelect'

export interface SidebarProps {
  /** 选择项值 */
  modelValue?: SidebarValue
  /** 根节点样式类 */
  customClass?: string
  /** 根节点样式 */
  customStyle?: SVGAttributes['style']
}

export type SidebarValue = string | number

export interface SidebarExposeData {
  onSelect: (value: SidebarValue) => void
  isSelected: (value: SidebarValue) => boolean
}

const ns = useNamespace('sidebar')

const props = defineProps<SidebarProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: SidebarValue): void
  (event: 'change', value: SidebarValue): void
}>()

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
@import '../../styles/vars.scss';

.#{$prefix}-sidebar {
  width: _var(sidebar-width, 80px);
  overflow-y: auto;
}
</style>
