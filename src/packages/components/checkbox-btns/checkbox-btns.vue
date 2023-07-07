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
import useSelect from '../../core/useSelect'
import { getUnitValue } from '../../utils/common'
import type { CheckboxItem, CheckboxValue } from './props'
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
} = useSelect<CheckboxItem, CheckboxValue>({
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
@import '../../styles/vars.scss';
.#{$prefix}-checkbox {
  &-button {
    font-size: _var(checkbox-btns-font-size, 14px);
    color: _var(checkbox-btns-color, _var(color-black));
    padding: _var(checkbox-btns-padding, 7px 4px);
    border-width: _var(checkbox-btns-border-width, 2rpx);
    border-style: solid;
    text-align: center;
    &.active {
      color: _var(color-primary);
      background-color: rgba(0, 156, 93, 0.1) !important;
      border-color: _var(color-primary) !important;
    }
  }
}
</style>
