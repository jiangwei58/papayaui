<template>
  <view
    :class="computedClass('image')"
    :style="
      computedStyle({
        width: width && getUnitValue(width.toString()),
        height: height && getUnitValue(height.toString()),
        borderRadius: round === true ? getUnitValue('999') : getUnitValue(round || '0'),
      })
    "
  >
    <image
      :class="computedClass('image__img')"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      :show-menu-by-longpress="showMenuByLongpress"
      @error="onError"
      @load="onLoad"
    />
    <view v-if="status === 'loading'" :class="computedClass('image__loading')">
      <slot v-if="$slots.loading" name="loading" />
      <text v-else>loading</text>
    </view>
    <view v-if="status === 'error'" :class="computedClass('image__error')">
      <slot v-if="$slots.error" name="error" />
      <text v-else>error</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getUnitValue } from '../../utils'
import { computedClass, computedStyle } from '../../utils/style'

interface ImageProps {
  /** 图片资源地址 */
  src?: string
  /** 图片裁剪、缩放的模式[详细地址](https://uniapp.dcloud.net.cn/component/image.html) */
  mode?: string
  /** 宽度 */
  width?: string | number
  /** 高度 */
  height?: string | number
  /** 圆角 */
  round?: boolean | string
  /** 图片懒加载 */
  lazyLoad?: boolean
  /** 开启长按图片显示识别小程序码菜单 */
  showMenuByLongpress?: boolean
}

withDefaults(defineProps<ImageProps>(), {
  src: '',
  mode: 'scaleToFill',
  width: undefined,
  height: undefined,
  round: undefined,
})

const status = ref<'success' | 'loading' | 'error'>('loading')

const onError = () => {
  status.value = 'error'
}

const onLoad = () => {
  status.value = 'success'
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-image {
  position: relative;
  display: inline-block;
  &__img {
    width: inherit;
    height: inherit;
    border-radius: inherit;
  }
  &__loading,
  &__error {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #f7f8fa;
    border-radius: inherit;
  }
}
</style>
