<template>
  <view :class="ns.b()">
    <view :class="[ns.e('wrapper'), ns.is('disabled', disabled)]">
      <slot v-if="$slots.default" />
      <template v-else>
        <view v-for="(file, index) in fileList" :key="index" :class="ns.e('preview')">
          <view :class="ns.e('preview-image')" :style="sizeStyle">
            <ImageComponent
              :src="file.url"
              width="100%"
              height="100%"
              mode="aspectFill"
              @click="onPreview(file, index)"
            />
          </view>
          <view
            v-if="deletable && file.deletable !== false"
            :class="ns.e('preview-delete')"
            @tap="onDelete(file, index)"
          >
            <Icon name="close" :class="ns.e('preview-delete-icon')" />
          </view>
        </view>

        <view
          v-if="showUpload && fileList.length < maxCount"
          :class="ns.e('upload')"
          :style="sizeStyle"
          @tap="onChooseFile"
        >
          <Icon name="camera" :class="ns.e('upload-icon')" size="24px" block />
        </view>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useNamespace from '../../core/useNamespace'
import { getUnitValue } from '../../utils'
import Icon from '../icon/icon.vue'
import ImageComponent from '../image/image.vue'
import type { FileItem } from './props'
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
    success: async (res) => {
      console.log('res:', res)
      beforeRead(res.tempFiles)
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
  if (!props.previewFullImage) return
  uni.previewMedia({
    sources: props.fileList,
    current: index,
  })
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
</script>

<style lang="scss" scoped>
@import '../../styles/vars.scss';
.#{$prefix}-uploader {
  $size: 100px;
  $gap: 10px;

  position: relative;
  display: inline-block;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  &__preview {
    position: relative;
    margin: _var(uploader-preview-margin, 0 $gap $gap 0);
    cursor: pointer;

    &-image {
      display: block;
      width: _var(uploader-size, $size);
      height: _var(uploader-size, $size);
      border-radius: _var(uploader-preview-radius, 4px);
      overflow: hidden;
    }

    &-delete {
      position: absolute;
      top: 0;
      right: 0;
      width: _var(uploader-delete-width, 15%);
      height: _var(uploader-delete-height, 15%);
      background-color: _var(uploader-delete-bg, rgba(0, 0, 0, 0.7));
      border-radius: 0 _var(uploader-preview-radius, 4px) 0 12px;
      @include _setVar(icon-size, _var(uploader-delete-icon-size, 12px));

      &-icon {
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
      }
    }
  }

  &__upload {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: _var(uploader-size, $size);
    height: _var(uploader-size, $size);
    margin: _var(uploader-preview-margin, 0 $gap $gap 0);
    background-color: #f7f8fa;
    border-radius: _var(uploader-preview-radius, 4px);

    &:active {
      background-color: _var(color-gray);
    }

    &-icon {
      color: #dcdee0;
    }
  }

  &--disabled {
    opacity: 0.5;
  }
}
</style>