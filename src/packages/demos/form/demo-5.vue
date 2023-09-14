<template>
  <pa-form ref="formRef" :form="formData">
    <pa-cell-group inset>
      <pa-form-item
        v-for="(item, index) in formData.list"
        :key="index"
        :prop="`list.${index}.name`"
        :label="`名称${index}`"
        required
        :rules="[{ required: true }]"
      >
        <view class="flex">
          <pa-field v-model="item.name" placeholder="请输入" only-input />
          <pa-button
            type="danger"
            width="100"
            height="50"
            block
            :custom-style="{ padding: 0, marginLeft: '10px' }"
            @click="onDeleteItem(index)"
          >
            删除
          </pa-button>
        </view>
      </pa-form-item>
    </pa-cell-group>

    <view class="grid grid-cols-2 gap-25 mt-30 mx-32">
      <pa-button block @click="onValidate">提交</pa-button>
      <pa-button block type="default" @click="onAddItem">新增</pa-button>
    </view>
  </pa-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from '../..'

const formRef = ref<FormInstance>()

const formData = ref<{
  list: { name: string }[]
}>({
  list: [{ name: '' }, { name: '' }, { name: '' }],
})

const onValidate = async () => {
  formRef.value?.validate().then(({ isValid }) => {
    if (isValid) {
      uni.showToast({ title: '校验通过', icon: 'none' })
    }
  })
}

const onAddItem = () => {
  formData.value.list.push({ name: '' })
}

const onDeleteItem = (index: number) => {
  formData.value.list.splice(index, 1)
}
</script>
