<template>
  <pa-button @click="onVisibleChange()">显示遮罩层</pa-button>

  <pa-overlay :show="visible" @click="onVisibleChange(false)" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)

const onVisibleChange = (show = true) => {
  visible.value = show
}
</script>
