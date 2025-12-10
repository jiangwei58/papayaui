<template>
  <view
    v-if="inited"
    :class="[ns.b(), customClass]"
    :style="mergeStyle"
    :options="options"
    :show="show"
    :change:options="wxs.onOptionsChange"
    :change:show="wxs.onShowChange"
    @tap="onClick"
    @touchmove="noop"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import { useNamespace, defaultNamespace } from '@papayaui/core'
import { noop } from '@papayaui/utils'
import { transitionEmits, transitionProps } from './props'

export default defineComponent({
  props: transitionProps,
  emits: transitionEmits,
  setup(props, { emit }) {
    const ns = useNamespace('transition')

    const state = reactive<{
      inited: boolean // 是否显示/隐藏组件
    }>({
      inited: false,
    })

    const options = computed(() => {
      return {
        mainClass: ns.b(),
        prefix: defaultNamespace,
        mode: props.mode,
        duration: +props.duration,
      }
    })

    const mergeStyle = computed(() => {
      return {
        transitionTimingFunction: props.timingFunction,
        ...props.customStyle,
      }
    })

    const onInit = async () => {
      state.inited = true
    }

    const beforeEnter = () => {
      emit('beforeEnter')
    }

    const enter = () => {
      emit('enter')
    }

    const afterEnter = () => {
      emit('afterEnter')
    }

    const beforeLeave = () => {
      emit('beforeLeave')
    }

    const leave = () => {
      emit('leave')
    }

    const afterLeave = () => {
      emit('afterLeave')
      if (props.destroyOnClose) {
        state.inited = false
      }
    }

    watch(
      () => props.show,
      (newVal) => {
        if (newVal) {
          onInit()
        }
      },
      {
        immediate: true,
      },
    )

    const onClick = () => {
      emit('click')
    }

    return {
      wxs: {} as any,
      ns,
      ...toRefs(state),
      options,
      mergeStyle,
      noop,
      onClick,
      beforeEnter,
      enter,
      afterEnter,
      beforeLeave,
      leave,
      afterLeave,
    }
  },
})
</script>
<script module="wxs" lang="wxs">
function getClassNames(name) {
  return {
    enter: name + '-enter ' + name + '-enter-active',
    'enter-to': name + '-enter-to ' + name + '-enter-active',
    leave: name + '-leave ' + name + '-leave-active',
    'leave-to': name + '-leave-to ' + name + '-leave-active',
  }
}

function onOptionsChange(newValue, _oldValue, _ownInstance, instance) {
  if (typeof newValue === 'undefined') return
  var state = instance.getState()
  state.mainClass = newValue.mainClass
  state.prefix = newValue.prefix
  state.mode = newValue.mode
  state.duration = newValue.duration
}

function onShowChange(newValue, _oldValue, ownInstance, instance) {
  if (typeof newValue === 'undefined') return
  var state = instance.getState()
  var classNames = getClassNames(state.prefix + '-' + state.mode)
  classNames.hide = state.mainClass + '-hide'

  if (newValue) {
    enter(ownInstance, instance, classNames)
  } else {
    leave(ownInstance, instance, classNames)
  }
}

function compatible(instance) {
  // #ifdef H5
  instance.setStyle = function (style) {
    Object.keys(style).forEach((key) => {
      this.$el.style[key] = style[key]
    })
  }
  instance.addClass = function (className) {
    this.$el.classList.add(...className.split(' '))
  }
  instance.removeClass = function (className) {
    this.$el.classList.remove(...className.split(' '))
  }
  // #endif
}

function enter(ownInstance, instance, classNames) {
  compatible(instance)
  var state = instance.getState()
  var clearClassNames = [classNames.hide, classNames.leave, classNames['leave-to']]
  clearClassNames.forEach(function (className) {
    instance.removeClass(className)
  })
  // 进入前
  state._status = 'enter'
  ownInstance.callMethod('beforeEnter')
  instance.setStyle({
    'transition-duration': '0ms',
  })
  // 进入动画
  ownInstance.callMethod('enter')
  instance.addClass(classNames.enter)

  instance.requestAnimationFrame(function () {
    instance.removeClass(classNames.enter)
    instance.setStyle({
      'transition-duration': state.duration + 'ms',
    })
    // 进入动画中
    instance.addClass(classNames['enter-to'])
    state.transitionEnded = false

    instance.setTimeout(function () {
      if (state._status !== 'enter') return
      // 进入动画完成
      instance.removeClass(classNames['enter-to'])
      ownInstance.callMethod('afterEnter')
    }, state.duration)
  })
}

function leave(ownInstance, instance, classNames) {
  var state = instance.getState()
  var clearClassNames = [classNames.enter, classNames['enter-to']]
  clearClassNames.forEach(function (className) {
    instance.removeClass(className)
  })
  // 离开前
  state._status = 'leave'
  ownInstance.callMethod('beforeLeave')

  instance.requestAnimationFrame(function () {
    // 离开动画
    ownInstance.callMethod('leave')
    instance.addClass(classNames.leave)

    instance.requestAnimationFrame(function () {
      instance.removeClass(classNames.leave)
      // 离开动画中
      instance.addClass(classNames['leave-to'])
      state.transitionEnded = false

      instance.setTimeout(function () {
        if (state._status !== 'leave') return
        if (state.transitionEnded) return
        state.transitionEnded = true
        // 离开动画完成
        instance.removeClass(classNames['leave-to'])
        instance.addClass(classNames.hide)
        ownInstance.callMethod('afterLeave')
      }, state.duration)
    })
  })
}

module.exports = {
  onOptionsChange: onOptionsChange,
  onShowChange: onShowChange,
}
</script>

<style lang="scss">
@import './transition.scss';
</style>
