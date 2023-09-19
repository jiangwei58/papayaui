<template>
  <pa-form>
    <pa-form-item label="文本" prop="text">
      <pa-textarea v-model="formData.text" input-align="right" />
    </pa-form-item>
  </pa-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  text: '',
})
</script>
