<template>
  <view v-if="show" :class="computedClass('popup', `popup--${props.position}`)">
    <uni-transition
      key="1"
      name="overlay"
      mode-class="fade"
      :styles="overlayStyle"
      :duration="duration"
      :show="showTransition"
      @click="onOverlayClick"
    />
    <uni-transition
      key="2"
      :mode-class="transitionModeClass"
      name="content"
      :styles="transitionStyle"
      :duration="duration"
      :show="showTransition"
      @click="onContentClick"
    >
      <view :class="computedClass('popup__content')" :style="popupContentStyle" @tap.stop="noop">
        <view v-if="closeable" :class="computedClass('popup__close')" @tap.stop="onClose">
          <Icon name="close" size="24px" block />
        </view>
        <slot />
        <SafeBottom v-if="safeAreaInsetBottom" />
      </view>
    </uni-transition>
  </view>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, ref, toRefs, watch } from 'vue'
import { getUnitValue, noop } from '../../utils'
import { computedClass } from '../../utils/style'
import Icon from '../icon/icon.vue'
import SafeBottom from '../safe-bottom/safe-bottom.vue'
import UniTransition from '../uni-transition/uni-transition.vue'

export type PopupPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

export interface PopupProps {
  show?: boolean
  /** 弹出方式 */
  position?: PopupPosition
  /** 遮罩打开或收起的动画过渡时间，单位ms */
  duration?: number
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
  round?: boolean
  /** 是否显示关闭按钮 */
  closeable?: boolean
  /** 是否适配底部安全区 */
  safeAreaInsetBottom?: boolean
}

const props = withDefaults(defineProps<PopupProps>(), {
  show: false,
  position: 'center',
  duration: 300,
  width: undefined,
  height: undefined,
  bgColor: undefined,
  closeOnClickOverlay: true,
})

const emit = defineEmits<{
  (event: 'update:show', value: PopupProps['show']): void
  (event: 'open'): void
  (event: 'close'): void
  (event: 'closed'): void
  (event: 'clickOverlay'): void
}>()

const { show } = toRefs(props)

let _timer: number | null = null
const showTransition = ref<boolean>(false)

watch(
  show,
  (newVal) => {
    showTransition.value = newVal
  },
  {
    immediate: true,
  },
)

const overlayStyle = computed<CSSProperties>(() => {
  return {
    position: 'fixed',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  }
})

const transitionStyle = computed<CSSProperties>(() => {
  const typeStyleObj: { [key in PopupPosition]: CSSProperties } = {
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
    ...typeStyleObj[props.position],
  }
})

const transitionModeClass = computed<string[]>(() => {
  const modeObj: { [key in PopupPosition]: string[] } = {
    top: ['slide-top'],
    bottom: ['slide-bottom'],
    left: ['slide-left'],
    right: ['slide-right'],
    center: ['zoom-out', 'fade'],
  }
  return modeObj[props.position]
})

const popupContentStyle = computed<CSSProperties>(() => {
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
    const radiusObj: { [key in PopupPosition]: CSSProperties['border-radius'] } = {
      top: '0 0 16px 16px',
      bottom: '16px 16px 0 0',
      left: '0 16px 16px 0',
      right: '16px 0 0 16px',
      center: '16px',
    }
    style.borderRadius = radiusObj[props.position]
  }
  return style
})

const onOverlayClick = () => {
  emit('clickOverlay')
  if (!props.closeOnClickOverlay) return
  onClose()
}

const onContentClick = () => {
  // 由于中部弹出时，内容容器占据了整个页面相当于遮罩，此时需要发出遮罩点击事件
  if (props.position === 'center') {
    onOverlayClick()
  }
}

const onClose = () => {
  showTransition.value = false
  emit('close')
  if (_timer !== null) {
    clearTimeout(_timer)
  }
  _timer = setTimeout(() => {
    emit('update:show', false)
    emit('closed')
  }, +props.duration)
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-popup {
  position: fixed;
  z-index: 999;
  &--top,
  &--left,
  &--right {
    /* #ifdef H5 */
    top: var(--window-top);
    /* #endif */
    /* #ifndef H5 */
    top: 0;
    /* #endif */
  }
  &__content {
    position: relative;
    background-color: #fff;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    color: #969799;
  }
}
</style>
