<template>
  <Popup
    v-model:show="visible"
    :custom-class="ns.b()"
    :width="getUnitValue(width, 'px')"
    position="center"
    round
    v-bind="{ zIndex, duration, closeOnClickOverlay, overlay, overlayStyle }"
    @open="emit('open')"
    @opened="emit('opened')"
    @close="emit('close')"
    @closed="emit('closed')"
  >
    <view v-if="title" :class="ns.e('header')">{{ title }}</view>

    <view :class="[ns.e('content'), ns.m(title ? 'has-title' : 'isolated')]">
      <slot v-if="$slots.default" />
      <view v-else :class="ns.e('message')">{{ message }}</view>
    </view>

    <view v-if="$slots.footer">
      <slot name="footer" />
    </view>
    <view
      v-else
      :class="[
        ns.e('footer'),
        ns.is('line-top', !roundButtonTheme),
        ns.is('round-button', roundButtonTheme),
      ]"
    >
      <ButtonComponent
        v-if="showCancelButton"
        :class="ns.e('cancel')"
        type="default"
        :plain="!roundButtonTheme"
        block
        :sync-click="onCancel"
      >
        {{ cancelButtonText }}
      </ButtonComponent>
      <ButtonComponent
        v-if="showConfirmButton"
        :class="ns.e('confirm')"
        :plain="!roundButtonTheme"
        block
        loading-text=""
        :sync-click="onConfirm"
      >
        {{ confirmButtonText }}
      </ButtonComponent>
    </view>
  </Popup>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../core'
import { getUnitValue } from '../../utils'
import ButtonComponent from '../button/button.vue'
import Popup from '../popup/popup.vue'
import { dialogEmits, dialogProps, type ActionType } from './props'

const ns = useNamespace('dialog')

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)

const visible = computed({
  get() {
    return props.show
  },
  set(val) {
    emit('update:show', val)
  },
})

const roundButtonTheme = computed(() => {
  return props.theme === 'round-button'
})

const onBeforeClose = (action: ActionType) => {
  if (typeof props.beforeClose !== 'function') {
    return onClose()
  }
  const result = props.beforeClose(action)
  // 判断结果是否promise，防止loading状态闪出
  if (result instanceof Promise) {
    return result.then((shouldClose) => {
      if (shouldClose) {
        onClose()
      }
    })
  } else if (result === true) {
    onClose()
  }
}

const onConfirm = () => {
  emit('confirm')
  return onBeforeClose('confirm')
}

const onCancel = () => {
  emit('cancel')
  return onBeforeClose('cancel')
}

const onClose = () => {
  visible.value = false
}
</script>

<style lang="scss">
@import './dialog.scss';
</style>
