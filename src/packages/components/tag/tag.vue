<template>
  <view
    :class="[ns.b(), ns.m(type), ns.is('plain', plain), ns.is('mark', mark)]"
    :style="ns.style(customStyle)"
  >
    <slot />
    <Icon v-if="closeable" name="close" class="ml-2" @tap="emit('close')" />
  </view>
</template>

<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import Icon from '../icon/icon.vue'
import { tagEmits, tagProps } from './props'

const ns = useNamespace('tag')

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)

const customStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.color) {
    style[props.plain ? 'borderColor' : 'backgroundColor'] = props.color
  }
  if (props.textColor) {
    style.color = props.textColor
  }
  if (props.round) {
    style.borderRadius = props.round === true ? getUnitValue('100px') : getUnitValue(props.round)
  }
  return style
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-tag {
  display: inline-flex;
  align-items: center;
  font-size: _var(tag-font-size, 12px);
  line-height: _var(tag-line-height, 16px);
  border-radius: 4px;
  height: _var(tag-height, auto);
  padding: _var(tag-padding, 0 4px);
  border: 1px solid transparent;

  @each $type in primary, success, warning, danger {
    &--#{$type} {
      color: #fff;
      background-color: _var(color-#{$type});
      &.#{$prefix}-tag--plain {
        color: _var(color-#{$type});
      }
    }
  }
  &--plain {
    background-color: #fff;
    border-color: currentColor;
  }
  &--mark {
    border-radius: 0 100px 100px 0;
  }
}
</style>
