<template>
  <view :class="ns.b()">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { computed, provide, ref, toRefs } from 'vue'
import type { FormItemExtraParams, FormRules } from '../../core/useForm'
import { useFormValidate } from '../../core/useForm'
import useNamespace from '../../core/useNamespace'
import type { FormItemInstance } from '../form-item/form-item.vue'
import { formEmits, formProps } from './props'

const ns = useNamespace('form')

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const { form, rules } = toRefs(props)

const children = ref<FormItemInstance[]>([])
provide('children', children)

const formRules = computed(() => {
  const extraRules = children.value.reduce((result, child) => {
    if (child.props.prop && child.props.rules) {
      result[child.props.prop] = child.props.rules
    }
    return result
  }, {} as FormRules<any>)
  return { ...rules.value, ...extraRules }
})

const formExtraData = computed(() => {
  return children.value.reduce((result, child) => {
    if (child.props.prop) {
      result[child.props.prop] = child.props as Record<string, string>
    }
    return result
  }, {} as FormItemExtraParams<Record<string, string>>)
})

const formValidate = useFormValidate({
  formData: form,
  rules: formRules,
  extraParams: formExtraData,
})

const baseValidate = (keys?: string[]) => {
  return formValidate.validate(keys).then(({ isValid, errorMap }) => {
    children.value.forEach((child) => {
      const error = errorMap[child.props.prop as string]
      child.errorMessage = error || ''
    })
    return { isValid, errorMap }
  })
}

const validate = () => {
  return baseValidate()
}

const validateField = (key: string) => {
  return baseValidate([key])
}

const reset = () => {
  emit('reset')
  formValidate.clearValidate()
}

defineExpose({
  validate,
  validateField,
  reset,
})
</script>

<style lang="scss" scoped></style>
