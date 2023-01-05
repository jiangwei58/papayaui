<template>
  <view :class="computedClass('steps', `steps-${direction}`)">
    <view
      v-for="(item, index) in steps"
      :key="index"
      :class="
        computedClass('steps-item', {
          [`steps-item--${getStatus(index)}`]: true,
        })
      "
      @tap="emit('click-step', index)"
    >
      <view
        :class="computedClass('steps-item-head')"
        :style="computedStyle({ height: headHeights[index] })"
      >
        <view :class="[computedClass('steps-item-line'), { custom: $slots.icon }]"></view>
        <view :class="computedClass('steps-item-wrapper')">
          <slot
            v-if="$slots.icon"
            name="icon"
            :item="item"
            :index="index"
            :status="getStatus(index)"
          />
          <view v-else :class="computedClass('steps-item-icon')">
            <Icon v-if="index < current" name="success" />
            <text v-else>{{ index + 1 }}</text>
          </view>
        </view>
      </view>
      <view :class="computedClass('steps-item-content')">
        <view :class="computedClass('steps-item-title')">
          <slot
            v-if="$slots.title"
            name="title"
            :item="item"
            :index="index"
            :status="getStatus(index)"
          />
          <text v-else>{{ item.title }}</text>
        </view>
        <view :class="computedClass('steps-item-desc')">
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
import { CSSProperties, getCurrentInstance, onMounted, ref, useSlots, watch } from 'vue'
import { useRect } from '../../hooks'
import { computedClass, computedStyle } from '../../utils/style'
import Icon from '../icon/icon.vue'

/** 步骤状态 */
export type StepStatus = 'default' | 'process' | 'finish'

export type StepItem = {
  title: string
  desc: string
  [key: string]: any
}

export interface StepsProps {
  current?: number
  steps?: StepItem[]
  direction?: 'horizontal' | 'vertical'
}

const instance = getCurrentInstance()
const slots = useSlots()

const props = withDefaults(defineProps<StepsProps>(), {
  current: 0,
  steps: () => [],
  direction: 'horizontal',
})

const emit = defineEmits<{
  (event: 'click-step', index: number): void
}>()

const headHeights = ref<CSSProperties['height'][]>([])

const getStatus = (index: number): StepStatus => {
  if (index === props.current) return 'process'
  if (index < props.current) return 'finish'
  return 'default'
}

const updateHeadHeight = async () => {
  if (!instance || props.direction !== 'vertical' || !slots.icon) return
  const rects = await useRect(instance, `.${computedClass('steps-item')}`, true)
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
@import '../../styles/vars.scss';
.#{$prefix}-steps {
  $gap: 8px;
  $iconSize: 20px;
  display: flex;
  &-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-head {
      position: relative;
      display: flex;
      justify-content: center;
    }
    &-content {
      width: 100%;
    }
    &-line {
      position: absolute;
      top: 50%;
      left: 50%;
      right: -50%;
      display: inline-block;
      background-color: #909ca4;
    }
    &-wrapper {
      position: relative;
      background-color: #fff;
    }
    &-icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: $iconSize;
      height: $iconSize;
      font-size: 12px;
      color: _var(color-black-3);
      border: 1px solid _var(color-black-3);
      border-radius: 50%;
      background-color: #fff;
    }
    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-title {
      font-size: 13px;
    }
    &-desc {
      font-size: 12px;
      color: #909193;
      margin-top: 4px;
    }
    &:last-child &-line {
      display: none;
    }

    &--process &-icon,
    &--finish &-icon {
      border-color: _var(color-primary);
    }
    &--process &-icon {
      background-color: _var(color-primary);
      color: #fff;
    }
    &--finish &-icon {
      color: _var(color-primary);
    }
    &--finish &-line {
      background-color: _var(color-primary);
    }
  }

  &-horizontal &-item {
    &-head {
      width: 100%;
    }
    &-line {
      height: 1px;
    }
    &-wrapper {
      padding: 0 $gap;
    }
    &-content {
      margin-top: 6px;
    }
  }

  &-vertical {
    height: 100%;
    flex-direction: column;
  }
  &-vertical &-item {
    flex-direction: row;
    align-items: flex-start;
    &-head {
      height: 100%;
    }
    &-wrapper {
      height: 20px + $gap;
      padding-bottom: $gap;
    }
    &-content {
      align-items: flex-start;
      margin-left: 15px;
    }
    &-title,
    &-desc {
      width: 100%;
    }
    &-line {
      width: 1px;
      height: calc(100% - $gap - $iconSize);
      top: auto;
      bottom: $gap;
    }
  }

  &-item {
    &-line.custom {
      bottom: 0;
    }
  }
}
</style>
