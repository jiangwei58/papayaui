<template>
  <view
    :class="computedClass('swipe-cell')"
    :status="status"
    :change:status="wxs.statusChange"
    :extra="extraParams"
    :change:extra="wxs.extraChange"
    @touchstart="wxs.touchstart"
    @touchmove="wxs.touchmove"
    @touchend="wxs.touchend"
  >
    <view :class="computedClass('swipe-cell__content')">
      <slot />
    </view>
    <view :class="computedClass('swipe-cell__right')">
      <slot v-if="$slots.right" name="right" />
      <template v-else>
        <ButtonComponent
          v-for="(item, index) in options"
          :key="item.text + index"
          type="danger"
          :width="item.style && item.style.width ? getUnitValue(item.style.width) : '60px'"
          height="100%"
          round="0"
          :custom-style="{
            backgroundColor: item.style
              ? item.style.backgroundColor
              : `var(--${PREFIX}-color-danger)`,
            borderColor: item.style ? item.style.backgroundColor : `var(--${PREFIX}-color-danger)`,
          }"
          @click="onBtnClick(index)"
        >
          {{ item.text }}
        </ButtonComponent>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
import {
  CSSProperties,
  defineComponent,
  getCurrentInstance,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue'
import useRect from '../../hooks/useRect'
import { getUnitValue } from '../../utils'
import { computedClass, PREFIX } from '../../utils/style'
import ButtonComponent from '../button/button.vue'

export type SwipeCellOption = {
  text: string
  style?: Partial<{ width: string; backgroundColor: CSSProperties['background-color'] }>
}

export interface SwipeCellProps {
  /** 标识名 */
  name?: string
  /** 控制打开或者关闭 */
  show?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 滑动距离阈值，只有大于此值，才被认为是要打开菜单 */
  threshold?: number
  /** 右侧按钮内容 */
  options?: SwipeCellOption[]
}

export default defineComponent({
  components: {
    ButtonComponent,
  },
  props: {
    name: {
      type: String as PropType<SwipeCellProps['name']>,
      default: '',
    },
    show: {
      type: Boolean as PropType<SwipeCellProps['show']>,
      default: false,
    },
    disabled: {
      type: Boolean as PropType<SwipeCellProps['disabled']>,
      default: false,
    },
    threshold: {
      type: Number as PropType<SwipeCellProps['threshold']>,
      default: 20,
    },
    options: {
      type: Array as PropType<SwipeCellProps['options']>,
      default: () => [],
    },
  },
  emits: ['open', 'close', 'click'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()

    const status = ref<'open' | 'close'>(props.show ? 'open' : 'close')

    const extraParams = ref({
      btnsWidth: 0,
      disabled: props.disabled,
      threshold: props.threshold,
    })

    const onUpdateExtraParams = () => {
      if (!instance) return
      useRect(instance, '.' + computedClass('swipe-cell__right')).then((res) => {
        if (!res) return
        extraParams.value = {
          btnsWidth: res.width || 0,
          disabled: props.disabled,
          threshold: props.threshold,
        }
      })
    }

    const onBtnClick = (index: number) => {
      emit('click', props.name, index)
    }

    onMounted(() => {
      onUpdateExtraParams()
    })

    watch(
      () => props.show,
      (newVal) => {
        status.value = newVal ? 'open' : 'close'
      },
    )

    return {
      PREFIX,
      status,
      extraParams,
      computedClass,
      getUnitValue,
      onBtnClick,
    }
  },
})
</script>
<script module="wxs" lang="wxs">
function touchstart(event, _ownInstance) {
  var instance = event.instance
  // wxs内的局部变量快照，此快照是属于整个组件的，在touchstart和touchmove事件中都能获取到相同的结果
  var state = instance.getState()
  if (state.disabled) return
  var touch = event.touches[0] || event.changedTouches[0]
  state.startX = touch.pageX
  state.lastStartX = state.lastStartX || 0
  state.isStarted = true
}

function touchmove(event, ownInstance) {
  var instance = event.instance
  var state = instance.getState()
  if (state.disabled) return
  var touch = event.touches[0] || event.changedTouches[0]
  var pageX = touch.pageX
  var moveX = pageX - state.startX + state.lastStartX
  if (moveX >= 0) {
    moveX = 0
  } else if (moveX <= -state.btnsWidth) {
    moveX = -state.btnsWidth
  }
  state.moveX = moveX
  updateMoveX(state, instance, ownInstance)
  return false
}

function touchend(event, ownInstance) {
  var instance = event.instance
  var state = instance.getState()

  var offsetX = state.moveX - state.lastStartX
  if (offsetX > 0) { // 右划
    state.moveX = offsetX >= state.threshold ? 0 : -state.btnsWidth
  } else {  // 左划
    state.moveX = state.moveX <= -state.threshold ? -state.btnsWidth : 0
  }
  state.lastStartX = state.moveX
  state.isStarted = false
  updateMoveX(state, instance, ownInstance)
}

function updateMoveX(state, instance, _ownInstance) {
  instance.requestAnimationFrame(function () {
    instance.setStyle({
      transition: 'transform ' + (state.isStarted ? '0s' : '0.6s'),
      transform: 'translate3d(' + state.moveX + 'px, 0px, 0px)',
    })
  })
}

// 标记菜单的当前状态，open-已经打开，close-已经关闭
function setStatus(status, instance, ownerInstance) {
	var state = instance.getState()
	state.status = status
  // ownerInstance.callMethod('setState', status)
}

function statusChange(newValue, oldValue, ownerInstance, instance) {
  console.log(JSON.stringify(newValue))
  if (typeof newValue === 'undefined') return
  var state = instance.getState()
	if (state.disabled) return
  setStatus(newValue, instance, ownerInstance)
  state.moveX = newValue === 'open' ? -state.btnsWidth : 0
  state.lastStartX = state.moveX
  state.isStarted = false
  updateMoveX(state, instance, ownerInstance)
}

function extraChange(newValue, oldValue, ownerInstance, instance) {
  if (typeof newValue === 'undefined') return
  var state = instance.getState()
  state.btnsWidth = newValue.btnsWidth
  state.disabled = newValue.disabled
  state.threshold = newValue.threshold
}

module.exports = {
  touchstart: touchstart,
  touchmove: touchmove,
  touchend: touchend,
  statusChange: statusChange,
  extraChange: extraChange,
}
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';

.#{$prefix}-swipe-cell {
  position: relative;
  // overflow: hidden;
  touch-action: pan-y;
  &__content {
    position: relative;
    z-index: 2;
    transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1);
    transition-property: transform;
  }
  &__right {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
