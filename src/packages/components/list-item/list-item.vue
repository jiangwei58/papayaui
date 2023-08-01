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
@import './list-item.scss';
</style>
