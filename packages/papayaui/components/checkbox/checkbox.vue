<template>
  <view
    :class="[
      ns.b(),
      ns.m(shape),
      ns.is('checked', modelValue || indeterminate || checkboxGroupProvide.isSelected(name)),
      ns.is('disabled', isDisabled),
    ]"
    @tap.stop="onClick"
  >
    <view
      v-if="labelPosition === 'left'"
      :class="[ns.e('label'), ns.e('label-left')]"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
    <view :class="ns.e('icon')" :style="{ lineHeight: getUnitValue(iconSize) }">
      <IconComponent :name="indeterminate ? 'half-check' : 'success'" />
    </view>
    <view
      v-if="labelPosition === 'right'"
      :class="[ns.e('label'), ns.e('label-right')]"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, type ComponentInternalInstance } from 'vue'
import { inject } from 'vue'
import { useNamespace, defaultNamespace } from '@papayaui/core'
import { getUnitValue, noop } from '@papayaui/utils'
import type { CheckboxProvideData } from '../checkbox-group/checkbox-group.vue'
import IconComponent from '../icon/icon.vue'
import type { CheckboxProps } from './props'
import { checkboxEmits, checkboxProps } from './props'

export interface CheckboxInstance extends Omit<ComponentInternalInstance, 'props'> {
  props: CheckboxProps
}

const ns = useNamespace('checkbox')

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const checkboxGroupProvide = inject<CheckboxProvideData>(
  `${defaultNamespace}-checkbox-group-provide`,
  {
    onSelect: noop,
    isSelected: noop,
  },
)

const isDisabled = computed(() => {
  return props.disabled || !!checkboxGroupProvide?.disabled?.value
})

const onClick = () => {
  if (isDisabled.value) return
  checkboxGroupProvide.onSelect(props.name)
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue, props.name)
}

const onLabelClick = () => {
  if (props.labelDisabled) return
  onClick()
}
</script>

<style lang="scss">
@import './checkbox.scss';
</style>
