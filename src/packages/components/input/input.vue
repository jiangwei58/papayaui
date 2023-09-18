<template>
  <view
    :class="[ns.b(), ns.is('readonly', readonly), ns.is('disabled', disabled)]"
    @click="emit('click', $event)"
  >
    <slot name="prefix" />

    <view
      v-if="showMask"
      :class="[ns.e('mask')]"
      :style="{ textAlign: inputAlign }"
      @tap.stop="onFocus"
    >
      {{ inputValue }}
    </view>

    <input
      v-else
      :value="inputValue"
      :class="[ns.e('input')]"
      :disabled="readonly || disabled"
      :placeholder="placeholder"
      :placeholder-class="ns.e('placeholder')"
      :style="{ textAlign: inputAlign }"
      :maxlength="maxLength"
      :focus="inputSelection.focus"
      :selection-start="inputSelection.start"
      :selection-end="inputSelection.end"
      :confirm-type="confirmType"
      :confirm-hold="confirmHold"
      :adjust-position="adjustPosition"
      :always-embed="alwaysEmbed"
      :hold-keyboard="holdKeyboard"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      @click.stop="emit('click-input', $event)"
    />

    <IconComponent
      v-if="!disabled && clearable && !!inputValue"
      name="round-close-fill"
      :class="ns.e('icon')"
      @tap.stop="onClear"
    />

    <slot name="suffix" />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatNumericTypeString, minAndMax, useNamespace } from '../../core'
import type { EventDetail } from '../../types'
import IconComponent from '../icon/icon.vue'
import { inputEmits, inputProps } from './props'

const ns = useNamespace('input')

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const _value = ref('')
const inputValue = computed<string>({
  get() {
    return props.modelValue?.toString() ?? ''
  },
  set(value) {
    _value.value = value?.toString() ?? ''
    emit('update:modelValue', _value.value)
  },
})

const inputSelection = ref({ focus: false, start: -1, end: -1 })

const showMask = computed(() => {
  return (
    props.selectAllOnFocus &&
    !inputSelection.value.focus &&
    !props.disabled &&
    !props.readonly &&
    !!inputValue.value
  )
})

const onInput = (e: Event) => {
  let value = (e as unknown as EventDetail<{ value: string }>).detail.value
  // 数值类型处理，整数或小数
  if (props.type === 'number') {
    value = formatNumericTypeString(value, props.intLength, props.decimalLength)
  }
  // 格式化函数处理
  if (typeof props.formatter === 'function') {
    value = props.formatter(value, 'input')
  }
  inputValue.value = value
  return value
}

const onFocus = (e: Event) => {
  if (props.selectAllOnFocus && inputValue.value) {
    // 设置光标起始和结束位置来全选内容
    inputSelection.value = { focus: true, start: 0, end: inputValue.value.toString().length }
  }
  emit('focus', e)
}

const onBlur = async (e: unknown) => {
  let event = e as EventDetail<{ value: string; cursor: number }>
  let value = event.detail.value
  // 处理最大值最小值
  if (props.type === 'number' && value) {
    value = minAndMax(Number(event.detail.value ?? 0), props.min, props.max).toString()
  }
  // 格式化函数处理
  if (typeof props.formatter === 'function') {
    value = props.formatter(value, 'blur')
  }
  // 值变化了触发更新
  if (value !== inputValue.value) {
    inputValue.value = value
    event.detail.value = value
  }
  // 重置光标位置
  if (props.selectAllOnFocus) {
    inputSelection.value = { focus: false, start: -1, end: -1 }
  }
  emit('blur', e)
}

const onClear = () => {
  inputValue.value = ''
  emit('clear')
}
</script>

<style lang="scss">
@import './input.scss';
</style>
