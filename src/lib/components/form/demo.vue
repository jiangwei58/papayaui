<template>
  <DocDemoBlock title="基础用法">
    <Form ref="formRef" :form="formData" :rules="rules">
      <CellGroup inset>
        <FormItem prop="name" label="名称" required>
          <input v-model="formData.name" placeholder="请输入" />
        </FormItem>

        <FormItem prop="desc" label="描述">
          <!-- 可以使用field组件的输入框模式 -->
          <Field v-model="formData.desc" placeholder="请输入" only-input />
        </FormItem>
      </CellGroup>

      <ButtonComponent class="block px-32 pt-30" @click="onValidate">提交</ButtonComponent>
    </Form>
  </DocDemoBlock>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormRules } from '../../hooks'
import CellGroup from '../cell-group/cell-group.vue'
import FormItem from '../form-item/form-item.vue'
import Form from './form.vue'
import ButtonComponent from '../button/button.vue'
import DocDemoBlock from '../../doc/doc-demo-block.vue'
import Field from '../field/field.vue'

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
