<template>
  <view :class="computedClass('steps', `steps-${direction}`)">
    <view
      v-for="(item, index) in steps"
      :key="index"
      :class="
        computedClass('steps-item', {
          'steps-item--process': index === current,
          'steps-item--finish': index < current,
        })
      "
    >
      <view :class="computedClass('steps-item-head')">
        <view :class="computedClass('steps-item-line')"></view>
        <view :class="computedClass('steps-item-wrapper')">
          <view :class="computedClass('steps-item-icon')">
            <Icon v-if="index < current" name="success" size="13px" color="var(color-primary)" />
            <text v-else>{{ index + 1 }}</text>
          </view>
        </view>
      </view>
      <view :class="computedClass('steps-item-content')">
        <view :class="computedClass('steps-item-title')">{{ item.title }}</view>
        <view :class="computedClass('steps-item-desc')">{{ item.desc }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computedClass } from '../../utils/style'
import Icon from '../icon/icon.vue'

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

withDefaults(defineProps<StepsProps>(), {
  current: 0,
  steps: () => [],
  direction: 'horizontal',
})
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-steps {
  $gap: 8px;
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
      width: 20px;
      height: 20px;
      font-size: 12px;
      color: _var(color-text-black-3);
      border: 1px solid _var(color-text-black-3);
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
      padding-bottom: $gap;
      background-color: transparent;
    }
    &-content {
      align-items: flex-start;
      margin-left: 15px;
    }
    &-line {
      width: 1px;
      height: 100%;
      top: 0;
    }
  }
}
</style>
