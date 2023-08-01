<template>
  <button
    :class="[ns.b(), ns.m(type), ns.m(size), ns.is('block', block), ns.is('plain', plain)]"
    :style="customStyle"
    :hover-class="ns.m('hover')"
    :disabled="disabled"
    :plain="plain"
    :open-type="openType"
    @getphonenumber="emit('getphonenumber', $event)"
    @getuserinfo="emit('getuserinfo', $event)"
    @error="emit('error', $event)"
    @opensetting="emit('opensetting', $event)"
    @launchapp="emit('launchapp', $event)"
    @contact="emit('contact', $event)"
    @chooseavatar="emit('chooseavatar', $event)"
    @tap="onClick"
  >
    <view :class="ns.e('content')">
      <Loadmore
        v-if="localLoading"
        class="mr-4"
        status="loading"
        color="inherit"
        icon-size="1.2em"
        :show-text="false"
      />
      <Icon
        v-if="icon && !localLoading"
        :class="{ 'mr-4': $slots.default }"
        :name="icon"
        size="1.2em"
        color="inherit"
        style="font-size: inherit"
      />
      <slot />
    </view>
  </button>
</template>

<script lang="ts" setup>
import type { CSSProperties, StyleValue } from 'vue'
import { computed, ref } from 'vue'
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import Icon from '../icon/icon.vue'
import Loadmore from '../loadmore/loadmore.vue'
import { buttonEmits, buttonProps } from './props'

const ns = useNamespace('button')

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const clickLoading = ref<boolean>()
const localLoading = computed(() => props.loading || clickLoading.value)

const customStyle = computed<StyleValue>(() => {
  const style: CSSProperties = {
    ...props.customStyle,
  }
  if (props.width) {
    style.width = props.block
      ? getUnitValue(props.width === 'auto' ? '100%' : props.width)
      : getUnitValue(props.width)
  }
  if (props.height) {
    style.height = getUnitValue(props.height)
  }
  if (props.fontSize) {
    style.fontSize = getUnitValue(props.fontSize)
  }
  if (props.round) {
    style.borderRadius = props.round === true ? '100px' : getUnitValue(props.round)
  }
  return style
})

const onClick = async (event: MouseEvent) => {
  if (clickLoading.value) return
  if (typeof props.syncClick === 'function') {
    const result = props.syncClick()
    if (result instanceof Promise) {
      clickLoading.value = true
      result.finally(() => {
        clickLoading.value = false
      })
    }
  } else {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
@import './button.scss';
</style>
