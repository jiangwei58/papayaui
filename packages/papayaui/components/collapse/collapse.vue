<template>
  <view :class="[ns.b(), ns.is('border', props.border)]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@papayaui/core'
import type { CollapseItemInstance, CollapseItemValue } from '../collapse-item/props'
import { collapseEmits, collapseProps } from './props'

const ns = useNamespace('collapse')

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const children = ref<CollapseItemInstance[]>([])
const expandedValue = ref<CollapseItemValue | CollapseItemValue[]>('')

const _modelValue = computed({
  get() {
    return props.modelValue ?? expandedValue.value
  },
  set(val) {
    expandedValue.value = val
    emit('update:modelValue', val)
  },
})

const updateExpanded = () => {
  children.value.forEach((child) => {
    child.updateExpanded()
  })
}

const onChange = (name: CollapseItemValue, expanded: boolean) => {
  const newModelValue = props.accordion
    ? expanded
      ? name
      : ''
    : children.value.flatMap((child) => {
        const nodeExpanded = child.name === name ? expanded : child.expanded
        return nodeExpanded ? child.name : []
      })
  _modelValue.value = newModelValue
  emit('change', newModelValue)

  if (expanded) {
    emit('open', name)
  } else {
    emit('close', name)
  }
}

watch(
  _modelValue,
  () => {
    updateExpanded()
  },
  {
    immediate: true,
  },
)

defineExpose({
  children,
  modelValue: _modelValue,
  onChange,
})
</script>

<style lang="scss">
@import './collapse.scss';
</style>
