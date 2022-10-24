<template>
  <Cell :class="computedClass('field')" v-bind="$props">
    <view :class="computedClass('field__body')">
      <input
        :class="computedClass('field__input')"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :placeholder-style="`color:var(--${PREFIX}-color-text-black-3)`"
        :style="{ textAlign: valueAlign }"
        @input="onInput"
        @blur="emit('blur', $event as unknown as EventDetail<string>)"
      />
    </view>
  </Cell>
</template>

<script lang="ts" setup>
import { EventDetail } from '../../types'
import { computedClass, PREFIX } from '../../utils/style'
import Cell from '../cell/cell.vue'
import { CellProps } from '../cell/cell.vue'

interface OwnProps
  extends Pick<
    CellProps,
    'title' | 'titleWidth' | 'required' | 'icon' | 'center' | 'valueAlign' | 'errorMessage'
  > {
  modelValue?: string
  type?: 'text' | 'number' | 'idcard' | 'textarea' | 'digit'
  placeholder?: string
  disabled?: boolean
}

withDefaults(defineProps<OwnProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  valueAlign: 'right',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'input', value: string): void
  (event: 'blur', value: EventDetail<string>): void
}>()

const onInput = (payload: Event) => {
  const value = (payload as unknown as EventDetail<{ value: string }>).detail.value
  emit('update:modelValue', value)
  emit('input', value)
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-field {
}
.#{$prefix}-field__input {
  color: _var(color-text-black);
}
</style>
