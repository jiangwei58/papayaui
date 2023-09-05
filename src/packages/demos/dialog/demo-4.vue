<template>
  <pa-cell-group inset>
    <pa-cell title="自定义内容" is-link @click="onOpen()" />
    <pa-cell title="自定义底部" is-link @click="onOpen2()" />
  </pa-cell-group>

  <pa-dialog v-model:show="visible" title="标题">
    <view class="flex flex-col items-center justify-center pt-20 pb-50">
      <view class="text-28 color-black-2">这是自定义内容</view>
      <image src="../../images/demo.jpeg" style="width: 80px; height: 80px" />
    </view>
  </pa-dialog>

  <pa-dialog
    v-model:show="visible2"
    title="标题"
    message="可以自定义底部，比如自定按钮，方便利用微信开放能力"
  >
    <view class="flex flex-col items-center justify-center pt-20 pb-50 px-48">
      <view class="text-28 color-black-2">可以自定义底部，比如自定按钮，方便利用微信开放能力</view>
      <image v-if="avatarUrl" :src="avatarUrl" style="width: 80px; height: 80px" />
    </view>
    <template #footer>
      <view class="flex items-center justify-between pt-16 px-48 pb-32">
        <pa-button class="width-full block mr-32" type="default" block @click="visible2 = false">
          取消
        </pa-button>
        <pa-button
          class="width-full block"
          block
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          获取头像
        </pa-button>
      </view>
    </template>
  </pa-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { EventDetail } from '../../types'

const visible = ref(false)
const visible2 = ref(false)

const avatarUrl = ref<string>()

const onOpen = () => {
  visible.value = true
}

const onOpen2 = () => {
  visible2.value = true
}

const onChooseAvatar = (e: EventDetail<{ avatarUrl: string }>) => {
  if (e.detail.avatarUrl) {
    avatarUrl.value = e.detail.avatarUrl
  }
}
</script>

<style lang="scss" scoped></style>
