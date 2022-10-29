<template>
  <Cell v-if="!$slots.default" :title="label" :error-message="errorMessage" v-bind="$props"></Cell>
  <Cell v-else :title="label" :error-message="errorMessage" v-bind="$props">
    <slot />
  </Cell>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance, getCurrentInstance, inject, Ref, ref } from 'vue'
import Cell, { CellProps } from '../cell/cell.vue'

export interface FormItemInstance extends Omit<ComponentInternalInstance, 'props'> {
  errorMessage: Ref<string>
  props: FormItemProps
}

export interface FormItemProps extends CellProps {
  /** 校验对应的字段名 */
  prop?: string
  /** 标签名 */
  label?: string
}

defineProps<FormItemProps>()

const p_children = inject<FormItemInstance[]>('children')

const instance = getCurrentInstance()

const errorMessage = ref<string>('')

if (instance && p_children) {
  p_children.push({
    ...instance,
    errorMessage,
  })
}
</script>

<style lang="scss" scoped></style>
