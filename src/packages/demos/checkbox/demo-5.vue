<template>
  <pa-checkbox-group v-model="checkValue">
    <pa-checkbox v-for="item in options" :key="item.name" :name="item.name" shape="square">
      {{ item.label }}
    </pa-checkbox>
  </pa-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkValue = ref<number[]>([0])

const options = new Array(3).fill(0).map((_item, index) => ({
  name: index,
  label: '复选框' + index,
}))
</script>
