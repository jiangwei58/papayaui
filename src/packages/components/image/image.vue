<template>
  <view
    :class="ns.b()"
    :style="
      ns.style({
        width: width && getUnitValue(width.toString()),
        height: height && getUnitValue(height.toString()),
        borderRadius: round === true ? getUnitValue('999') : getUnitValue(round || '0'),
      })
    "
    @tap="emit('click')"
  >
    <image
      :class="ns.e('img')"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      :webp="webp"
      :show-menu-by-longpress="showMenuByLongpress"
      @error="onError"
      @load="onLoad"
    />
    <view v-if="status === 'loading'" :class="ns.e('loading')">
      <slot v-if="$slots.loading" name="loading" />
      <Icon v-else name="image" size="32px" color="#dcdee0" />
    </view>
    <view v-if="status === 'error'" :class="ns.e('error')">
      <slot v-if="$slots.error" name="error" />
      <Icon v-else name="image-error" size="32px" color="#dcdee0" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import Icon from '../icon/icon.vue'
import { imageEmits, imageProps } from './props'

const ns = useNamespace('image')

defineProps(imageProps)
const emit = defineEmits(imageEmits)

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
