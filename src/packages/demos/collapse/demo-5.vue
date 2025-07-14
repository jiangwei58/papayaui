<template>
  <pa-collapse v-model="collapseValue">
    <pa-collapse-item title="测试" :border="false">
      <pa-collapse v-model="collapseChildValue" :border="false">
        <pa-collapse-item title="嵌套测试" :border="false">
          嵌套内容，嵌套内容，嵌套内容
        </pa-collapse-item>
      </pa-collapse>
      <view>测试内容，测试内容，测试内容</view>
    </pa-collapse-item>
  </pa-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collapseValue = ref<number[]>([])
const collapseChildValue = ref<number[]>([])
</script>
