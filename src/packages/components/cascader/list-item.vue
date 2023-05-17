<template>
  <view
    :class="[
      ns.b(),
      {
        active: selected,
      },
    ]"
    hover-class="bg-hover"
    @tap="emit('select')"
  >
    <slot />
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

export interface CascaderListItemProps {
  selected?: boolean
}

const ns = useNamespace('cascader-list-item')

defineProps<CascaderListItemProps>()

const emit = defineEmits<{
  (event: 'select'): void
}>()
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-cascader-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 32rpx;
  font-size: 28rpx;
  &.active {
    color: _var(color-primary);
  }
}
</style>
