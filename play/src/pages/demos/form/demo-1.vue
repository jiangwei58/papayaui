<template>
  <pa-form ref="formRef" :form="formData" :rules="rules">
    <pa-cell-group inset>
      <pa-form-item prop="name" label="名称" required>
        <pa-field v-model="formData.name" placeholder="请输入" only-input />
      </pa-form-item>

      <pa-form-item prop="desc" label="描述">
        <pa-field v-model="formData.desc" placeholder="请输入" only-input />
      </pa-form-item>
    </pa-cell-group>

    <pa-button class="block mt-30 mx-32" style="width: auto" block @click="onValidate">
      提交
    </pa-button>
  </pa-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'papayaui'

interface FormData {
  name: string
  desc: string
}

const formRef = ref<FormInstance>()

const formData = reactive<FormData>({
  name: '',
  desc: '',
})

const rules: FormRules<FormData & { 'object.text': string }> = {
  name: [{ required: true }],
  desc: [{ required: true, message: '请输入描述内容' }],
}

const onValidate = async () => {
  formRef.value?.validate().then(({ isValid }) => {
    if (isValid) {
      uni.showToast({ title: '校验通过', icon: 'none' })
    }
  })
}
</script>
