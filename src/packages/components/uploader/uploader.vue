<template>
  <view :class="ns.b()">
    <view :class="[ns.e('wrapper'), ns.is('disabled', disabled)]">
      <view v-for="(file, index) in fileList" :key="index" :class="ns.e('preview')">
        <view
          :class="[ns.e('preview-image'), ns.e(`preview-type-${file.type ?? 'image'}`)]"
          :style="sizeStyle"
          @click="onPreview(file, index)"
        >
          <ImageComponent
            v-if="!file.type || file.type === 'image' || file.type === 'video'"
            :src="file.thumbUrl ?? file.url"
            width="100%"
            height="100%"
            mode="aspectFill"
          />
          <template v-else>
            <IconComponent :name="(file.type !== 'file' ? `file-` : '') + file.type" />
            <text>{{ file.type }}</text>
          </template>
        </view>
        <view
          v-if="deletable && file.deletable !== false"
          :class="ns.e('preview-delete')"
          @tap="onDelete(file, index)"
        >
          <IconComponent name="close" :class="ns.e('preview-delete-icon')" />
        </view>
      </view>

      <template v-if="showUpload && fileList.length < maxCount">
        <view v-if="$slots.default" :class="ns.e('slot')">
          <slot />
        </view>
        <view
          v-else
          :class="ns.e('upload')"
          :style="sizeStyle"
          :hover-class="ns.em('upload', 'hover')"
          @tap="onChooseFile"
        >
          <IconComponent name="camera" :class="ns.e('upload-icon')" />
        </view>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import IconComponent from '../icon/icon.vue'
import ImageComponent from '../image/image.vue'
import type { FileItem, FileMediaType } from './props'
import { uploaderProps, uploaderEmits } from './props'

const ns = useNamespace('uploader')

const props = defineProps(uploaderProps)
const emit = defineEmits(uploaderEmits)

const sizeStyle = computed(() => {
  return props.previewSize
    ? {
        width: getUnitValue(props.previewSize),
        height: getUnitValue(props.previewSize),
      }
    : {}
})

const onChooseFile = () => {
  if (props.disabled) return
  uni.chooseMedia({
    count: props.multiple ? props.maxCount - props.fileList.length : 1,
    mediaType: props.mediaType,
    sourceType: props.sourceType,
    sizeType: props.sizeType,
    maxDuration: props.maxDuration,
    camera: props.camera,
    success: (res) => {
      beforeRead(res.tempFiles)
    },
    fail: (e) => {
      emit('error', e)
    },
  })
}

const beforeValid = <T extends object>(
  files: T,
  fun?: (files: T) => boolean | Promise<unknown>,
) => {
  return new Promise<void>((resolve, reject) => {
    if (typeof fun === 'function') {
      const res = fun(files)
      if (res === false) {
        return reject()
      }
      if (res instanceof Promise) {
        res.then(() => resolve()).catch(reject)
      } else {
        resolve()
      }
    } else {
      resolve()
    }
  })
}

const beforeRead = (tempFiles: UniApp.MediaFile[]) => {
  beforeValid(tempFiles, props.beforeRead)
    .then(() => {
      const newFileList: FileItem[] = []
      tempFiles.forEach((file) => {
        if (props.maxSize && file.size > props.maxSize) {
          emit('oversize')
          return
        }
        newFileList.push({
          url: file.tempFilePath,
          type: file.fileType,
        })
      })
      if (props.previewImage) {
        const fileList = props.fileList.concat(newFileList)
        emit('update:fileList', fileList, props.name)
        emit('change', fileList, props.name)
      }
      afterRead(newFileList)
    })
    .catch(() => {})
}

const afterRead = (fileList: FileItem[]) => {
  if (typeof props.afterRead === 'function') {
    props.afterRead(fileList)
  }
}

const onPreview = (file: FileItem, index: number) => {
  if (props.previewFullImage && ['image', 'video'].includes(file.type ?? 'image')) {
    // #ifdef MP
    uni.previewMedia({
      sources: props.fileList.map((file) => ({ url: file.url, type: file.type as FileMediaType })),
      current: index,
      fail: () => {
        // 前面的API可能存在兼容问题，失败时使用降级方法
        uni.previewImage({
          urls: props.fileList.map((file) => file.url),
          current: index,
        })
      },
    })
    // #endif
    // #ifndef MP
    uni.previewImage({
      urls: props.fileList.map((file) => file.url),
      current: index,
    })
    // #endif
  }
  emit('click-preview', file, index)
}

const onDelete = async (file: FileItem, index: number) => {
  beforeValid(file, props.beforeDelete)
    .then(() => {
      const fileList = props.fileList.slice(0)
      fileList.splice(index, 1)
      emit('update:fileList', fileList, props.name)
      emit('delete', file, index)
    })
    .catch(() => {})
}

defineExpose({
  chooseFile: onChooseFile,
  beforeRead,
  afterRead,
  deleteFile: onDelete,
})
</script>

<style lang="scss">
@import './uploader.scss';
</style>
