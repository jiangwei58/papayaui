<template>
  <Overlay
    :show="visible"
    :z-index="zIndex - 1"
    :duration="duration"
    :custom-style="overlayStyle"
    @click="onOverlayClick"
  />
  <TransitionComponent
    :show="visible"
    :duration="duration"
    :mode="animateMode"
    :custom-class="`${computedClass('popup')} ${customClass}`"
    :custom-style="transitionStyle"
    @click="onContentClick"
    @before-enter="onBeforeEnter"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
  >
    <view :class="computedClass('popup__content')" :style="contentStyle" @tap.stop="noop">
      <view v-if="closeable" :class="computedClass('popup__close')" @tap.stop="onClose">
        <Icon name="close" size="24px" block />
      </view>
      <slot />
      <SafeBottom v-if="safeAreaInsetBottom && ['left', 'right', 'bottom'].includes(position)" />
    </view>
  </TransitionComponent>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, ref, toRefs, watch } from 'vue'
import { getUnitValue, noop } from '../../utils'
import { computedClass } from '../../utils/style'
import Icon from '../icon/icon.vue'
import Overlay from '../overlay/overlay.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import TransitionComponent, { TransitionMode, TransitionProps } from '../transition/transition.vue'

export type PopupPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

export interface PopupProps {
  /** 是否显示 */
  show?: boolean
  /** z-index层级 */
  zIndex?: number
  /** 弹出方式 */
  position?: PopupPosition
  /** 遮罩打开或收起的动画过渡时间，单位ms */
  duration?: TransitionProps['duration']
  /** 是否显示遮罩 */
  overlay?: boolean
  /** 点击遮罩是否关闭弹窗 */
  closeOnClickOverlay?: boolean
  /** 弹出宽度 */
  width?: string
  /** 弹窗高度 */
  height?: string
  /** 背景色 */
  bgColor?: CSSProperties['background-color']
  /** 是否圆角 */
  round?: boolean | string
  /** 是否显示关闭按钮 */
  closeable?: boolean
  /** 是否适配底部安全区 */
  safeAreaInsetBottom?: boolean
  /** 是否留出顶部安全距离（状态栏高度） */
  safeAreaInsetTop?: boolean
  /** 自定义样式类 */
  customClass?: string
  /** 自定义弹出层样式 */
  customStyle?: CSSProperties
  /** 自定义遮罩层样式 */
  overlayStyle?: CSSProperties
}

const props = withDefaults(defineProps<PopupProps>(), {
  show: false,
  zIndex: 999,
  position: 'bottom',
  duration: 300,
  overlay: true,
  round: undefined,
  width: undefined,
  height: undefined,
  bgColor: undefined,
  closeOnClickOverlay: true,
  safeAreaInsetBottom: true,
  customClass: '',
  customStyle: undefined,
  overlayStyle: undefined,
})

const emit = defineEmits<{
  (event: 'update:show', value: PopupProps['show']): void
  (event: 'open'): void
  (event: 'opend'): void
  (event: 'close'): void
  (event: 'closed'): void
  (event: 'clickOverlay'): void
}>()

const { show } = toRefs(props)

const systemInfo = uni.getSystemInfoSync()
const visible = ref<boolean>(false)

watch(
  show,
  (newVal) => {
    visible.value = newVal
  },
  {
    immediate: true,
  },
)

const transitionStyle = computed<CSSProperties>(() => {
  const styleObj: { [key in PopupPosition]: CSSProperties } = {
    top: { top: 0, left: 0, right: 0 },
    bottom: { left: 0, right: 0, bottom: 0 },
    left: { top: 0, left: 0, bottom: 0 },
    right: { top: 0, right: 0, bottom: 0 },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  }
  return {
    position: 'fixed',
    display: 'flex',
    zIndex: props.zIndex,
    ...styleObj[props.position],
    ...props.customStyle,
  }
})

const animateMode = computed<TransitionMode>(() => {
  const animateObj: { [key in PopupPosition]: TransitionMode } = {
    top: 'slide-down',
    bottom: 'slide-up',
    left: 'slide-left',
    right: 'slide-right',
    center: 'fade-zoom',
  }
  return animateObj[props.position]
})

const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.position !== 'center') {
    style.flex = 1
  }
  if (props.width && ['left', 'right', 'center'].includes(props.position)) {
    style.height = getUnitValue(props.width)
  }
  if (props.height && ['top', 'bottom', 'center'].includes(props.position)) {
    style.height = getUnitValue(props.height)
  }
  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }
  if (props.round) {
    const radius = typeof props.round === 'boolean' ? '16px' : getUnitValue(props.round)
    const radiusObj: { [key in PopupPosition]: CSSProperties['border-radius'] } = {
      top: `0 0 ${radius} ${radius}`,
      bottom: `${radius} ${radius} 0 0`,
      left: `0 ${radius} ${radius} 0`,
      right: `${radius} 0 0 ${radius}`,
      center: `${radius}`,
    }
    style.borderRadius = radiusObj[props.position]
  }
  if (props.safeAreaInsetTop) {
    style.paddingTop = systemInfo.statusBarHeight + 'px'
  }
  return style
})

const onOverlayClick = () => {
  emit('clickOverlay')
  if (!props.closeOnClickOverlay) return
  onClose()
}

const onContentClick = () => {
  // 由于中部弹出时，其transition占据了整个页面相当于遮罩，此时需要发出遮罩点击事件，是否无法通过点击遮罩关闭弹窗
  if (props.position === 'center') {
    onOverlayClick()
  }
}

const onBeforeEnter = () => {
  emit('open')
}

const onAfterEnter = () => {
  emit('opend')
}

const onClose = () => {
  visible.value = false
  emit('update:show', false)
  emit('close')
}

const onAfterLeave = () => {
  emit('closed')
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-popup {
  &__content {
    position: relative;
    background-color: #fff;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    padding: 10px;
    color: #c8c9cc;
  }
}
</style>
