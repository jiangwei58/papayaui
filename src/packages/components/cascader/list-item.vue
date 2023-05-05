<template>
  <view
    class="flex items-center justify-between px-32 py-20 text-28"
    :class="[
      computedClass('cascader-list-item'),
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
      :class="computedClass('cascader-list-item__icon')"
      name="success"
      :color="`var(--${PREFIX}-color-primary)`"
      block
    />
  </view>
</template>

<script lang="ts" setup>
import { computedClass, PREFIX } from '../../utils/style'
import Icon from '../icon/icon.vue'

export interface CascaderListItemProps {
  selected?: boolean
}

defineProps<CascaderListItemProps>()

const emit = defineEmits<{
  (event: 'select'): void
}>()
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-cascader-list-item {
  &.active {
    color: _var(color-primary);
  }
}
</style>
