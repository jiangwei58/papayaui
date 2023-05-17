<template>
  <Popup
    :custom-class="ns.b()"
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
    <view :class="[ns.e('wrapper'), { 'safe-bottom-padding': safeAreaInsetBottom }]">
      <view :class="ns.e('header')">
        <slot name="before-title"></slot>
        <text :class="ns.e('title')">{{ title }}</text>
        <slot name="after-title"></slot>
      </view>

      <view :class="ns.e('body')">
        <view class="flex-1" style="overflow: hidden">
          <slot></slot>
        </view>

        <view v-if="$slots.footer" :class="ns.e('footer')">
          <slot name="footer"></slot>
        </view>
      </view>
    </view>
  </Popup>
</template>

<script lang="ts" setup>
import { CSSProperties, toRefs } from 'vue'
import useNamespace from '../../core/useNamespace'
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

const ns = useNamespace('bottom-popup')

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
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 24rpx 24rpx 0 0;
  }

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 100%;
    height: 88rpx;
  }
  &__title {
    font-size: 32rpx;
    line-height: 40rpx;
    color: _var(color-black);
    font-weight: 500;
    margin-right: 8rpx;
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  &__footer {
    width: 100%;
    flex-shrink: 0;
  }
}
</style>
