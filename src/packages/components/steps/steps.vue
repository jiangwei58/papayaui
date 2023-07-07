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
import { CSSProperties, getCurrentInstance, onMounted, ref, useSlots, watch } from 'vue'
import useNamespace from '../../core/useNamespace'
import { useRect } from '../../hooks'
import Icon from '../icon/icon.vue'
import { stepsEmits, stepsProps, StepStatus } from './props'

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
