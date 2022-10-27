<template>
  <input
    :class="[computedClass('number-input'), { disabled }]"
    :style="{ textAlign: align }"
    :placeholder="placeholder"
    :value="modelValue"
    :type="precision ? 'digit' : 'number'"
    :placeholder-class="computedClass('number-input-placeholder')"
    :disabled="disabled"
    @input="onInput"
    @blur="onBlur"
  />
</template>

<script lang="ts" setup>
import { EventDetail } from '../../types'
import { nextTick, toRefs } from 'vue'
import { computedClass } from '../../utils/style'

interface OwnProps {
  modelValue?: string | number | undefined
  disabled?: boolean
  placeholder?: string
  align?: 'left' | 'center' | 'right'
  min?: number // 最小值
  max?: number // 最大值
  intLength?: number // 整数位长度
  precision?: number // 小数位长度
}

const props = withDefaults(defineProps<OwnProps>(), {
  modelValue: '',
  disabled: false,
  placeholder: '请输入',
  align: 'left',
  min: undefined,
  max: undefined,
  precision: 0,
  intLength: Number.MAX_SAFE_INTEGER.toString().length,
})

const { modelValue, placeholder, precision, intLength, min, max } = toRefs(props)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const minAndMax = (val: number) => {
  if (typeof min.value !== 'undefined') {
    val = Math.max(min.value, val)
  }
  if (typeof max.value !== 'undefined') {
    val = Math.min(max.value, val)
  }
  return val
}

const onInput = (e: any) => {
  const detail = (e as EventDetail<{ cursor: number; keyCode: number; value: string }>).detail
  let val = detail.value
  // 根据整数位和小数位处理值
  val = val.replace(/[^\d.]/g, '')
  const valSplit = val.split('.').slice(0, 2)
  valSplit[0] = valSplit[0].slice(0, intLength.value)
  if (typeof valSplit[1] !== 'undefined' && precision.value) {
    valSplit[1] = valSplit[1].slice(0, precision.value)
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
    if (result === parseFloat(modelValue.value.toString()) && result !== numberVal) {
      emit('update:modelValue', numberVal.toFixed(precision.value))
      await nextTick()
    }
    val = result.toFixed(precision.value)
  }
  emit('update:modelValue', val)
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
