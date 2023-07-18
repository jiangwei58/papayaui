<template>
  <view
    class="grid"
    :class="[ns.b('buttons'), `grid-cols-${column}`]"
    :style="{ gap: getUnitValue(gap) }"
  >
    <view
      v-for="(item, index) in options"
      :key="index"
      :class="[
        ns.b('button'),
        {
          active: typeof modelValue !== 'undefined' ? isSelected(item[valueKey]) : false,
        },
      ]"
      :style="{
        backgroundColor: bgColor,
        borderColor: bgColor,
        borderRadius: getUnitValue(typeof round === 'boolean' ? (round ? '100' : '0') : round),
      }"
      @tap="onSelect(item, index)"
    >
      <slot v-if="$slots.default" :item="item" :index="index" />
      <text v-else>{{ item[labelKey] }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import useNamespace from '../../core/useNamespace'
import { useSelect } from '../../core/useSelect'
import { getUnitValue } from '../../utils/common'
import type { CheckboxItem, CheckboxButtonValue } from './props'
import { checkboxButtonsEmits, checkboxButtonsProps } from './props'

const ns = useNamespace('checkbox')

const props = defineProps(checkboxButtonsProps)
const emit = defineEmits(checkboxButtonsEmits)

const { options, valueKey, modelValue, multiple, inverse } = toRefs(props)

const {
  selectedItems,
  selectedValues,
  onSelect: _onSelect,
  isSelected,
} = useSelect<CheckboxItem, CheckboxButtonValue>({
  options,
  valueKey,
  defaultValue: modelValue,
  multiple,
  inverse,
})

const onSelect = (item: CheckboxItem, index: number) => {
  _onSelect(item[valueKey.value])
  emit('update:modelValue', selectedValues.value)
  emit('change', selectedItems.value, index)
}
</script>

<style lang="scss" scoped>
@import './checkbox-btns.scss';
</style>
