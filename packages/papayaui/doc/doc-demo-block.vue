<template>
  <view class="doc-demo-block">
    <view class="doc-demo-block__title">{{ title }}</view>

    <view :class="{ 'doc-demo-block__card': card }">
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
interface OwnProps {
  title?: string
  card?: boolean
}

defineProps<OwnProps>()
</script>

<style lang="scss" scoped>
.doc-demo-block {
  .doc-demo-block__title {
    margin: 0;
    padding: 32px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
  .doc-demo-block__card {
    margin: 0 12px 0;
  }
}
</style>
