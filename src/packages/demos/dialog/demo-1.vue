<template>
  <pa-cell title="提示弹窗" is-link @click="onOpen()" />

  <pa-dialog
    v-model:show="visible"
    title="提示"
    message="落霞与孤鹜齐飞，秋水共长天一色"
  ></pa-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const onOpen = () => {
  visible.value = true
}
</script>

<style lang="scss" scoped></style>
