<template>
  <Cell
    v-if="!$slots.default"
    :title="label"
    :error-message="errorMessage"
    v-bind="$props"
    @click="emit('click')"
  />
  <Cell v-else :title="label" :error-message="errorMessage" v-bind="$props" @click="emit('click')">
    <slot />
  </Cell>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance, getCurrentInstance, inject, Ref, ref } from 'vue'
import { FormRuleItem } from '../../hooks/form/useFormValidate'
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
  /** 校验规则 */
  rules?: FormRuleItem | FormRuleItem[]
}

defineProps<FormItemProps>()

const emit = defineEmits<{
  (event: 'click'): void
}>()

const p_children = inject<Ref<FormItemInstance[]>>('children')

const instance = getCurrentInstance()

const errorMessage = ref<string>('')

if (instance && p_children?.value) {
  p_children.value = [
    ...p_children.value,
    {
      ...instance,
      errorMessage,
    },
  ]
}
</script>

<style lang="scss" scoped></style>
