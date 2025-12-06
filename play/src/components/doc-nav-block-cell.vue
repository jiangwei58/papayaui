<template>
  <view
    class="doc-nav-block-item flex justify-between"
    hover-class="doc-nav-block-item-hover"
    @click="toPage"
  >
    {{ title }}
    <pa-icon name="right" class="doc-nav-block-item__icon" />
  </view>
</template>

<script lang="ts" setup>
interface OwnProps {
  title?: string
  path?: string
}

const props = defineProps<OwnProps>()

const toPage = () => {
  if (!props.path) {
    console.warn('未设置页面路径')
    return
  }
  uni.navigateTo({
    url: props.path,
  })
}
</script>

<style lang="scss" scoped>
.doc-nav-block-item {
  position: relative;
  margin: 0 0 12px;
  padding: 0 20px;
  color: #323233;
  font-weight: 600;
  font-size: 14px;
  line-height: 44px;
  background: #f7f8fa;
  border-radius: 99px;
  transition: background 0.3s;

  &__icon {
    font-size: 16px;
    font-weight: normal;
  }
}
.doc-nav-block-item-hover {
  background: #eef0f4;
}
</style>
