<template>
  <view :class="computedClass('radio-group', { [`radio-group--${direction}`]: true })">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { provide, toRefs } from 'vue'
import useSelect from '../../core/useSelect'
import { computedClass } from '../../utils/style'
import { RadioValue } from '../radio/radio.vue'

export interface RadioGroupProps {
  /** 标识符 */
  name?: string
  /** 值 */
  modelValue?: RadioValue
  /** 方向 */
  direction?: 'horizontal' | 'vertical'
  /** 是否全部禁用 */
  disabled?: boolean
}

export interface RadioProvideData {
  disabled?: boolean
  onSelect: (name: RadioValue) => void
  isSelected: (name: RadioValue) => boolean
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  name: '',
  modelValue: undefined,
  direction: 'vertical',
  disabled: false,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: RadioValue): void
  (event: 'change', value: RadioValue, name: string): void
}>()

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
