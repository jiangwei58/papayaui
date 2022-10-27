<template>
  <button
    :class="[computedClass('button'), `button--${type}`]"
    :style="customStyle"
    :hover-class="computedClass('button--hover')"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { getUnitValue } from '../../utils/common'
import { computed, StyleValue } from 'vue'
import { computedClass } from '../../utils/style'

interface ButtonProps {
  type?: 'primary' | 'warning' | 'danger' | 'default'
  width?: string
  height?: string
  fontSize?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  width: '100%',
  height: '40px',
  fontSize: '16px',
})

const emit = defineEmits<{
  (event: 'click', value: Event): void
}>()

const customStyle = computed<StyleValue>(() => {
  return {
    width: getUnitValue(props.width),
    lineHeight: getUnitValue(props.height),
    fontSize: getUnitValue(props.fontSize),
  }
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-button {
  border-radius: 4px;
  box-sizing: border-box;
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
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: 0;
    content: ' ';
  }
  &.#{$prefix}-button--hover {
    &::before {
      opacity: 0.1;
    }
  }
  &.button--default {
    color: _var(color-text-black);
    background: transparent;
    border-color: #ebedf0;
  }
  &.button--primary {
    color: #fff;
    background: _var(color-primary);
    border-color: _var(color-primary);
  }
  &.button--warning {
    color: #fff;
    background: _var(color-warning);
    border-color: _var(color-warning);
  }
  &.button--danger {
    color: #fff;
    background: _var(color-danger);
    border-color: _var(color-danger);
  }
}
</style>
