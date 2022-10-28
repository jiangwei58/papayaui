<template>
  <button
    :class="[computedClass('button'), `button--${type}`, plain ? `button--plain` : '']"
    :style="customStyle"
    :hover-class="computedClass('button--hover')"
    :disabled="disabled"
    :plain="plain"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { getUnitValue } from '../../utils/common'
import { computed, ref, StyleValue } from 'vue'
import { computedClass } from '../../utils/style'

interface ButtonProps {
  /** 按钮类型 */
  type?: 'primary' | 'warning' | 'danger' | 'default'
  /** 按钮宽度 */
  width?: string
  /** 按钮高度 */
  height?: string
  /** 字体大小 */
  fontSize?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 圆角大小, 值为true时半圆角 */
  round?: true | string
  /** 是否镂空样式 */
  plain?: boolean
  /** 同步点击（主要用于防止异步事件多次触发） */
  syncClick?: (...args: any[]) => any | Promise<any>
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  width: '100%',
  height: '40px',
  fontSize: '16px',
  round: '4px',
  syncClick: undefined,
})

const emit = defineEmits<{
  (event: 'click', value: Event): void
}>()

const localLoading = ref<boolean>()

const customStyle = computed<StyleValue>(() => {
  return {
    width: getUnitValue(props.width),
    lineHeight: getUnitValue(props.height),
    fontSize: getUnitValue(props.fontSize),
    borderRadius: props.round === true ? getUnitValue(props.height) : getUnitValue(props.round),
  }
})

const onClick = async (event: MouseEvent) => {
  if (typeof props.syncClick === 'function') {
    const result = props.syncClick()
    if (result instanceof Promise) {
      localLoading.value = true
      await result.finally(() => {
        localLoading.value = false
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
  border: 1px solid transparent;
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
    background-color: transparent;
    border-color: #ebedf0;
  }
  &.button--primary {
    color: #fff;
    background-color: _var(color-primary);
    border-color: _var(color-primary);
    &.button--plain {
      color: _var(color-primary);
    }
  }
  &.button--warning {
    color: #fff;
    background-color: _var(color-warning);
    border-color: _var(color-warning);
    &.button--plain {
      color: _var(color-warning);
    }
  }
  &.button--danger {
    color: #fff;
    background-color: _var(color-danger);
    border-color: _var(color-danger);
    &.button--plain {
      color: _var(color-danger);
    }
  }
  &[plain] {
    background-color: transparent;
  }
  &[disabled]:not([type]) {
    color: _var(color-text-black);
    background-color: #c8c9cc;
    border-color: #c8c9cc;
  }
}
</style>
