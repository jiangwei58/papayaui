<template>
  <button
    :class="[ns.b(), ns.m(type), ns.m(size), ns.is('block', block), ns.is('plain', plain)]"
    :style="customStyle"
    :hover-class="ns.m('hover')"
    :disabled="disabled"
    :plain="plain"
    :open-type="openType"
    @getphonenumber="emit('getphonenumber', $event)"
    @getuserinfo="emit('getuserinfo', $event)"
    @error="emit('error', $event)"
    @opensetting="emit('opensetting', $event)"
    @launchapp="emit('launchapp', $event)"
    @contact="emit('contact', $event)"
    @chooseavatar="emit('chooseavatar', $event)"
    @tap="onClick"
  >
    <view :class="ns.e('content')">
      <Loadmore
        v-if="localLoading"
        class="mr-4"
        status="loading"
        color="inherit"
        icon-size="1.2em"
        :show-text="false"
      />
      <Icon
        v-if="icon && !localLoading"
        :class="{ 'mr-4': $slots.default }"
        :name="icon"
        size="1.2em"
        color="inherit"
        style="font-size: inherit"
      />
      <slot />
    </view>
  </button>
</template>

<script lang="ts" setup>
import { getUnitValue } from '../../utils/common'
import { computed, CSSProperties, ref, StyleValue } from 'vue'
import Icon from '../icon/icon.vue'
import Loadmore from '../loadmore/loadmore.vue'
import useNamespace from '../../core/useNamespace'
import { buttonEmits, buttonProps } from './props'

const ns = useNamespace('button')

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const clickLoading = ref<boolean>()
const localLoading = computed(() => props.loading || clickLoading.value)

const customStyle = computed<StyleValue>(() => {
  const style: CSSProperties = {
    ...props.customStyle,
  }
  if (props.width) {
    style.width = props.block
      ? getUnitValue(props.width === 'auto' ? '100%' : props.width)
      : getUnitValue(props.width)
  }
  if (props.height) {
    style.height = getUnitValue(props.height)
  }
  if (props.fontSize) {
    style.fontSize = getUnitValue(props.fontSize)
  }
  if (props.round) {
    style.borderRadius = props.round === true ? '100px' : getUnitValue(props.round)
  }
  return style
})

const onClick = async (event: MouseEvent) => {
  if (clickLoading.value) return
  if (typeof props.syncClick === 'function') {
    const result = props.syncClick()
    if (result instanceof Promise) {
      clickLoading.value = true
      result.finally(() => {
        clickLoading.value = false
      })
    }
  } else {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-button {
  display: inline-block;
  height: 44px;
  line-height: 1.2;
  margin: _var(button-margin, 0);
  border: 1px solid transparent;
  box-sizing: border-box;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #000;
    border: inherit;
    border-color: #000;
    border-radius: inherit;
    transform: translate(-50%, -50%);
    opacity: 0;
    content: ' ';
  }
  &::after {
    border: none;
  }

  &--hover {
    &::before {
      opacity: 0.1;
    }
  }

  &--default {
    color: _var(color-black);
    background-color: #fff;
    border-color: #ebedf0;
  }
  &--primary {
    color: #fff;
    background-color: _var(color-primary);
    border-color: _var(color-primary);
  }
  &--warning {
    color: #fff;
    background-color: _var(color-warning);
    border-color: _var(color-warning);
  }
  &--danger {
    color: #fff;
    background-color: _var(color-danger);
    border-color: _var(color-danger);
  }

  &--large {
    width: 100%;
    height: 50px;
  }
  &--normal {
    font-size: 14px;
    padding: _var(button-padding, 0 15px);
  }
  &--small {
    height: 32px;
    font-size: 12px;
    padding: _var(button-padding, 0 8px);
  }
  &--mini {
    height: 24px;
    font-size: 10px;
    padding: _var(button-padding, 0 4px);
  }

  &--block {
    display: block;
    width: 100%;
  }

  &--plain {
    background-color: transparent;
    &.#{$prefix}-button--primary {
      color: _var(color-primary);
    }
    &.#{$prefix}-button--warning {
      color: _var(color-warning);
    }
    &.#{$prefix}-button--danger {
      color: _var(color-danger);
    }
  }
  &[disabled]:not([type]) {
    color: _var(color-black);
    background-color: #c8c9cc;
    border-color: #c8c9cc;
  }
}
</style>
