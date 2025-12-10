<template>
  <view :class="[ns.b(), ns.m(direction)]">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { provide, toRefs, type Ref } from 'vue'
import { useNamespace } from '@papayaui/core'
import { useSelect } from '@papayaui/core'
import type { RadioValue } from '../radio/props'
import { radioGroupEmits, radioGroupProps } from './props'

export interface RadioProvideData {
  disabled?: Ref<boolean>
  onSelect: (name: RadioValue) => void
  isSelected: (name: RadioValue) => boolean
}

const ns = useNamespace('radio-group')

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const { modelValue, disabled } = toRefs(props)

const { onSelect, isSelected } = useSelect({ defaultValue: modelValue })

const onChildSelect = (value: RadioValue) => {
  onSelect(value)
  emit('update:modelValue', value)
  emit('change', value, props.name)
}

provide<RadioProvideData>(`${ns.b()}-provide`, {
  disabled,
  onSelect: onChildSelect,
  isSelected,
})
</script>

<style lang="scss">
@import './radio-group.scss';
</style>
