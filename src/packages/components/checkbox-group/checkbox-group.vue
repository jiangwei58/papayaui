<template>
  <view :class="[ns.b(), ns.m(direction)]">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { provide, toRefs, type Ref } from 'vue'
import useNamespace from '../../core/useNamespace'
import { useSelect } from '../../core/useSelect'
import type { CheckboxValue } from '../checkbox/props'
import { checkboxGroupEmits, checkboxGroupProps } from './props'

export interface CheckboxProvideData {
  disabled?: Ref<boolean>
  onSelect: (name: CheckboxValue) => void
  isSelected: (name: CheckboxValue) => boolean
}

export type CheckboxOption = {
  name: CheckboxValue
}

const ns = useNamespace('checkbox-group')

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)

const { modelValue, max, disabled } = toRefs(props)

const { selectedValues, onSelect, isSelected } = useSelect<CheckboxOption, CheckboxValue>({
  defaultValue: modelValue,
  multiple: true,
  max,
})

const onChildSelect = (value: CheckboxValue) => {
  onSelect(value)
  emit('update:modelValue', selectedValues.value as CheckboxValue[])
  emit('change', selectedValues.value as CheckboxValue[], props.name)
}

provide<CheckboxProvideData>(`${ns.b()}-provide`, {
  disabled,
  onSelect: onChildSelect,
  isSelected,
})
</script>

<style lang="scss">
@import './checkbox-group.scss';
</style>
