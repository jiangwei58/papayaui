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
import { onMounted, ref, toRefs } from 'vue'

export interface EnvListItem {
  label: string
  key: string
  url: string
}

interface OwnProps {
  modelValue?: string
  urls: EnvListItem[]
}

const props = withDefaults(defineProps<OwnProps>(), {
  modelValue: undefined,
  urls: () => [],
})

const emit = defineEmits<{
  (event: 'update:modelValue', url: string): void
  (event: 'confirm', url: string): void
}>()

const { modelValue, urls } = toRefs(props)

const value = ref<string>('')

onMounted(() => {
  value.value = modelValue.value
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

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.active {
  background-color: _var(color-primary);
  color: #fff;
}
.btn {
  line-height: 100rpx;
  background-color: _var(color-primary);
  color: #fff;
  text-align: center;
}
</style>
