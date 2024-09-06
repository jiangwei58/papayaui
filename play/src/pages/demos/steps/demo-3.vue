<template>
  <pa-steps :steps="steps" :current="current">
    <template #icon="{ index }">
      <view
        class="flex items-center justify-center rounded-4"
        style="width: 30px; height: 30px; background-color: #ccc"
      >
        <pa-icon name="success" />
        <text>{{ index }}</text>
      </view>
    </template>
    <template #title="{ index, status }">
      <text class="color-primary">{{ steps[index].title }}-{{ status }}</text>
    </template>
    <template #desc="{ index }">
      <text class="text-black-2">{{ steps[index].desc }}</text>
    </template>
  </pa-steps>

  <view style="margin-top: 60px">
    <pa-steps :steps="steps" :current="current" direction="vertical">
      <template #icon="{ index }">
        <view
          class="flex items-center justify-center rounded-4"
          style="width: 30px; height: 30px; background-color: #ccc"
        >
          <pa-icon name="success" />
          <text>{{ index }}</text>
        </view>
      </template>
      <template #title="{ index, status }">
        <text class="color-primary">{{ steps[index].title }}-{{ status }}</text>
      </template>
      <template #desc="{ index }">
        <view style="height: 50px">
          <text class="text-black-2">{{ steps[index].desc }}</text>
        </view>
      </template>
    </pa-steps>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const steps = [
  {
    title: '步骤一',
    desc: '描述信息',
  },
  {
    title: '步骤二',
    desc: '描述信息',
  },
  {
    title: '步骤三',
    desc: '描述信息',
  },
]

const current = ref<number>(0)
</script>
