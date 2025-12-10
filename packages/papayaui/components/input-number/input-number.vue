<template>
  <view
    :class="[ns.b(), ns.is('controls', controls), ns.is('plain', plain)]"
    :style="{ display: block ? 'flex' : 'inline-flex' }"
  >
    <view
      v-if="controls"
      :class="[ns.b('icon'), ns.b('minus'), ns.is('icon-disabled', minusDisabled)]"
      :hover-class="minusDisabled ? 'none' : ns.bm('icon', 'hover')"
      @tap="onReduce()"
    >
      <IconComponent name="move" />
    </view>

    <view
      v-if="
        selectAllOnFocus &&
        !inputSelection.focus &&
        !disabled &&
        !readonly &&
        typeof numberVal === 'number'
      "
      :class="[ns.e('inner'), ns.e('inner-mask')]"
      :style="ns.style({ width: inputWidth && getUnitValue(inputWidth), textAlign: inputAlign })"
      @click="onFocusInput"
    >
      {{ numberVal }}
    </view>
    <input
      v-else
      :class="[ns.e('inner'), ns.is('inner-disabled', disabled)]"
      :style="ns.style({ width: inputWidth && getUnitValue(inputWidth), textAlign: inputAlign })"
      :placeholder="placeholder"
      :value="numberVal"
      :type="decimalLength ? 'digit' : 'number'"
      :placeholder-class="ns.b('placeholder')"
      :disabled="readonly || disabled"
      :focus="inputSelection.focus"
      :selection-start="inputSelection.start"
      :selection-end="inputSelection.end"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />

    <view
      v-if="controls"
      :class="[ns.b('icon'), ns.b('plus'), ns.is('icon-disabled', plusDisabled)]"
      :hover-class="plusDisabled ? 'none' : ns.bm('icon', 'hover')"
      @tap="onAdd()"
    >
      <IconComponent name="add" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, toRefs } from 'vue'
import type { EventDetail } from '../..'
import type { InputNumberValue } from '@papayaui/core'
import { useInputNumber, minAndMax } from '@papayaui/core'
import { useNamespace } from '@papayaui/core'
import { getUnitValue } from '@papayaui/utils'
import IconComponent from '../icon/icon.vue'
import { inputNumberEmits, inputNumberProps } from './props'

const ns = useNamespace('input-number')

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const { modelValue, intLength, decimalLength } = toRefs(props)
const min = computed<number>(() => +props.min)
const max = computed<number>(() => +props.max)
const step = computed<number>(() => +props.step)

const inputSelection = ref({ focus: false, start: -1, end: -1 })

const {
  numberVal,
  safeNumberVal,
  getFormatVal,
  onAdd: _onAdd,
  onReduce: _onReduce,
} = useInputNumber({
  modelValue,
  min,
  max,
  step,
  intLength,
  decimalLength,
})

const minusDisabled = computed(() => props.disabled || safeNumberVal.value <= min.value)
const plusDisabled = computed(() => props.disabled || safeNumberVal.value >= max.value)

const onUpdate = (value: number) => {
  if (!props.asyncChange) {
    emit('update:modelValue', value, props.name)
  }
  emit('change', value, props.name)
}

const onAdd = () => {
  if (plusDisabled.value) return
  const newVal = _onAdd(!props.asyncChange)
  onUpdate(newVal)
}

const onReduce = () => {
  if (minusDisabled.value) return
  const newVal = _onReduce(!props.asyncChange)
  onUpdate(newVal)
}

const onFocusInput = () => {
  if (props.selectAllOnFocus && typeof numberVal.value === 'number') {
    inputSelection.value = { focus: true, start: 0, end: numberVal.value.toString().length }
  }
}

const onInput = (e: unknown) => {
  const detail = (e as EventDetail<{ cursor: number; keyCode: number; value: string }>).detail
  return getFormatVal(detail.value)
}

const onBlur = async (e: unknown) => {
  let event = e as EventDetail<{ value: InputNumberValue; cursor: number }>
  const numVal = Number(event.detail.value ?? 0)
  let result = minAndMax(numVal, min.value, max.value)
  // 处理空值的情况
  if (!event.detail.value && props.nullable) {
    result = props.nullValue
  }
  // 防止处理后modelValue前后值一样视图不更新
  if (result === Number(props.modelValue) && result !== numVal) {
    numberVal.value = numVal
    await nextTick()
    numberVal.value = result
  }
  event.detail.value = result
  // 值没变不发送更新事件
  if (result !== Number(props.modelValue) || result !== numVal) {
    onUpdate(result)
  }
  if (props.selectAllOnFocus) {
    inputSelection.value = { focus: false, start: -1, end: -1 }
  }
  emit('blur', event)
}

const onFocus = (e: unknown) => {
  emit('focus', e as EventDetail<{ value: InputNumberValue; height: number }>)
}
</script>

<style lang="scss">
@import './input-number.scss';
</style>
