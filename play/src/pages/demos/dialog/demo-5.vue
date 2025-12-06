<template>
  <pa-cell-group inset>
    <pa-cell title="异步关闭" is-link @click="onOpen()" />
  </pa-cell-group>

  <pa-dialog
    v-model:show="visible"
    title="提示"
    message="落霞与孤鹜齐飞，秋水共长天一色"
    show-cancel-button
    :close-on-click-overlay="false"
    :before-close="onBeforeClose"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ActionType } from 'papayaui'

const visible = ref(false)

const onOpen = () => {
  visible.value = true
}

const onBeforeClose = (action: ActionType) => {
  if (action === 'confirm') {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  } else {
    return true
  }
}
</script>

<style lang="scss" scoped></style>
