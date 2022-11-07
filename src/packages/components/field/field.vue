<template>
  <Cell :class="computedClass('field', { 'only-input': onlyInput })" v-bind="$props">
    <view :class="computedClass('field__body')">
      <input
        :class="computedClass('field__input')"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :placeholder-style="`color:var(--${PREFIX}-color-text-black-3)`"
        :style="{ textAlign: valueAlign }"
        @input="onInput"
        @blur="emit('blur', $event)"
        @confirm="emit('confirm', $event)"
      />
    </view>
  </Cell>
</template>

<script lang="ts" setup>
import { EventDetail } from '../../types'
import { computedClass, PREFIX } from '../../utils/style'
import Cell from '../cell/cell.vue'
import { CellProps } from '../cell/cell.vue'

export interface FieldProps
  extends Pick<
    CellProps,
    'title' | 'titleWidth' | 'required' | 'icon' | 'center' | 'errorMessage'
  > {
  modelValue?: string
  /** 输入框类型 */
  type?: 'text' | 'number' | 'idcard' | 'textarea' | 'digit'
  /** 值对齐方式 */
  valueAlign?: CellProps['valueAlign']
  /** 输入提示 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只用输入框（主要用于表单情况） */
  onlyInput?: boolean
}

withDefaults(defineProps<FieldProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '请输入',
  valueAlign: 'right',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'input', value: string): void
  (event: 'blur', value: FocusEvent): void
  (event: 'confirm', value: EventDetail<{ value: string }>): void
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
  .#{$prefix}-field__input {
    color: _var(field-input-color);
  }
  &.#{$prefix}-only-input {
    @include _setVar(cell-padding-y, 0);
    @include _setVar(cell-padding-x, 0);
  }
}
</style>
