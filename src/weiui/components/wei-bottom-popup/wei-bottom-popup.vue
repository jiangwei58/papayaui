<template>
  <UniPopup
    ref="popupRef"
    type="bottom"
    :is-mask-click="maskCloseAble"
    :safe-area="safeArea"
    @change="onChange"
  >
    <view class="popup-wrapper flex flex-col" :style="{ height: getUnitValue(height) }">
      <view class="header width-full flex items-center justify-center border-bottom py-26">
        <text class="text-32 leading-40 text-block font-w-500 mr-8">{{ title }}</text>
        <slot name="after-title"></slot>
        <view class="close-icon-wrapper">
          <view class="close-icon"></view>
        </view>
      </view>

      <view class="popup-body width-full height-full px-26">
        <slot></slot>
        <!-- <tob-button class="btn" shape="circle" @click="$emit('ok')">{{ btnText }}</tob-button> -->
      </view>
      <WeiSafeBottom />
    </view>
  </UniPopup>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'
import UniPopup from '../uni-popup/uni-popup.vue'
import { getUnitValue } from '../../utils/common'
import WeiSafeBottom from '../wei-safe-bottom/wei-safe-bottom.vue'

interface OwnProps {
  modelValue: boolean
  title?: string
  height?: string
  maskCloseAble?: boolean
  btnText?: string
  safeArea?: boolean
}

const props = withDefaults(defineProps<OwnProps>(), {
  modelValue: false,
  title: undefined,
  height: '80vh',
  maskCloseAble: true,
  btnText: '确定',
  safeArea: false,
})

const { modelValue } = toRefs(props)

const emit = defineEmits<{
  (event: 'update:modelValue', value: OwnProps['modelValue']): void
}>()

const popupRef = ref()

watch(modelValue, (newVal) => {
  if (newVal) {
    popupRef.value?.open()
  } else {
    popupRef.value?.close()
  }
})

const onChange = ({ show }: { show: boolean; type: string }) => {
  if (!show) {
    emit('update:modelValue', false)
  }
}
</script>

<style lang="scss" scoped>
.popup-wrapper {
  position: relative;
  height: 100%;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;

  .close-icon-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    padding: 26rpx;
  }
  .close-icon {
    $iconSize: 32rpx;
    position: relative;
    width: $iconSize;
    height: $iconSize;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 4rpx;
      margin-top: 2rpx;
      border-radius: 5rpx;
      background-color: #969799;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }

  .btn {
    position: absolute;
    left: 24rpx;
    right: 24rpx;
    bottom: 26rpx;
  }
}
</style>
