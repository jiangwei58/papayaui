<template>
  <input
    :class="[computedClass('number-input'), { disabled }]"
    :style="{ textAlign: align }"
    :placeholder="placeholder"
    :value="modelValue"
    :type="precision ? 'digit' : 'number'"
    :placeholder-class="computedClass('number-input-placeholder')"
    :disabled="disabled"
    :focus="focus"
    :auto-blur="autoBlur"
    @input="onInput"
    @blur="onBlur"
    @focus="onFocus"
  />
</template>

<script lang="ts" setup>
import { EventDetail } from '../../types'
import { nextTick } from 'vue'
import { computedClass } from '../../utils/style'

export interface NumberInputProps {
  modelValue?: string | number | undefined
  /** 是否禁用 */
  disabled?: boolean
  /** 输入提示 */
  placeholder?: string
  /** 内容对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 整数位长度 */
  intLength?: number
  /** 小数位长度 */
  precision?: number
  /** 获取焦点 */
  focus?: boolean
  /** 键盘收起时，是否自动失去焦点 */
  autoBlur?: boolean
}

const props = withDefaults(defineProps<NumberInputProps>(), {
  modelValue: '',
  disabled: false,
  placeholder: '请输入',
  align: 'left',
  min: undefined,
  max: undefined,
  precision: 0,
  intLength: Number.MAX_SAFE_INTEGER.toString().length,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (
    event: 'focus',
    value: EventDetail<{ value: NumberInputProps['modelValue']; height: number }>,
  ): void
}>()

const minAndMax = (val: number) => {
  if (typeof props.min !== 'undefined') {
    val = Math.max(props.min, val)
  }
  if (typeof props.max !== 'undefined') {
    val = Math.min(props.max, val)
  }
  return val
}

const onInput = (e: any) => {
  const detail = (e as EventDetail<{ cursor: number; keyCode: number; value: string }>).detail
  let val = detail.value
  // 根据整数位和小数位处理值
  val = val.replace(/[^\d.]/g, '')
  const valSplit = val.split('.').slice(0, 2)
  valSplit[0] = valSplit[0].slice(0, props.intLength)
  if (typeof valSplit[1] !== 'undefined' && props.precision) {
    valSplit[1] = valSplit[1].slice(0, props.precision)
  } else {
    valSplit.splice(1, 1)
  }
  return valSplit.join('.')
}

const onBlur = async (e: any) => {
  let val = (e as EventDetail<{ value: string }>).detail.value
  if (val) {
    const numberVal = parseFloat(val)
    const result = minAndMax(numberVal)
    // 防止处理后modelValue前后值一样视图不更新
    if (result === parseFloat(props.modelValue.toString()) && result !== numberVal) {
      emit('update:modelValue', numberVal.toFixed(props.precision))
      await nextTick()
    }
    val = result.toFixed(props.precision)
  }
  emit('update:modelValue', val)
}

const onFocus = (e: FocusEvent) => {
  emit(
    'focus',
    e as unknown as EventDetail<{ value: NumberInputProps['modelValue']; height: number }>,
  )
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-number-input {
  background-color: initial;
  border: 0;
  box-sizing: border-box;
  color: _var(number-input-text-color);
  height: 48rpx;
  line-height: inherit;
  margin: 0;
  min-height: 48rpx;
  padding: 0;
  position: relative;
  resize: none;
  width: 100%;
  &.disabled {
    @include _setVar(number-input-text-color, _var(number-input-disabled));
  }
  :deep(.#{$prefix}-number-input-placeholder) {
    color: _var(number-input-placeholder-color);
  }
}
</style>
