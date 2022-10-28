<template>
  <view :class="computedClass('form')">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { FormItemExtraParams, FormRules, useFormValidate } from '../../'
import { computedClass } from '../../utils/style'
import { computed, provide, ref, toRefs } from 'vue'
import { FormItemInstance } from '../form-item/form-item.vue'

interface OwnProps {
  form?: any
  rules?: FormRules<any>
}

const props = withDefaults(defineProps<OwnProps>(), {
  form: () => {},
  rules: () => ({} as FormRules<any>),
})
const { form, rules } = toRefs(props)

const formExtraData = ref<FormItemExtraParams<any>>()
const children: FormItemInstance[] = []
provide('children', children)

const formValidate = computed(() => useFormValidate(form.value, rules.value, formExtraData.value))

const getChildrenProps = (children: FormItemInstance[]) => {
  return children.reduce((result, child) => {
    if (child.props.prop) {
      result[child.props.prop as string] = child.props as Record<string, string>
    }
    return result
  }, {} as FormItemExtraParams<any>)
}

const baseValidate = (keys?: string[]) => {
  formExtraData.value = getChildrenProps(children)
  return formValidate.value.validate({ keys }).then(({ isValid, errorMap }) => {
    children.forEach((child) => {
      const error = errorMap[child.props.prop as string]
      child.errorMessage.value = error || ''
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
  formValidate.value.clearValidate()
}

defineExpose({
  validate,
  validateField,
  reset,
})
</script>

<style lang="scss" scoped></style>
