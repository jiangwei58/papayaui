<template>
  <Popup
    :custom-class="computedClass('bottom-popup')"
    :show="show"
    position="bottom"
    :height="height"
    :z-index="zIndex"
    :overlay="overlay"
    :bg-color="bgColor"
    :closeable="closeable"
    :round="round"
    :close-on-click-overlay="maskCloseAble"
    :safe-area-inset-bottom="false"
    @update:show="emit('update:show', !!$event)"
  >
    <view
      class="flex flex-col"
      :class="[
        computedClass('bottom-popup__wrapper'),
        { 'safe-bottom-padding': safeAreaInsetBottom },
      ]"
    >
      <view
        :class="computedClass('bottom-popup__header')"
        class="width-full flex items-center justify-center flex-shrink-0"
      >
        <slot name="before-title"></slot>
        <text class="text-32 leading-40 text-block font-w-500 mr-8">{{ title }}</text>
        <slot name="after-title"></slot>
      </view>

      <view class="flex flex-col flex-1" style="overflow: hidden">
        <view class="flex-1" style="overflow: hidden">
          <slot></slot>
        </view>

        <view v-if="$slots.footer" :class="computedClass('bottom-popup__footer')">
          <slot name="footer"></slot>
        </view>
      </view>
    </view>
  </Popup>
</template>

<script lang="ts" setup>
import { CSSProperties, toRefs } from 'vue'
import { computedClass } from '../../utils/style'
import Popup from '../popup/popup.vue'

export interface BottomPopupProps {
  /** 是否显示弹窗 */
  show: boolean
  /** 标题 */
  title?: string
  /** 弹窗高度 */
  height?: string
  /** z-index层级 */
  zIndex?: number
  /** 是否显示遮罩 */
  overlay?: boolean
  /** 背景色 */
  bgColor?: CSSProperties['background-color']
  /** 是否圆角 */
  round?: boolean | string
  /** 是否显示关闭按钮 */
  closeable?: boolean
  /** 是否可以点击空白处关闭 */
  maskCloseAble?: boolean
  /** 是否留出底部安全距离 */
  safeAreaInsetBottom?: boolean
}

const props = withDefaults(defineProps<BottomPopupProps>(), {
  show: false,
  title: undefined,
  height: '80vh',
  zIndex: undefined,
  overlay: undefined,
  bgColor: undefined,
  round: true,
  closeable: true,
  maskCloseAble: true,
  safeAreaInsetBottom: true,
})

const { show } = toRefs(props)

const emit = defineEmits<{
  (event: 'update:show', value: BottomPopupProps['show']): void
}>()
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-bottom-popup {
  &__wrapper {
    position: relative;
    height: 100%;
    border-radius: 24rpx 24rpx 0 0;
  }

  &__header {
    position: relative;
    height: 88rpx;
  }

  &__footer {
    width: 100%;
    flex-shrink: 0;
  }
}
</style>
