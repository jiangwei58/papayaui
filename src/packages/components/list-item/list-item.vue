<template>
  <view
    :class="[ns.b(), ns.is('selected', selected), customClass]"
    :style="customStyle"
    :hover-class="ns.m('hover')"
    @tap="emit('click')"
  >
    <slot v-if="useSlot ?? $slots.default" />
    <text v-else>{{ text }}</text>
    <IconComponent v-if="selected" :class="ns.e('icon')" name="success" />
  </view>
</template>

<script lang="ts" setup>
import useNamespace from '../../core/useNamespace'
import IconComponent from '../icon/icon.vue'
import { listItemEmits, listItemProps } from './props'

const ns = useNamespace('list-item')

defineProps(listItemProps)
const emit = defineEmits(listItemEmits)
</script>

<style lang="scss" scoped>
@import './list-item.scss';
</style>
