<template>
  <pa-cell-group inset>
    <pa-cell title="自定义底部" is-link @click="visible = true" />
  </pa-cell-group>

  <pa-bottom-popup v-model:show="visible" title="标题">
    <view class="px-20">{{ text }}</view>
    <template #footer>
      <view class="flex justify-around px-26">
        <pa-button type="default" block style="width: 50%">取消</pa-button>
        <pa-button class="ml-15" block style="width: 50%">确定</pa-button>
      </view>
    </template>
  </pa-bottom-popup>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const visible = ref<boolean>(false)

const text = computed(() => {
  return new Array(100)
    .fill(0)
    .map(() => '内容')
    .join('')
})
</script>
