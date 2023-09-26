<template>
  <view :class="[ns.b(), ns.is('border', props.border)]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { provide, ref, watch, type Ref } from 'vue'
import useNamespace from '../../core/useNamespace'
import type { CollapseItemInstance } from '../collapse-item/collapse-item.vue'
import type { CollapseItemValue } from '../collapse-item/props'
import { collapseEmits, collapseProps } from './props'

export interface CollapseProvideData {
  modelValue: Ref<CollapseItemValue[]>
  setChildren: (node: CollapseItemInstance) => void
  onChildExpand: (name: CollapseItemValue, expanded: boolean) => void
}

const ns = useNamespace('collapse')

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const children = ref<CollapseItemInstance[]>([])
const expandedValues = ref<CollapseItemValue[]>([])

const setChildren = (node: CollapseItemInstance) => {
  node.index.value = children.value.length
  children.value.push(node as any)
}

const onChildExpand = (name: CollapseItemValue, expanded: boolean) => {
  const values = props.accordion
    ? name
    : children.value.flatMap((node) => {
        const nodeId = node.name ?? node.index
        const nodeExpanded = nodeId === name ? expanded : node.expanded
        return nodeExpanded ? nodeId : []
      })
  const newModelValue = values
  expandedValues.value = Array.isArray(newModelValue) ? newModelValue : [newModelValue]
  emit('update:modelValue', newModelValue)
  emit('change', newModelValue)

  if (expanded) {
    emit('open', name)
  } else {
    emit('close', name)
  }
}

/**
 * 切换所有面板展开状态，传 true 为全部展开，false 为全部收起，不传参为全部切换
 */
const toggleAll = (options: boolean | { expanded: boolean; skipDisabled: boolean }) => {
  children.value.forEach((node) => {
    if (typeof options === 'boolean') {
      node?.toggle(options)
    } else {
      // 跳过禁用的复选框
      if (options.skipDisabled && node.disabled) return
      node?.toggle(options.expanded)
    }
  })
}

watch(
  () => props.modelValue,
  (value) => {
    expandedValues.value = Array.isArray(value) ? value : value ? [value] : []
  },
  {
    immediate: true,
  },
)

provide<CollapseProvideData>(`${ns.b()}-provide`, {
  modelValue: expandedValues,
  setChildren,
  onChildExpand,
})

defineExpose({
  toggleAll,
})
</script>

<style lang="scss">
@import './collapse.scss';
</style>
