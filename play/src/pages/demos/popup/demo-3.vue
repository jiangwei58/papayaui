<template>
  <pa-cell-group inset>
    <pa-cell title="圆角弹窗" is-link @click="onOpen()" />
  </pa-cell-group>

  <pa-popup v-model:show="visible" round>
    <view style="width: 200px; height: 200px"></view>
  </pa-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref<boolean>(false)

const onOpen = () => {
  visible.value = true
}
</script>
