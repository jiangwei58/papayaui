<template>
  <view
    :class="ns.b()"
    class="flex items-center"
    :style="ns.style({ backgroundColor: bgColor })"
    @click="emit('click', $event)"
  >
    <view :class="ns.b('line')"></view>
    <view :class="ns.b('title')">
      <slot v-if="$slots.title" name="title" />
      <text v-else>{{ title }}</text>
    </view>
    <slot v-if="$slots.default"></slot>
  </view>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue'
import useNamespace from '../../core/useNamespace'

export interface SectionProps {
  title?: string
  bgColor?: CSSProperties['background-color']
}

const ns = useNamespace('section')

withDefaults(defineProps<SectionProps>(), {
  title: '',
  bgColor: undefined,
})

const emit = defineEmits<{
  (event: 'click', value: Event): void
}>()
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-section {
  font-weight: 400;
  padding: _var(section-padding, 12px 10px);
  background-color: _var(section-bg-color, transparent);
  &-line {
    width: 4px;
    height: 12px;
    border-radius: 10px;
    margin-right: 6px;
    background-color: _var(section-line-color, _var(color-primary));
  }
  &-title {
    font-size: _var(section-font-size, 14px);
    color: _var(section-color, _var(color-black));
  }
}
</style>
