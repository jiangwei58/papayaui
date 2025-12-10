<template>
  <Overlay
    :show="visible"
    :z-index="zIndex - 1"
    :duration="duration"
    :custom-style="localOverlayStyle"
    @click="onOverlayClick"
  />
  <TransitionComponent
    :show="visible"
    :duration="duration"
    :mode="animateMode"
    :custom-class="`${ns.b()} ${customClass ?? ''}`"
    :custom-style="transitionStyle"
    @click="onContentClick"
    @before-enter="onBeforeEnter"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
  >
    <view :class="[ns.e('content'), contentClass]" :style="contentStyle" @tap.stop="noop">
      <view v-if="closeable" :class="ns.e('close')" @tap.stop="onClose">
        <IconComponent name="close" />
      </view>
      <slot />
      <SafeBottom v-if="safeAreaInsetBottom && ['left', 'right', 'bottom'].includes(position)" />
    </view>
  </TransitionComponent>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, ref, toRefs, watch } from 'vue'
import { useNamespace } from '@papayaui/core'
import { getUnitValue, noop } from '@papayaui/utils'
import IconComponent from '../icon/icon.vue'
import Overlay from '../overlay/overlay.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import type { TransitionMode } from '../transition/props'
import TransitionComponent from '../transition/transition.vue'
import type { PopupPosition } from './props'
import { popupEmits, popupProps } from './props'

const ns = useNamespace('popup')

const props = defineProps(popupProps)
const emit = defineEmits(popupEmits)

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

const localOverlayStyle = computed<CSSProperties | undefined>(() => {
  if (!props.overlay) return { backgroundColor: 'transparent' }
  return props.overlayStyle
})

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
    style.width = getUnitValue(props.width)
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
  emit('opened')
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

<style lang="scss">
@import './popup.scss';
</style>
