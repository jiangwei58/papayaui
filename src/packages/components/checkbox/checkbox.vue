<template>
  <view
    :class="[
      ns.b(),
      ns.m(shape),
      ns.is('checked', modelValue || p_data?.isSelected(name)),
      ns.is('disabled', disabled || p_data?.disabled),
    ]"
    @tap.stop="onClick"
  >
    <view
      v-if="labelPosition === 'left'"
      :class="ns.e('label')"
      class="mr-16"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
    <view :class="ns.e('icon')">
      <IconComponent name="success" size="0.8em" block />
    </view>
    <view
      v-if="labelPosition === 'right'"
      :class="ns.e('label')"
      class="ml-16"
      @tap.stop="onLabelClick"
    >
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance, inject } from 'vue'
import useNamespace from '../../core/useNamespace'
import { noop } from '../../utils'
import { CheckboxProvideData } from '../checkbox-group/checkbox-group.vue'
import IconComponent from '../icon/icon.vue'
import { checkboxEmits, CheckboxProps, checkboxProps } from './props'

export interface CheckboxInstance extends Omit<ComponentInternalInstance, 'props'> {
  props: CheckboxProps
}

const ns = useNamespace('checkbox')

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const p_data = inject<CheckboxProvideData>('checkboxData', { onSelect: noop, isSelected: noop })

const onClick = () => {
  if (props.disabled || p_data.disabled) return
  p_data?.onSelect(props.name)
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue, props.name)
}

const onLabelClick = () => {
  if (props.labelDisabled) return
  onClick()
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-checkbox {
  $size: 20px;
  $gray: #c8c9cc;

  display: _var(checkbox-display, flex);
  align-items: center;
  user-select: none;
  margin: _var(checkbox-margin, 0);

  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $size;
    height: $size;
    font-size: $size;
    color: transparent;
    border: 1px solid $gray;
    transition-property: color, border-color, background-color;
    transition-duration: 0.2s;
  }
  &__label {
    font-size: _var(checkbox-font-size, 16px);
    line-height: $size;
    color: _var(checkbox-label-color, _var(color-black));
  }

  &--square &__icon {
    border-radius: 0;
  }
  &--round &__icon {
    border-radius: 50%;
  }
  &--checked &__icon {
    color: #fff;
    background-color: _var(checkbox-checked-color, _var(color-primary));
    border-color: _var(checkbox-checked-color, _var(color-primary));
  }
  &--disabled &__icon {
    background-color: #ebedf0;
    border-color: $gray;
  }
  &--disabled.#{$prefix}-checkbox--checked &__icon {
    color: $gray;
  }
  &--disabled &__label {
    color: $gray;
  }
}
</style>
