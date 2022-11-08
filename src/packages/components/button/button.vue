<template>
  <button
    :class="[computedClass('button'), `button--${type}`, plain ? `button--plain` : '']"
    :style="customStyle"
    :hover-class="computedClass('button--hover')"
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
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { getUnitValue } from '../../utils/common'
import { computed, ref, StyleValue } from 'vue'
import { computedClass } from '../../utils/style'

export interface ButtonProps {
  /** 按钮类型 */
  type?: 'primary' | 'warning' | 'danger' | 'default'
  /** 按钮宽度 */
  width?: string
  /** 按钮高度 */
  height?: string
  /** 字体大小 */
  fontSize?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 圆角大小, 值为true时半圆角 */
  round?: true | string
  /** 是否镂空样式 */
  plain?: boolean
  /** 同步点击（主要用于防止异步事件多次触发） */
  syncClick?: (...args: any[]) => any | Promise<any>
  /** 微信开放能力[文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) */
  openType?:
    | 'contact'
    | 'share'
    | 'getPhoneNumber'
    | 'getUserInfo'
    | 'launchApp'
    | 'openSetting'
    | 'feedback'
    | 'chooseAvatar'
  /** 按住后多久出现点击态，单位毫秒 */
  hoverStartTime?: number
  /** 手指松开后点击态保留时间，单位毫秒 */
  hoverStayTime?: number
  /** 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 */
  appParameter?: string
  /** 指定是否阻止本节点的祖先节点出现点击态 */
  hoverStopPropagation?: boolean
  /** 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。 */
  lang?: 'zh_CN' | 'zh_TW' | 'en'
  /** 会话来源，open-type="contact"时有效 */
  sessionFrom?: string
  /** 会话内消息卡片标题，open-type="contact"时有效 */
  sendMessageTitle?: string
  /** 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 */
  sendMessagePath?: string
  /** 会话内消息卡片图片，open-type="contact"时有效 */
  sendMessageImg?: string
  /** 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 */
  showMessageCard?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  width: '100%',
  height: '42px',
  fontSize: '16px',
  round: '4px',
  syncClick: undefined,
  openType: undefined,
  hoverStartTime: undefined,
  hoverStayTime: undefined,
  appParameter: undefined,
  lang: undefined,
  sessionFrom: undefined,
  sendMessageTitle: undefined,
  sendMessagePath: undefined,
  sendMessageImg: undefined,
})

const emit = defineEmits<{
  (event: 'click', value: Event): void
  (event: 'getphonenumber', res: any): void
  (event: 'getuserinfo', res: any): void
  (event: 'error', res: any): void
  (event: 'opensetting', res: any): void
  (event: 'launchapp', res: any): void
  (event: 'contact', res: any): void
  (event: 'chooseavatar', res: any): void
}>()

const localLoading = ref<boolean>()

const customStyle = computed<StyleValue>(() => {
  return {
    width: getUnitValue(props.width),
    lineHeight: getUnitValue(props.height),
    fontSize: getUnitValue(props.fontSize),
    borderRadius: props.round === true ? getUnitValue(props.height) : getUnitValue(props.round),
  }
})

const onClick = async (event: MouseEvent) => {
  if (typeof props.syncClick === 'function') {
    const result = props.syncClick()
    if (result instanceof Promise) {
      localLoading.value = true
      await result.finally(() => {
        localLoading.value = false
      })
    }
  } else {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-button {
  border: 1px solid transparent;
  box-sizing: border-box;
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #000;
    border: inherit;
    border-color: #000;
    border-radius: inherit;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: 0;
    content: ' ';
  }
  &::after {
    border: 0;
  }
  &.#{$prefix}-button--hover {
    &::before {
      opacity: 0.1;
    }
  }
  &.button--default {
    color: _var(color-text-black);
    background-color: transparent;
    border-color: #ebedf0;
  }
  &.button--primary {
    color: #fff;
    background-color: _var(color-primary);
    border-color: _var(color-primary);
    &.button--plain {
      color: _var(color-primary);
    }
  }
  &.button--warning {
    color: #fff;
    background-color: _var(color-warning);
    border-color: _var(color-warning);
    &.button--plain {
      color: _var(color-warning);
    }
  }
  &.button--danger {
    color: #fff;
    background-color: _var(color-danger);
    border-color: _var(color-danger);
    &.button--plain {
      color: _var(color-danger);
    }
  }
  &[plain] {
    background-color: transparent;
  }
  &[disabled]:not([type]) {
    color: _var(color-text-black);
    background-color: #c8c9cc;
    border-color: #c8c9cc;
  }
}
</style>
