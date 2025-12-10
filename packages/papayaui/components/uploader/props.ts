import type { ExtractPropTypes, PropType } from 'vue'
import { isArray, isNumber, isObject } from '@papayaui/utils'

export type FileMediaType = 'image' | 'video'
export type FileOtherType = 'word' | 'excel' | 'ppt' | 'pdf' | 'markdown' | 'zip' | 'file'
export type FileItem = {
  name?: string
  url: string
  type?: FileMediaType | FileOtherType
  status?: 'ready' | 'uploading' | 'success' | 'error'
  deletable?: boolean
  thumbUrl?: string
}

export const uploaderProps = {
  /**
   * 标识符，可以在回调函数的第二项参数中获取
   */
  name: [String, Number],
  /**
   * 上传的文件列表
   */
  fileList: {
    type: Array as PropType<FileItem[]>,
    default: () => [],
  },
  /**
   * 接受的文件类型
   * @link https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html
   */
  mediaType: {
    type: Array as PropType<Array<'image' | 'video' | 'mix'>>,
    default: ['image', 'video', 'mix'],
  },
  /**
   * 图片和视频选择的来源
   * @link https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html
   */
  sourceType: {
    type: Array as PropType<Array<'album' | 'camera'>>,
    default: ['album', 'camera'],
  },
  /**
   * 是否压缩所选文件
   * @link https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html
   */
  sizeType: {
    type: Array as PropType<Array<'original' | 'compressed'>>,
    default: ['original', 'compressed'],
  },
  /**
   * 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 60s 之间。不限制相册
   */
  maxDuration: {
    type: Number,
    default: 10,
  },
  /**
   * 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头
   */
  camera: {
    type: String as PropType<'front' | 'back'>,
    default: 'back',
  },
  /**
   * 文件大小限制，单位为byte
   */
  maxSize: Number,
  /**
   * 文件上传数量限制
   */
  maxCount: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  /**
   * 预览图和上传区域的尺寸，默认单位为px
   */
  previewSize: [String, Number],
  /**
   * 是否在上传完成后展示预览图
   */
  previewImage: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否在点击预览图后展示全屏图片预览
   */
  previewFullImage: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否开启图片多选
   */
  multiple: Boolean,
  /**
   * 是否禁用文件上传
   */
  disabled: Boolean,
  /**
   * 是否展示文件上传按钮
   */
  showUpload: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否展示删除按钮
   */
  deletable: {
    type: Boolean,
    default: true,
  },
  /**
   * 文件读取前的回调函数，返回 false 可终止文件读取，支持返回 Promise
   */
  beforeRead: Function as PropType<(file: UniApp.MediaFile[]) => boolean | Promise<unknown>>,
  /**
   * 文件读取完成后的回调函数
   */
  afterRead: Function as PropType<(file: FileItem | FileItem[]) => void>,
  /**
   * 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
   */
  beforeDelete: Function as PropType<(file: FileItem) => boolean | Promise<unknown>>,
}

export const uploaderEmits = {
  'update:fileList': (fileList: FileItem[], _name?: string | number) => isArray(fileList),
  change: (fileList: FileItem[], _name?: string | number) => isArray(fileList),
  'click-preview': (file: FileItem, index: number) => isObject(file) && isNumber(index),
  oversize: () => true,
  delete: (file: FileItem, index: number) => isObject(file) && isNumber(index),
  error: (_e: UniApp.GeneralCallbackResult) => true,
}

export type UploaderProps = ExtractPropTypes<typeof uploaderProps>
export type UploaderEmits = typeof uploaderEmits
