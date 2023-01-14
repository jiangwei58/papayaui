<template>
  <view :class="computedClass('checkbox-group', { [`checkbox-group--${direction}`]: true })">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { provide, toRefs } from 'vue'
import useSelect from '../../core/useSelect'
import { computedClass } from '../../utils/style'
import { CheckboxValue } from '../checkbox/checkbox.vue'

export interface CheckboxGroupProps {
  /** 标识符 */
  name?: string
  /** 值 */
  modelValue?: CheckboxValue[]
  /** 方向 */
  direction?: 'horizontal' | 'vertical'
  /** 是否全部禁用 */
  disabled?: boolean
  /** 限制选择的数量 */
  max?: number
}

export interface CheckboxProvideData {
  disabled?: boolean
  onSelect: (name: CheckboxValue) => void
  isSelected: (name: CheckboxValue) => boolean
}

export type CheckboxOption = {
  name: CheckboxValue
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  name: '',
  modelValue: undefined,
  direction: 'vertical',
  disabled: false,
  max: undefined,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: CheckboxValue[]): void
  (event: 'change', value: CheckboxValue[], name: string): void
}>()

const { modelValue, max } = toRefs(props)

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

provide<CheckboxProvideData>('checkboxData', {
  disabled: props.disabled,
  onSelect: onChildSelect,
  isSelected,
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-checkbox-group {
  &--horizontal {
    @include _setVar(checkbox-display, inline-flex);
    @include _setVar(checkbox-margin, 0 16px 0 0);
  }
  &--vertical {
    @include _setVar(checkbox-margin, 0 0 8px);
  }
}
</style>
