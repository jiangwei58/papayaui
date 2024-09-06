<template>
  <pa-cell-group inset>
    <pa-cell title="提示弹窗" is-link @click="onOpen({ title: '提示' })" />
    <pa-cell title="提示弹窗（无标题）" is-link @click="onOpen()" />
    <pa-cell
      title="确认弹窗"
      is-link
      @click="
        onOpen({
          title: '标题',
          showCancelButton: true,
        })
      "
    />
  </pa-cell-group>

  <pa-dialog
    v-model:show="visible"
    theme="round-button"
    message="落霞与孤鹜齐飞，秋水共长天一色"
    v-bind="dialogProps"
  ></pa-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DialogProps } from '../../components/dialog/props'

const visible = ref(false)
const dialogProps = ref<Partial<DialogProps>>({})

const onOpen = (props: Partial<DialogProps> = {}) => {
  dialogProps.value = props
  visible.value = true
}
</script>

<style lang="scss" scoped></style>
