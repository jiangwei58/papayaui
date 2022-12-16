<template>
  <view :class="computedClass('form')">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { computed, provide, ref, toRefs } from 'vue'
import { FormItemExtraParams, FormRules, useFormValidate } from '../../'
import { computedClass } from '../../utils/style'
import { FormItemInstance } from '../form-item/form-item.vue'

export interface FormProps {
  /** 表单数据 */
  form?: any
  /** 校验规则 */
  rules?: FormRules<any>
}

const props = withDefaults(defineProps<FormProps>(), {
  form: () => {},
  rules: () => ({} as FormRules<any>),
})

const emit = defineEmits<{
  (event: 'reset'): void
}>()

const { form, rules } = toRefs(props)

const children = ref<FormItemInstance[]>([])
provide('children', children)

const formExtraData = computed(() => {
  return children.value.reduce((result, child) => {
    if (child.props.prop) {
      result[child.props.prop] = child.props as Record<string, string>
    }
    return result
  }, {} as FormItemExtraParams<Record<string, string>>)
})

const formValidate = useFormValidate({ formData: form, rules, extraParams: formExtraData })

const baseValidate = (keys?: string[]) => {
  return formValidate.validate({ keys }).then(({ isValid, errorMap }) => {
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
