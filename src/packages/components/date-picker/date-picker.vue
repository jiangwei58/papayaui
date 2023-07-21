<template>
  <view :class="ns.b()">
    <slot name="columns-top" />

    <view v-if="showToolbar" :class="[ns.b('toolbar'), { 'border-bottom': !showColumnsHeader }]">
      <view :class="ns.e('btn')" class="text-black" hover-class="btn-hover" @click="onCancel">
        <slot v-if="$slots.cancel" />
        <template v-else>{{ cancelButtonText }}</template>
      </view>
      <slot v-if="$slots.title" name="title" />
      <view v-else :class="ns.e('title')">{{ title }}</view>
      <view :class="ns.e('btn')" class="color-primary" hover-class="btn-hover" @click="onConfirm">
        <slot v-if="$slots.confirm" />
        <template v-else>{{ confirmButtonText }}</template>
      </view>
    </view>

    <view v-if="showColumnsHeader" :class="ns.b('col-header')" class="border-bottom">
      <view v-for="colName in headers" :key="colName" :class="ns.be('col-header', 'item')">
        {{ colName }}
      </view>
    </view>

    <picker-view
      :class="ns.b('columns')"
      :indicator-style="`height: ${getUnitValue(optionHeight, 'px')}`"
      :immediate-change="false"
      :value="indexes"
      :style="{
        height: `calc(${getUnitValue(optionHeight, 'px')} * ${visibleOptionNum})`,
      }"
      @change="onChange"
    >
      <picker-view-column v-for="(col, colIndex) in _columnsType" :key="col">
        <template v-for="item in columns[colIndex]" :key="item.value">
          <slot v-if="$slots.option" :option="item" :type="col" :colIndex="colIndex" />
          <view v-else :class="ns.b('column')">
            {{ item.text }}
          </view>
        </template>
      </picker-view-column>
    </picker-view>

    <slot name="columns-bottom" />
  </view>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import type { DatePickerColumnType } from '../../core/useDatePicker'
import { useDatePicker } from '../../core/useDatePicker'
import useNamespace from '../../core/useNamespace'
import type { EventDetail } from '../../types'
import { getUnitValue } from '../../utils'
import { datePickerEmits, datePickerProps } from './props'

const ns = useNamespace('date-picker')

const props = defineProps(datePickerProps)
const emit = defineEmits(datePickerEmits)

const { modelValue, columnsType, minDate, maxDate } = toRefs(props)

const {
  columnsType: _columnsType,
  indexes,
  selectedDate,
  columns,
  onChangeColumnIndexes,
} = useDatePicker({
  modelValue,
  columnsType,
  minDate,
  maxDate,
  formatter: props.formatter,
  filter: props.filter,
})

const headers = computed(() => {
  if (typeof props.columnsHeader === 'undefined') {
    const typeNames: { [key in DatePickerColumnType]: string } = {
      year: '年',
      month: '月',
      day: '日',
      hour: '时',
      minute: '分',
    }
    return _columnsType.value.map((type) => typeNames[type])
  }
  return typeof props.columnsHeader === 'function'
    ? props.columnsHeader(_columnsType.value)
    : props.columnsHeader
})

const onChange = (event: EventDetail<{ value: number[] }>) => {
  onChangeColumnIndexes(event.detail.value)
  emit('change', selectedDate.value)
  if (!props.showToolbar) {
    emit('update:modelValue', selectedDate.value)
  }
}

const onConfirm = () => {
  emit('update:modelValue', selectedDate.value)
  emit('confirm', selectedDate.value)
}

const onCancel = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
@import './date-picker.scss';
</style>
