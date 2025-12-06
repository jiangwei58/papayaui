<template>
  <pa-form ref="formRef" :form="formData" :rules="rules">
    <pa-cell-group inset>
      <pa-form-item prop="object.text" label="对象" required>
        <pa-field
          v-model="formData.object.text"
          placeholder="请输入"
          only-input
          @blur="onNameValidate"
        />
      </pa-form-item>

      <pa-form-item prop="array.0" label="数组" required>
        <pa-field
          v-model="formData.array[0]"
          placeholder="请输入"
          only-input
          @blur="onNameValidate"
        />
      </pa-form-item>
    </pa-cell-group>

    <pa-button class="block mt-30 mx-32" style="width: auto" block @click="onValidate">
      提交
    </pa-button>
  </pa-form>
</template>

<script setup lang="ts">
/**
 * @description 可以用 validateField 方法来校验单个字段，参数为 prop 值，通常在需要及时反馈校验状态的情况使用
 */
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'papayaui'

interface FormData {
  object: {
    text: string
  }
  array: string[]
}

const formRef = ref<FormInstance>()

const formData = reactive<FormData>({
  object: {
    text: '',
  },
  array: [],
})

const rules: FormRules<FormData & { 'object.text': string; 'array.0': string }> = {
  'object.text': [{ required: true }, { max: 5 }],
  'array.0': [{ required: true, message: '数组第一个是必填的' }],
}

const onNameValidate = () => {
  formRef.value?.validateField('name')
}

const onValidate = async () => {
  formRef.value?.validate().then(({ isValid }) => {
    if (isValid) {
      uni.showToast({ title: '校验通过', icon: 'none' })
    }
  })
}
</script>
