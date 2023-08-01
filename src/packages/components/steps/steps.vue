<template>
  <view :class="[ns.b(), ns.b(direction)]">
    <view
      v-for="(item, index) in steps"
      :key="index"
      :class="[ns.b('item'), ns.bm('item', getStatus(index))]"
      @tap="emit('click-step', index)"
    >
      <view :class="ns.b('item-head')" :style="ns.style({ height: headHeights[index] })">
        <view :class="[ns.b('item-line'), { custom: $slots.icon }]"></view>
        <view :class="ns.b('item-wrapper')">
          <slot
            v-if="$slots.icon"
            name="icon"
            :item="item"
            :index="index"
            :status="getStatus(index)"
          />
          <view v-else :class="ns.b('item-icon')">
            <Icon v-if="index < current" name="success" />
            <text v-else>{{ index + 1 }}</text>
          </view>
        </view>
      </view>
      <view :class="ns.b('item-content')">
        <view :class="ns.b('item-title')">
          <slot
            v-if="$slots.title"
            name="title"
            :item="item"
            :index="index"
            :status="getStatus(index)"
          />
          <text v-else>{{ item.title }}</text>
        </view>
        <view :class="ns.b('item-desc')">
          <slot
            v-if="$slots.desc"
            name="desc"
            :item="item"
            :index="index"
            :status="getStatus(index)"
          />
          <text v-else>{{ item.desc }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { getCurrentInstance, onMounted, ref, useSlots, watch } from 'vue'
import useNamespace from '../../core/useNamespace'
import { useRect } from '../../hooks'
import Icon from '../icon/icon.vue'
import type { StepStatus } from './props'
import { stepsEmits, stepsProps } from './props'

const ns = useNamespace('steps')

const instance = getCurrentInstance()
const slots = useSlots()

const props = defineProps(stepsProps)
const emit = defineEmits(stepsEmits)

const headHeights = ref<CSSProperties['height'][]>([])

const getStatus = (index: number): StepStatus => {
  if (index === props.current) return 'process'
  if (index < props.current) return 'finish'
  return 'default'
}

const updateHeadHeight = async () => {
  if (!instance || props.direction !== 'vertical' || !slots.icon) return
  const rects = await useRect(instance, `.${ns.b('item')}`, true)
  headHeights.value = rects.map((item) => `${item.height}px` || '100%')
}

watch(
  () => [props.steps, props.direction, slots.icon],
  () => {
    updateHeadHeight()
  },
)

onMounted(() => {
  updateHeadHeight()
})
</script>

<style lang="scss" scoped>
@import './steps.scss';
</style>
