<template>
  <view v-if="show" :class="[computedClass('popup'), popupClass]">
    <uni-transition
      key="1"
      name="mask"
      mode-class="fade"
      :styles="maskStyle"
      :duration="duration"
      :show="showTrans"
      @click="onMaskTap"
    />
    <uni-transition
      key="2"
      :mode-class="animateType"
      name="content"
      :styles="transStyle"
      :duration="duration"
      :show="showTrans"
    >
      <view
        :class="[computedClass('popup__wrapper'), popupClass]"
        :style="popupWrapperStyle"
        @click="onClear"
      >
        <view v-if="closeable" :class="computedClass('popup__close')" @click="onClose">
          <Icon name="close" size="24px" />
        </view>
        <slot />
      </view>
    </uni-transition>
  </view>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, ref, toRefs, watch } from 'vue'
import { computedClass } from '../../utils/style'
import Icon from '../icon/icon.vue'
import UniTransition from '../uni-transition/uni-transition.vue'

export type PopupPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

export interface PopupProps {
  show?: boolean
  /** 弹出方式 */
  position?: PopupPosition
  /** 弹出宽度 */
  width?: string
  /** 弹窗高度 */
  height?: string
  /** 蒙版点击是否关闭弹窗 */
  isMaskClick?: boolean
  /** 是否适配底部安全区 */
  safeAreaInsetBottom?: boolean
  /** 背景色 */
  bgColor?: CSSProperties['background-color']
  /** 是否圆角 */
  round?: boolean
  /** 是否显示关闭按钮 */
  closeable?: boolean
}

const props = withDefaults(defineProps<PopupProps>(), {
  show: false,
  position: 'bottom',
  width: '60vw',
  height: '60vh',
  isMaskClick: true,
  bgColor: '#fff',
})

const emit = defineEmits<{
  (event: 'maskClick'): void
  (event: 'update:show', value: PopupProps['show']): void
  (event: 'change', value: PopupProps['show']): void
}>()

const { show } = toRefs(props)

let _timer: number | null = null
const showTrans = ref<boolean>(false)
const duration = ref<number>(300)

watch(
  show,
  (newVal) => {
    showTrans.value = newVal
  },
  {
    immediate: true,
  },
)

const maskStyle = computed<CSSProperties>(() => {
  return {
    position: 'fixed',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  }
})
const transStyle = computed<CSSProperties>(() => {
  const typeStyleObj: { [key in PopupPosition]: CSSProperties } = {
    top: { top: 0, left: 0, right: 0 },
    bottom: { left: 0, right: 0, bottom: 0 },
    left: { top: 0, left: 0, bottom: 0 },
    right: { top: 0, right: 0, bottom: 0 },
    center: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }
  return {
    position: 'fixed',
    ...typeStyleObj[props.position],
  }
})

const animateType = computed<string[]>(() => {
  const animateObj: { [key in PopupPosition]: string[] } = {
    top: ['slide-top'],
    bottom: ['slide-bottom'],
    left: ['slide-left'],
    right: ['slide-right'],
    center: ['zoom-out', 'fade'],
  }
  return animateObj[props.position]
})

const popupClass = computed(() => {
  return props.position
})

const popupWrapperStyle = computed<CSSProperties>(() => {
  const radiusObj: { [key in PopupPosition]: CSSProperties['border-radius'] } = {
    top: '0 0 16px 16px',
    bottom: '16px 16px 0 0',
    left: '0 16px 16px 0',
    right: '16px 0 0 16px',
    center: '16px',
  }
  return {
    width: ['left', 'right', 'center'].includes(props.position) ? props.width : '100vw',
    height: ['top', 'bottom', 'center'].includes(props.position) ? props.height : '100vh',
    backgroundColor: props.bgColor,
    borderRadius: props.round ? radiusObj[props.position] : 0,
  }
})

const onMaskTap = () => {
  emit('maskClick')
  if (!props.isMaskClick) return
  onClose()
}

const onClose = () => {
  showTrans.value = false
  emit('change', false)
  if (_timer !== null) {
    clearTimeout(_timer)
  }
  _timer = setTimeout(() => {
    emit('update:show', false)
  }, 300)
}

const onClear = (e: Event) => {
  // #ifndef APP-NVUE
  e.stopPropagation()
  // #endif
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-popup {
  position: fixed;
  z-index: 999;
  &.top,
  &.left,
  &.right {
    /* #ifdef H5 */
    top: var(--window-top);
    /* #endif */
    /* #ifndef H5 */
    top: 0;
    /* #endif */
  }
  .#{$prefix}-popup__wrapper {
    position: relative;
  }

  .#{$prefix}-popup__close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
  }
}
</style>
