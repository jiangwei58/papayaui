<template>
  <input
    :class="[ns.b(), { disabled }]"
    :style="{ ...customStyle, textAlign: align }"
    :placeholder="placeholder"
    :value="modelValue"
    :type="precision ? 'digit' : 'number'"
    :placeholder-class="ns.b('placeholder')"
    :disabled="disabled"
    :focus="focus"
    :auto-blur="autoBlur"
    :adjust-position="adjustPosition"
    @input="onInput"
    @blur="onBlur"
    @focus="onFocus"
    @confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'
import useNamespace from '../../core/useNamespace'
import type { EventDetail } from '../../types'
import type { NumberInputEmits } from './props'
import { numberInputEmits, numberInputProps } from './props'

const ns = useNamespace('number-input')

const props = defineProps(numberInputProps)
const emit = defineEmits(numberInputEmits)

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
  let val = (e as EventDetail<{ value: string; cursor: number }>).detail.value
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
  emit('blur', e)
}

const onFocus = (e: FocusEvent) => {
  emit('focus', e as unknown as Parameters<NumberInputEmits['focus']>[0])
}

const onConfirm = (e: any) => {
  emit('confirm', e)
}
</script>

<style lang="scss" scoped>
@import './number-input.scss';
</style>
