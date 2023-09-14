<template>
  <pa-form ref="formRef" :form="formData" :rules="rules">
    <pa-cell-group inset>
      <pa-form-item prop="name" label="名称" required>
        <pa-field v-model="formData.name" placeholder="请输入" only-input />
      </pa-form-item>

      <pa-form-item prop="age" label="年龄" suffix="岁" required>
        <pa-input-number
          v-model.number="formData.age"
          :controls="false"
          plain
          block
          input-align="right"
          style="--pa-input-number-height: 24px"
        />
      </pa-form-item>

      <pa-form-item prop="desc" label="描述">
        <pa-textarea v-model="formData.desc" placeholder="请输入" input-align="right" />
      </pa-form-item>
    </pa-cell-group>

    <pa-button class="block mt-30 mx-32" style="width: auto" block @click="onValidate">
      提交
    </pa-button>
  </pa-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from '../..'

interface FormData {
  name: string
  age?: number
  desc?: string
}

const formRef = ref<FormInstance>()

const formData = reactive<FormData>({
  name: '',
})

const rules: FormRules<FormData> = {
  name: [{ required: true }, { min: 2 }, { max: 4 }],
  age: [{ required: true }, { type: 'number', max: 999 }],
  desc: {
    validator: (_rules, value: string) => {
      return value.indexOf('1') === 0
    },
    message: '{{label}}开头必须是"1"',
  },
}

const onValidate = async () => {
  formRef.value?.validate().then(({ isValid }) => {
    if (isValid) {
      uni.showToast({ title: '校验通过', icon: 'none' })
    }
  })
}
</script>
