<template>
  <pa-cell title="提示弹窗（无标题）" is-link @click="onOpen()" />

  <pa-dialog v-model:show="visible" message="落霞与孤鹜齐飞，秋水共长天一色"></pa-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const onOpen = () => {
  visible.value = true
}
</script>

<style lang="scss" scoped></style>
