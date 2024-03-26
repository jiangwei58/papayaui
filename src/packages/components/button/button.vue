<template>
  <button
    :id="buttonId"
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.is('block', block),
      ns.is('plain', plain),
      ns.is('ellipsis', ellipsis),
    ]"
    :style="customStyle"
    :hover-class="ns.m('hover')"
    :disabled="disabled"
    :open-type="openType"
    @getphonenumber="emit('getphonenumber', $event)"
    @getuserinfo="emit('getuserinfo', $event)"
    @error="emit('error', $event)"
    @opensetting="emit('opensetting', $event)"
    @launchapp="emit('launchapp', $event)"
    @contact="emit('contact', $event)"
    @chooseavatar="emit('chooseavatar', $event)"
    @getrealtimephonenumber="emit('getrealtimephonenumber', $event)"
    @agreeprivacyauthorization="emit('agreeprivacyauthorization', $event)"
    @tap="onClick"
  >
    <view :class="ns.e('content')">
      <LoadingIcon v-if="localLoading" :class="ns.e('loading-icon')" color="inherit" size="1.2em" />
      <IconComponent v-if="icon && !localLoading" :class="[ns.e('icon')]" :name="icon" />
      <view v-if="$slots.default" :class="ns.e('text')">
        <template v-if="localLoading && !isUndefined(loadingText)">{{ loadingText }}</template>
        <slot v-else />
      </view>
    </view>
  </button>
</template>

<script lang="ts" setup>
import type { CSSProperties, StyleValue } from 'vue'
import { computed, ref } from 'vue'
import useNamespace from '../../core/useNamespace'
import { getUnitValue, isUndefined } from '../../utils'
import IconComponent from '../icon/icon.vue'
import LoadingIcon from '../loading-icon/loading-icon.vue'
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

<style lang="scss">
@import './button.scss';
</style>
