<template>
  <UniPopup
    ref="popupRef"
    type="bottom"
    :is-mask-click="maskCloseAble"
    :safe-area="safeArea"
    @change="onChange"
  >
    <view class="popup-wrapper flex flex-col" :style="{ height: getUnitValue(height) }">
      <view class="header width-full flex items-center justify-center flex-shrink-0">
        <text class="text-32 leading-40 text-block font-w-500 mr-8">{{ title }}</text>
        <slot name="after-title"></slot>
        <view
          class="close-icon-wrapper flex items-center"
          @click="onChange({ show: false, type: '' })"
        >
          <!-- <view class="close-icon"></view> -->
          <Icon name="close" size="24px" />
        </view>
      </view>

      <view class="flex flex-col flex-1" style="overflow: hidden">
        <view class="flex-1" style="overflow: hidden">
          <slot></slot>
        </view>

        <view v-if="$slots.footer" class="footer">
          <slot name="footer"></slot>
        </view>
      </view>
    </view>
  </UniPopup>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'
import UniPopup from '../uni-popup/uni-popup.vue'
import { getUnitValue } from '../../utils/common'
import Icon from '../icon/icon.vue'

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

watch(
  modelValue,
  (newVal) => {
    if (newVal) {
      popupRef.value?.open()
    } else {
      popupRef.value?.close()
    }
  },
  {
    immediate: true,
  },
)

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

  .header {
    position: relative;
    height: 96rpx;
  }

  .close-icon-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: 0 26rpx;
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

  .footer {
    width: 100%;
    flex-shrink: 0;
  }
}
</style>
