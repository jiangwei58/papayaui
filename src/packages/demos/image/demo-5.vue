<template>
  <view class="grid grid-cols-3 gap-30">
    <view>
      <pa-image src="error.png" width="100%" height="27vw" />
      <text class="block text-28 text-black-2 text-center">默认提示</text>
    </view>
    <view>
      <pa-image src="error.png" width="100%" height="27vw">
        <template #error>
          <text>error</text>
        </template>
      </pa-image>
      <text class="block text-28 text-black-2 text-center">自定义提示</text>
    </view>
  </view>
</template>
