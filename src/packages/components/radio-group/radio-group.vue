<template>
  <view :class="[ns.b(), ns.m(direction)]">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { provide, toRefs } from 'vue'
import useNamespace from '../../core/useNamespace'
import useSelect from '../../core/useSelect'
import { RadioValue } from '../radio/props'
import { radioGroupEmits, radioGroupProps } from './props'

export interface RadioProvideData {
  disabled?: boolean
  onSelect: (name: RadioValue) => void
  isSelected: (name: RadioValue) => boolean
}

const ns = useNamespace('radio-group')

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const { modelValue } = toRefs(props)

const { onSelect, isSelected } = useSelect({ defaultValue: modelValue })

const onChildSelect = (value: RadioValue) => {
  onSelect(value)
  emit('update:modelValue', value)
  emit('change', value, props.name)
}

provide<RadioProvideData>('radioData', {
  disabled: props.disabled,
  onSelect: onChildSelect,
  isSelected,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-radio-group {
  &--horizontal {
    @include _setVar(radio-display, inline-flex);
    @include _setVar(radio-margin, 0 16px 0 0);
  }
  &--vertical {
    @include _setVar(radio-margin, 0 0 8px);
  }
}
</style>
