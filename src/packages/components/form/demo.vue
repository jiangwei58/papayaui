<template>
  <DocDemoBlock title="基础用法">
    <wei-form ref="formRef" :form="formData" :rules="rules">
      <wei-cell-group inset>
        <wei-form-item prop="name" label="名称" required>
          <input v-model="formData.name" placeholder="请输入" />
        </wei-form-item>

        <wei-form-item prop="desc" label="描述">
          <!-- 可以使用field组件的输入框模式 -->
          <wei-field v-model="formData.desc" placeholder="请输入" only-input />
        </wei-form-item>
      </wei-cell-group>

      <wei-button class="block px-32 pt-30" @click="onValidate">提交</wei-button>
    </wei-form>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormRules } from '../../hooks'
import Form from './form.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'

interface FormData {
  name: string
  desc: string
}

const formRef = ref<InstanceType<typeof Form>>()

const formData = ref<FormData>({
  name: '',
  desc: '',
})

const rules: FormRules<FormData> = {
  name: [{ required: true }, { max: 10 }],
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

<style lang="scss" scoped></style>
<style lang="scss">
page {
  background-color: var(--color-page-bg-gray);
}
</style>
