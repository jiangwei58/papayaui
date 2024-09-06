<template>
  <pa-search v-model="text" readonly @click-input="onClick" />

  <pa-search v-model="text" disabled @click-input="onClick" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref<string>('')

const onClick = () => {
  uni.showToast({
    icon: 'none',
    title: '点击输入框',
  })
}
</script>
