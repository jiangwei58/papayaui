// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import WeChatCOS from 'cos-wx-sdk-v5'

export interface PaCOSConfig {
  /**
   * 获取COS基础信息配置
   */
  getConfig: () => Promise<COSConfig>
  /**
   * 获取COS临时凭证
   */
  getAuthorization: (options: any) => COSAuthorization | Promise<COSAuthorization>
  /**
   * COS配置，参考：https://cloud.tencent.com/document/product/436/31953
   */
  cosOptions?: any
  /**
   * 额外配置
   */
  extraOptions?: ExtraOptions
}

export interface ExtraOptions {
  /**
   * 是否使用hash编码文件名
   */
  hash?: boolean
}

export interface COSConfig {
  /**
   * 存储桶所在地域
   */
  region: string
  /**
   * 存储桶的名称
   */
  bucket: string
  /**
   * 文件前缀
   */
  prefix: string
}

export interface COSAuthorization {
  /**
   * 密钥获取的开始时间，即获取时刻的时间戳，单位秒，如：1580000000
   */
  startTime?: number
  /**
   * 获取回来的临时密钥的 expiredTime，超时时刻的时间戳，单位秒，如：1580000900
   */
  expiredTime: number
  credentials: {
    /**
     * 获取回来的临时密钥的 sessionToken，对应 header 的 x-cos-security-token 字段
     */
    sessionToken: string
    /**
     * 获取回来的临时密钥的 tmpSecretId
     */
    tmpSecretId: string
    /**
     * 获取回来的临时密钥的 tmpSecretKey
     */
    tmpSecretKey: string
    /**
     * 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
     */
    ScopeLimit?: boolean
  }
}

export type COSError = {
  statusCode: number
  header: object
}

export interface UploadFileParams {
  /** 对象键（Object 的名称），对象在存储桶中的唯一标识 */
  Key?: string
  /** 上传文件大小 */
  FileSize?: number
  /** 表示文件大小超出一个数值时使用分块上传，单位 Byte，默认值1048576（1MB），小于等于该数值会使用 putObject 上传，大于该数值会使用 sliceUploadFile 上传 */
  SliceSize?: number
  /** 分块的并发量，仅在触发分块上传时有效 */
  AsyncLimit?: number
  /** 对象的存储类型，枚举值：STANDARD、STANDARD_IA、ARCHIVE、DEEP_ARCHIVE 等 */
  StorageClass?: string
  /** 上传任务创建时的回调函数，返回一个 taskId，唯一标识上传任务，可用于上传任务的取消（cancelTask），停止（pauseTask）和重新开始（restartTask） */
  onTaskReady?: (taskId: string) => void
  /** 上传文件的进度回调函数 */
  onProgress?: (progressData: UploadFileProgressData) => void
  /** 每个文件完成或错误回调 */
  onFileFinish?: (err: COSError | null, data: UploadFileResult, options: any) => void
  /** 其他参数 */
  [key: string]: any
}

export interface UploadFileProgressData {
  /** 已经上传的文件部分大小，以字节（Bytes）为单位 */
  loaded: number
  /** 整个文件的大小，以字节（Bytes）为单位 */
  total: number
  /** 文件的上传速度，以字节/秒（Bytes/s）为单位 */
  speed: number
  /** 文件的上传百分比，以小数形式呈现，例如，上传50%即为0.5 */
  percent: number
}

export interface UploadFileResult {
  /** 请求返回的 HTTP 状态码，例如200、403、404等 */
  statusCode: number
  /** 请求返回的头部信息 */
  headers: object
  /** 上传完的文件访问地址 */
  Location: string
  /** 分块上传的目标存储桶,仅在触发分块上传时返回 */
  Bucket?: string
  /** 对象键（Object 的名称），对象在存储桶中的唯一标识 */
  Key: string
  /** 合并后文件的唯一 ID，格式："uuid-<分块数> 例如"22ca88419e2ed4721c23807c678adbe4c08a7880-3"，注意前后携带双引号 */
  ETag: string
  /** 在开启过版本控制的存储桶中上传对象返回对象的版本 ID，存储桶从未开启则不返回该参数 */
  VersionId?: string
}

export interface GetObjectUrlParams {
  /** 对象键（Object 的名称），对象在存储桶中的唯一标识 */
  Key: string
  /** 是否返回带有签名的 Url，默认为 true，当对象为私有读时，获取到不带签名的 url 依然没有权限访问 */
  Sign?: boolean
  /** 可选填为 http: 或 https:，默认为 http:（带冒号） */
  Protocol?: string
  /** 存储桶访问域名，默认为 {BucketName-APPID}.cos.{Region}.myqcloud.com */
  Domain?: string
  /** 操作方法，例如 GET，POST，DELETE，HEAD 等 HTTP 方法，默认为 GET */
  Method?: string
  /** 签名中要签入的请求参数，{key: 'val'} 的格式 */
  Query?: string
  /** 签名中要签入的请求头部，{key: 'val'} 的格式 */
  Headers?: string
  /** 签名几秒后失效，默认为 900 秒 */
  Expires?: number
}

export interface GetObjectUrlResult {
  /** 计算得到的 Url */
  Url: string
}

/**
 * 针对腾讯云COS的封装工具类
 *
 * 示例
 * ```ts
 * // 初始化
 * const paCOS = new PaCOS({
 *   getConfig: () => {
 *     // 调用接口获取相关配置信息
 *     return Promise.resolve({
 *       region: 'ap-guangzhou',
 *       bucket: 'instance-xxxx',
 *       prefix: 'a1',
 *     });
 *   },
 *   getAuthorization: () => {
 *     // 调用接口获取 token 相关鉴权信息
 *     return Promise.resolve({
 *       startTime: 1633764822, // 该参数会影响，getObjectUrl Ex
 *       expiredTime: 1633766622,
 *       credentials: {
 *         tmpSecretId: 'xxxxx',
 *         tmpSecretKey: 'xxxxx',
 *         sessionToken: 'xxxx',
 *         ScopeLimit: true,
 *       },
 *     });
 *   },
 * })
 *
 * // 上传文件，filePath 在小程序上是选择完的tempFilePath
 * const res = await paCOS.uploadFile(filePath)
 *
 * // 获取对象访问 URL
 * paCOS.getObjectUrl({
 *   Key: res.Key
 * })
 * ```
 */
export class PaCOS {
  private config: PaCOSConfig

  public cos
  private cosConfig: COSConfig | null = null
  private cosAuthorization: COSAuthorization | null = null

  constructor(config: PaCOSConfig) {
    this.config = config

    if (typeof WeChatCOS === 'undefined') {
      console.error(new Error('此工具类依赖"cos-wx-sdk-v5"，请先安装该依赖"'))
    }

    this.cos = new WeChatCOS({
      SimpleUploadMethod: 'putObject',
      getAuthorization: async (options: any, callback: (...args: any[]) => void) => {
        const auth = await this.getAuthorization(options)
        callback({
          TmpSecretId: auth.credentials.tmpSecretId,
          TmpSecretKey: auth.credentials.tmpSecretKey,
          SecurityToken: auth.credentials.sessionToken,
          StartTime: auth.startTime,
          ExpiredTime: auth.expiredTime,
          ScopeLimit: auth.credentials.ScopeLimit,
        })
      },
      ...config.cosOptions,
    })
  }

  async getConfig() {
    if (this.cosConfig) return this.cosConfig
    const config = await this.config.getConfig()
    this.cosConfig = config
    return config
  }

  async getAuthorization(options: any) {
    if (this.cosAuthorization && this.cosAuthorization.expiredTime > Date.now() / 1000) {
      return this.cosAuthorization
    }
    const authorization = await this.config.getAuthorization(options)
    this.cosAuthorization = authorization
    return authorization
  }

  /**
   * 上传对象
   * @link https://cloud.tencent.com/document/product/436/64991
   * @param key - 对象键
   * @param filePath - 文件路径
   * @param params - 上传参数
   */
  async uploadFile(filePath: string, params?: UploadFileParams) {
    const cosConfig = await this.getConfig()
    const Key = `${cosConfig.prefix}/${params?.Key ?? filePath.replace(/^.+\/(.+)$/, '$1')}`
    return new Promise<UploadFileResult>((resolve, reject) => {
      this.cos.uploadFile(
        {
          Bucket: cosConfig.bucket,
          Region: cosConfig.region,
          FilePath: filePath,
          ...params,
          Key,
        },
        (err: COSError | null, data: UploadFileResult) => {
          if (err) {
            reject(err)
            return
          }
          data.Key = Key
          resolve(data)
        },
      )
    })
  }

  /**
   * 获取对象访问 URL
   * @link https://cloud.tencent.com/document/product/436/57422
   */
  async getObjectUrl(params: GetObjectUrlParams) {
    const cosConfig = await this.getConfig()
    return new Promise<GetObjectUrlResult>((resolve, reject) => {
      this.cos.getObjectUrl(
        {
          Bucket: cosConfig.bucket,
          Region: cosConfig.region,
          ...params,
        },
        (err: COSError | null, data: GetObjectUrlResult) => {
          if (err) {
            reject(err)
            return
          }
          resolve(data)
        },
      )
    })
  }
}
