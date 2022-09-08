<template>
  <view class="safe-bottom"></view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SafeBottom',
})
</script>

<style lang="scss" scoped>
.safe-bottom {
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
