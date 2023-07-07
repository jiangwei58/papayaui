<template>
  <view
    :class="[ns.b(), ns.is('selected', selected)]"
    :hover-class="ns.m('hover')"
    @tap="emit('click')"
  >
    <slot v-if="useSlot ?? $slots.default" />
    <text v-else>{{ text }}</text>
    <Icon
      v-if="selected"
      :class="ns.e('icon')"
      name="success"
      :color="`var(--${defaultNamespace}-color-primary)`"
      block
    />
  </view>
</template>

<script lang="ts" setup>
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import Icon from '../icon/icon.vue'
import { listItemEmits, listItemProps } from './props'

const ns = useNamespace('list-item')

defineProps(listItemProps)
const emit = defineEmits(listItemEmits)
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  font-size: 14px;
  line-height: 24px;

  &--selected {
    color: _var(color-primary);
  }

  &--hover {
    background-color: _var(color-active) !important;
  }
}
</style>
