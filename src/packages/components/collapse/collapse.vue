<template>
  <view :class="[ns.b(), ns.is('border', props.border)]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import type { CollapseItemInstance } from '../collapse-item/collapse-item.vue'
import { collapseEmits, collapseProps } from './props'

export interface CollapseProvideData {
  setChildren: (node: CollapseItemInstance) => void
  onChildExpand: (index: number, expanded: boolean) => void
}

const ns = useNamespace('collapse')

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const children = ref<CollapseItemInstance[]>([])

const setChildren = (node: CollapseItemInstance) => {
  node.index.value = children.value.length
  children.value.push(node as any)
}

const onChildExpand = (index: number, expanded: boolean) => {
  if (props.accordion && expanded) {
    children.value.forEach((node, nodeIndex) => {
      if (nodeIndex !== index && node.expanded) {
        node?.toggle(false)
      }
    })
  }

  const values = children.value.flatMap((node) => {
    const nodeExpanded = node.index === index ? expanded : node.expanded
    return nodeExpanded ? node.name ?? node.index : []
  })
  emit('update:modelValue', props.accordion ? values[0] : values)
  emit('change', props.accordion ? values[0] : values)

  if (expanded) {
    emit('open', children.value[index].name ?? index)
  } else {
    emit('close', children.value[index].name ?? index)
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

provide<CollapseProvideData>(`${defaultNamespace}-collapse-provide`, {
  setChildren,
  onChildExpand,
})

defineExpose({
  toggleAll,
})
</script>

<style lang="scss" scoped>
@import './collapse.scss';
</style>
