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
import useNamespace, { defaultNamespace } from '../../core/useNamespace'
import { noop } from '../../utils'
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
<script module="wxs" lang="wxs" src="./transition.wxs"></script>

<style lang="scss">
@import './transition.scss';
</style>
