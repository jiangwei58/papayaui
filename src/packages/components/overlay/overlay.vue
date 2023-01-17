<template>
  <TransitionComponent
    :custom-class="computedClass('overlay')"
    :show="show"
    :duration="duration"
    mode="fade"
    :custom-style="overlayStyle"
    @click="emit('click')"
  >
    <slot />
  </TransitionComponent>
</template>

<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'
import { computedClass } from '../../utils/style'
import TransitionComponent, { TransitionProps } from '../transition/transition.vue'

export interface OverlayProps {
  /** 是否展示遮罩层 */
  show?: boolean
  /** z-index 层级 */
  zIndex?: number
  /** 动画时长，单位毫秒 */
  duration?: TransitionProps['duration']
  /** 自定义class */
  customClass?: string
  /** 自定义style */
  customStyle?: CSSProperties
}

const props = withDefaults(defineProps<OverlayProps>(), {
  zIndex: 1,
  duration: 300,
  customClass: undefined,
  customStyle: undefined,
})

const emit = defineEmits<{
  (event: 'click'): void
}>()

const overlayStyle = computed(() => {
  return {
    position: 'fixed',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: props.zIndex,
    ...props.customStyle,
  } as CSSProperties
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
</style>
