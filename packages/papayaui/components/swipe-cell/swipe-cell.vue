<template>
  <view :class="ns.b()" @tap="onClick">
    <view
      :class="ns.e('wrapper')"
      :status="status"
      :change:status="wxs.statusChange"
      :extra="extraParams"
      :change:extra="wxs.extraChange"
      @touchstart="wxs.touchstart"
      @touchmove="wxs.touchmove"
      @touchend="wxs.touchend"
    >
      <view :class="ns.e('content')">
        <slot />
      </view>
      <view :class="ns.e('right')">
        <slot v-if="$slots.right" name="right" />
        <template v-else>
          <ButtonComponent
            v-for="(item, index) in options"
            :key="item.text + index"
            type="danger"
            :width="item.style && item.style.width ? getUnitValue(item.style.width) : '60px'"
            height="100%"
            :round="item.style?.borderRadius ?? '0'"
            :custom-style="{
              backgroundColor: item.style
                ? item.style.backgroundColor
                : `var(--${defaultNamespace}-color-danger)`,
              borderColor: item.style
                ? item.style.backgroundColor
                : `var(--${defaultNamespace}-color-danger)`,
            }"
            @click="onBtnClick(index)"
          >
            {{ item.text }}
          </ButtonComponent>
        </template>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import useRect from '../../hooks/useRect'
import { getUnitValue } from '../../utils'
import ButtonComponent from '../button/button.vue'
import type { SwipeCellStatus } from './props'
import { swipeCellEmits, swipeCellProps } from './props'

export default defineComponent({
  components: {
    ButtonComponent,
  },
  props: swipeCellProps,
  emits: swipeCellEmits,
  setup(props, { emit }) {
    const ns = useNamespace('swipe-cell')

    const instance = getCurrentInstance()

    const status = ref<SwipeCellStatus>(props.show ? 'open' : 'close')

    const extraParams = ref({
      btnsWidth: 0,
      disabled: props.disabled,
      threshold: props.threshold,
    })

    const onUpdateExtraParams = () => {
      if (!instance) return
      useRect(instance, '.' + ns.e('right')).then((res) => {
        if (!res) return
        extraParams.value = {
          btnsWidth: res.width || 0,
          disabled: props.disabled,
          threshold: props.threshold,
        }
      })
    }

    const setStatus = (newStatus: SwipeCellStatus) => {
      status.value = newStatus
      emit(newStatus as 'open')
    }

    const onClick = async () => {
      status.value = 'close'
    }

    const onBtnClick = (index: number) => {
      const currentOption = props.options[index]
      if (typeof currentOption.click === 'function') {
        currentOption.click(props.name)
      }
      emit('click', props.name, index, currentOption)
    }

    onMounted(() => {
      onUpdateExtraParams()
    })

    watch(
      () => props.show,
      (newVal) => {
        setStatus(newVal ? 'open' : 'close')
      },
    )

    watch([() => props.threshold, () => props.options], () => {
      onUpdateExtraParams()
    })

    return {
      wxs: {} as any, // 防止类型报错
      ns,
      defaultNamespace,
      status,
      extraParams,
      getUnitValue,
      setStatus,
      onClick,
      onBtnClick,
    }
  },
})
</script>
<script module="wxs" lang="wxs">
var MIN_DISTANCE = 10;

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }
  return '';
}

function touchstart(event, _ownInstance) {
  var instance = event.instance
  // wxs内的局部变量快照，此快照是属于整个组件的，在touchstart和touchmove事件中都能获取到相同的结果
  var state = instance.getState()
  if (state.disabled) return
  state.direction = ''
  var touch = event.touches[0] || event.changedTouches[0]
  state.startX = touch.pageX
  state.startY = touch.pageY
  state.lastStartX = state.lastStartX || 0
  state.isStarted = true
}

function touchmove(event, ownInstance) {
  var instance = event.instance
  var state = instance.getState()
  if (state.disabled) return
  var touch = event.touches[0] || event.changedTouches[0]
  var offsetX = touch.pageX - state.startX
  var offsetY = touch.pageY - state.startY
  var moveX = offsetX + state.lastStartX
  if (moveX >= 0) {
    moveX = 0
  } else if (moveX <= -state.btnsWidth) {
    moveX = -state.btnsWidth
  }
  state.moveX = moveX
  state.direction = state.direction || getDirection(Math.abs(offsetX), Math.abs(offsetY))
  // 防止横向和纵向同时滑动
  if (state.direction !== 'horizontal') return
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
  setStatus(state.moveX === 0 ? 'close' : 'open',instance, ownInstance)
}

function updateMoveX(state, instance, _ownInstance) {
  instance.requestAnimationFrame(function () {
    instance.setStyle({
      transition: 'transform ' + (state.isStarted ? '0s' : '0.6s') + ' cubic-bezier(0.18, 0.89, 0.32, 1)',
      transform: 'translate3d(' + state.moveX + 'px, 0px, 0px)',
    })
  })
}

// 标记菜单的当前状态，open-已经打开，close-已经关闭
function setStatus(status, instance, ownerInstance) {
	var state = instance.getState()
  if (state.status !== status) {
    state.status = status
    ownerInstance.callMethod('setStatus', status)
  }
}

function statusChange(newValue, oldValue, ownerInstance, instance) {
  if (typeof newValue === 'undefined') return
  var state = instance.getState()
	if (state.disabled) return
  state.moveX = newValue === 'open' ? -state.btnsWidth : 0
  state.lastStartX = state.moveX
  state.isStarted = false
  updateMoveX(state, instance, ownerInstance)
  setStatus(newValue, instance, ownerInstance)
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

<style lang="scss">
@import './swipe-cell.scss';
</style>
