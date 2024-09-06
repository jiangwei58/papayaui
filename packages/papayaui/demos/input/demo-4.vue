<template>
  <pa-form>
    <pa-form-item label="文本" prop="text">
      <pa-input v-model="formData.text" placeholder="请输入" />
    </pa-form-item>
  </pa-form>
</template>

<script setup lang="ts">
/**
 * @tip 数据值默认都为 string 类型，如需要 number 类型，你可以在 v-model 后添加 .number 修饰符
 */
import { ref } from 'vue'

const formData = ref({
  text: '',
})
</script>
