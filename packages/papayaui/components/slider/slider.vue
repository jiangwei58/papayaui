<template>
  <view :class="ns.b('container')">
    <text v-if="showRange" :class="ns.e('min')">{{ formatVal(min) }}</text>
    <view
      :class="[ns.b(), ns.is('show-range', showRange), ns.is('disabled', disabled)]"
      :style="ns.style({ backgroundColor: inactiveColor })"
    >
      <view v-if="marks" :class="ns.e('mark')">
        <text
          v-for="(text, value) in marks"
          :key="value"
          :class="[ns.e('mark-text'), ns.is('mark-active', isWithinRange(value))]"
          :style="ns.style({ left: value + '%' })"
        >
          {{ text }}
          <text :class="ns.e('tick')"></text>
        </text>
      </view>

      <view :class="ns.e('bar')" :style="ns.style({ backgroundColor: activeColor })">
        <template v-for="(type, index) in ['left', 'right']" :key="type">
          <view
            v-if="index === 0 ? range : true"
            :class="[ns.e('button-wrapper'), ns.em('button-wrapper', type)]"
            :data-index="index"
            :props="wxsProps"
            :change:props="wxs.propsChange"
            :value="wxsModelValue"
            :change:value="wxs.modelValueChange"
            @touchstart="wxs.touchstart"
            @touchmove="wxs.touchmove"
            @touchend="wxs.touchend"
          >
            <slot v-if="$slots.button" name="button" />
            <view v-else :class="ns.e('button')">
              <text v-if="showTag" :class="ns.e('button-number')">{{
                Array.isArray(modelValue) ? formatVal(modelValue[index]) : formatVal(modelValue)
              }}</text>
            </view>
          </view>
        </template>
      </view>
    </view>
    <text v-if="showRange" :class="ns.e('max')">{{ formatVal(max) }}</text>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import useNamespace from '../../core/useNamespace'
import { sliderEmits, sliderProps } from './props'

export default defineComponent({
  props: sliderProps,
  emits: sliderEmits,
  setup(props, { emit }) {
    const ns = useNamespace('slider')

    let isDragging = false

    const wxsProps = computed(() => {
      return {
        mainClassName: ns.b(),
        barClassName: ns.e('bar'),
        disabled: props.disabled,
        range: props.range,
        min: props.min,
        max: props.max,
        step: props.step,
      }
    })

    const wxsModelValue = ref(props.modelValue)

    const isRange = computed(() => {
      return props.range && Array.isArray(props.modelValue)
    })

    const isWithinRange = (value: number) => {
      if (isRange.value) {
        const modelValues = props.modelValue as number[]
        return value >= modelValues[0] && value <= modelValues[1]
      }
      return value <= props.modelValue
    }

    const formatVal = (value: number) => {
      return typeof props.formatter === 'function' ? props.formatter(value) : value
    }

    const updateModelValue = (value: number | number[]) => {
      isDragging = true
      // TODO: wxs的bug，为0时会变成{}, 要特殊处理
      if (!isRange.value && typeof value !== 'number') {
        value = 0
      }
      emit('update:modelValue', value)
    }

    const emitChange = (value: number | number[]) => {
      isDragging = false
      wxsModelValue.value = value
      emit('change', value)
    }

    watch(
      () => props.modelValue,
      (newValue) => {
        if (!isDragging) {
          wxsModelValue.value = newValue
        }
      },
    )

    return {
      wxs: {} as any,
      ns,
      wxsProps,
      wxsModelValue,
      isWithinRange,
      formatVal,
      updateModelValue,
      emitChange,
    }
  },
})
</script>
<script module="wxs" lang="wxs">
var MAIN_WIDTH = 0
var MAIN_OFFSET_LEFT = 0

function getMainWidth(ownInstance, mainClassName) {
  if (MAIN_WIDTH) return MAIN_WIDTH
  var rect = ownInstance.selectComponent('.' + mainClassName).getBoundingClientRect()
  MAIN_WIDTH = rect.width
  MAIN_OFFSET_LEFT = rect.left
  return MAIN_WIDTH
}

function touchstart(event, ownInstance) {
  var instance = event.instance
  var state = instance.getState()
  if (state.disabled) return
  getMainWidth(ownInstance, state.mainClassName)
  state.index = instance.getDataset().index
}

function touchmove(event, ownInstance) {
  var instance = event.instance
  var state = instance.getState()
  if (state.disabled) return
  var touch = event.touches[0] || event.changedTouches[0]
  var moveX = touch.pageX - MAIN_OFFSET_LEFT
  if (moveX < 0) {
    moveX = 0
  } else if (moveX > MAIN_WIDTH) {
    moveX = MAIN_WIDTH
  }
  state.moveX = moveX
  var offset = calcLeftAndRightOffsetPercent(state)
  state._offset = offset
  updateStyle(ownInstance, state.barClassName, offset.left, offset.right)
  var newModelValue = state.range ? [
    calcValueByOffsetPercent(offset.left, state.min, state.max, state.step),
    calcValueByOffsetPercent(offset.right, state.min, state.max, state.step)
  ] : calcValueByOffsetPercent(offset.right, state.min, state.max, state.step)
  state._modelValue = newModelValue
  // 值没有变化不触发事件
  if (newModelValue.toString() !== state.__valueStr) {
    state.__valueStr = newModelValue.toString()
    ownInstance.callMethod('updateModelValue', newModelValue)
  }
  return false
}

function touchend(event, ownInstance) {
  var instance = event.instance
  var state = instance.getState()
  if (state.disabled) return
  ownInstance.callMethod('emitChange', state._modelValue)
}

function calcOffsetPercent(offsetX, width, step) {
  if (offsetX <= 0) return 0
  var percentage = Math.floor((offsetX / width) * 100)
  var remain = percentage % step
  percentage = percentage - remain + (remain >= step / 2 ? step : 0)
  return percentage
}

function calcValueByOffsetPercent(percentage, min, max, step) {
  var value = Math.floor(((max - min) * percentage) / 100 + min)
  value = value - (value % step)
  return value
}

function calcLeftAndRightOffsetPercent(state) {
  var percentage = calcOffsetPercent(state.moveX, MAIN_WIDTH, state.step)
  // if (percentage <= 0) return { left: 0, right: 0 }
  var left = 0
  var right = 0
  if (state.range) {
    left = state.index === 0 ? percentage : state.modelValue[0]
    right = state.index === 0 ? state.modelValue[1] : percentage
  } else {
    right = percentage
  }
  return left <= right ? { left, right } : { left: right, right: left }
}

function updateStyle(ownInstance, barClassName, leftOffsetPercent, rightOffsetPercent) {
  var width = rightOffsetPercent - leftOffsetPercent
  var left = leftOffsetPercent
  ownInstance.selectComponent('.' + barClassName).setStyle({
    width: width + '%',
    left: left + '%',
    transition: 'none 0s ease 0s',
  })
}

function propsChange(newValue, oldValue, ownInstance, instance) {
  if (typeof newValue === 'undefined') return
  var state = instance.getState()
  state.mainClassName = newValue.mainClassName
  state.barClassName = newValue.barClassName
  state.disabled = newValue.disabled
  state.range = newValue.range
  state.min = newValue.min
  state.max = newValue.max
  state.step = newValue.step
}

function modelValueChange(newValue, oldValue, ownInstance, instance) {
  if (typeof newValue === 'undefined') return
  var state = instance.getState()
  state.modelValue = newValue
  // TODO: wxs的bug，为0时会变成[object Object], 要特殊处理
  if (!state.range && typeof state.modelValue !== 'number') {
    state.modelValue = 0
  }
  var modelValues = state.range ? state.modelValue : [null, state.modelValue]
  var offset = [0, 0]
  for (var i = 0; i < modelValues.length; i++) {
    if (modelValues[i] === null) continue
    offset[i] = calcOffsetPercent(modelValues[i] - state.min, state.max - state.min, state.step)
  }
  updateStyle(ownInstance, state.barClassName, offset[0], offset[1])
}

module.exports = {
  touchstart: touchstart,
  touchmove: touchmove,
  touchend: touchend,
  propsChange: propsChange,
  modelValueChange: modelValueChange,
}
</script>

<style lang="scss">
@import './slider.scss';
</style>
