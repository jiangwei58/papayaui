<template>
  <pa-slider v-model="value" :marks="marks" />
  <pa-slider v-model="value2" :marks="marks" range class="block" style="margin-top: 60px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(52)
const value2 = ref([29, 72])

const marks = {
  0: '0',
  20: '20',
  40: '40',
  60: '60',
  80: '80',
  100: '100',
}
</script>

<style lang="scss" scoped></style>
