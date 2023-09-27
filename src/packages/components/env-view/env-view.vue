<template>
  <view>
    <view>
      <view
        v-for="(item, index) in urls"
        :key="index"
        class="p-30 border-bottom"
        :class="{ active: isActive(item.url) }"
        @tap="onChange(item)"
      >
        <view class="text-30 font-bold">{{ item.label }}</view>
        <view>{{ item.url }}</view>
      </view>
    </view>

    <view class="absolute" style="width: 100%; left: 0; bottom: 150rpx" @tap="onOk">
      <navigator class="btn" open-type="exit" target="miniProgram">确定并退出</navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { EnvListItem } from './props'
import { envViewEmits, envViewProps } from './props'

const props = defineProps(envViewProps)
const emit = defineEmits(envViewEmits)

const value = ref<string>('')

onMounted(() => {
  if (typeof props.modelValue !== 'undefined') {
    value.value = props.modelValue
  }
})

const isActive = (url: string) => url === value.value

const onChange = (item: EnvListItem) => {
  value.value = item.url
}

const onOk = () => {
  emit('update:modelValue', value.value)
  emit('confirm', value.value)
}
</script>

<style lang="scss">
@import './env-view.scss';
</style>
