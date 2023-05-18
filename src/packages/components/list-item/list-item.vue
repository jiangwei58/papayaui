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

export interface ListItemProps {
  /**
   * 内容
   */
  text?: string
  /**
   * 是否选中
   */
  selected?: boolean
  /**
   * 是否使用slot
   * @description 主动判定，为了防止slot上v-if为false场景下识别为slot存在的问题
   * ```tsx
   * <ListItem>
   *   <slot v-if="false" /> // 这时$slots.default为true
   * </ListItem>
   * ```
   */
  useSlot?: boolean
}

const ns = useNamespace('list-item')

defineProps<ListItemProps>()

const emit = defineEmits<{
  (event: 'click'): void
}>()
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
    background-color: _var(color-active-color) !important;
  }
}
</style>
