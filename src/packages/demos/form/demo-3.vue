<template>
  <pa-form ref="formRef" :form="formData" :rules="rules">
    <pa-cell-group inset>
      <pa-form-item prop="name" label="名称" required>
        <pa-field v-model="formData.name" placeholder="请输入" only-input @blur="onNameValidate" />
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
import type { FormInstance, FormRules } from '../..'

interface FormData {
  name: string
}

const formRef = ref<FormInstance>()

const formData = reactive<FormData>({
  name: '',
})

const rules: FormRules<FormData> = {
  name: [{ required: true }, { min: 2 }, { max: 4 }],
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
