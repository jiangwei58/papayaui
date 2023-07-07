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
import Cell from '../cell/cell.vue'
import { formItemEmits, FormItemProps, formItemProps } from './props'

export interface FormItemInstance extends Omit<ComponentInternalInstance, 'props'> {
  errorMessage: Ref<string>
  props: FormItemProps
}

defineProps(formItemProps)
const emit = defineEmits(formItemEmits)

const p_children = inject<Ref<FormItemInstance[]>>('children')

const instance = getCurrentInstance()

const errorMessage = ref<string>('')

if (instance && p_children?.value) {
  p_children.value = p_children.value.concat({
    ...instance,
    errorMessage,
  })
}
</script>

<style lang="scss" scoped></style>
