<template>
  <Cell
    v-if="!$slots.default"
    :title="label"
    :error-message="errorMessage"
    v-bind="$props"
    :label="desc"
    @click="emit('click')"
  />
  <Cell
    v-else
    :title="label"
    :error-message="errorMessage"
    v-bind="$props"
    :label="desc"
    @click="emit('click')"
  >
    <slot />
  </Cell>
</template>

<script lang="ts" setup>
import type { ComponentInternalInstance, Ref } from 'vue'
import { getCurrentInstance, inject, ref } from 'vue'
import { defaultNamespace } from '../../core'
import Cell from '../cell/cell.vue'
import type { FormItemPropsPublic } from './props'
import { formItemEmits, formItemProps } from './props'

export interface FormItemInstance extends Omit<ComponentInternalInstance, 'props'> {
  errorMessage: Ref<string>
  props: FormItemPropsPublic
}

defineProps(formItemProps)
const emit = defineEmits(formItemEmits)

const p_children = inject<Ref<FormItemInstance[]>>(`${defaultNamespace}-form-children`)

const instance = getCurrentInstance()

const errorMessage = ref<string>('')

if (instance && p_children?.value) {
  p_children.value = p_children.value.concat({
    ...instance,
    errorMessage,
  })
}
</script>

<style lang="scss"></style>
