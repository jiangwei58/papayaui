import interceptor from './request.interceptor'
import { merge } from './utils'

export interface RequestConfig extends UniApp.RequestOptions {
  baseUrl: string
  showLoading?: boolean
  loadingType?: 'modal' | 'navigation'
  loadingText?: string
  loadingTime?: number
  loadingMask?: boolean
  validateStatus: (status: number) => boolean
}

export interface RequestResult<T = any> {
  data: T
  statusCode: number
  header: any
  cookies: string[]
}

class Request {
  // 请求配置
  private config: RequestConfig = {
    baseUrl: '',
    url: '',
    method: 'POST',
    dataType: 'json', // 设置为json，返回后uni.request会对数据进行一次JSON.parse
    responseType: 'text', // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
    header: {},
    showLoading: true,
    loadingText: '加载中...',
    loadingTime: 300,
    loadingMask: true,
    validateStatus: (status) => status === 200,
  }

  // 拦截器
  interceptor = {
    request: new interceptor<
      (config: RequestConfig) => RequestConfig | false | Promise<RequestConfig | false>
    >(),
    response: new interceptor<
      (response: RequestResult, config: RequestConfig) => any | false | Promise<any | false>
    >(),
  }

  // 加载中setTimeout
  _loadingTimer: number | null = null

  constructor(config?: Partial<RequestConfig>) {
    if (config) {
      this.setConfig(config)
    }
  }

  create(config?: Partial<RequestConfig>) {
    return new Request(config)
  }

  setConfig(customConfig: Partial<RequestConfig>) {
    this.config = merge(this.config, customConfig)
  }

  showLoading(config: RequestConfig) {
    if (config.loadingType === 'modal') {
      uni.showLoading({
        title: config.loadingText,
        mask: config.loadingMask,
      })
    } else {
      uni.showNavigationBarLoading()
    }
  }

  hideLoading(config: RequestConfig) {
    if (config.loadingType === 'modal') {
      uni.hideLoading()
    } else {
      uni.hideNavigationBarLoading()
    }
  }

  async request<T = any>(config: Partial<RequestConfig> = {}): Promise<T> {
    let newConfig = merge(this.config, config)

    // 检查请求拦截
    for (const interceptorItem of this.interceptor.request.list) {
      const interceptorRequestRes = await interceptorItem.resolve(newConfig)
      if (interceptorRequestRes === false) {
        // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
        return new Promise(() => {})
      }
      newConfig = interceptorRequestRes
    }

    // 是否显示loading
    if (newConfig.showLoading && !this._loadingTimer) {
      this._loadingTimer = setTimeout(() => {
        this.showLoading(newConfig)
        this._loadingTimer = null
      }, newConfig.loadingTime)
    }

    return new Promise((resolve, reject) => {
      newConfig.complete = async (result) => {
        const response = result as unknown as RequestResult
        if (newConfig.showLoading) {
          this.hideLoading(newConfig)
          clearTimeout(this._loadingTimer as number)
          this._loadingTimer = null
        }

        // 没有拦截器直接返回数据
        if (!this.interceptor.response.list.length) {
          resolve(response as unknown as T)
          return
        }

        const isFailed = newConfig.validateStatus(response.statusCode)
        for (const interceptorItem of this.interceptor.response.list) {
          if (isFailed) {
            const result = await interceptorItem.resolve(response, newConfig)
            if (result !== false) {
              resolve(result)
            } else {
              reject()
            }
          } else {
            interceptorItem.reject(reject)
          }
        }
      }

      uni.request({
        ...newConfig,
        url: newConfig.baseUrl + newConfig.url,
      })
    })
  }

  get<T>(url: string, data?: RequestConfig['data'], config?: Partial<RequestConfig>) {
    return this.request<T>({
      ...config,
      method: 'GET',
      url,
      data,
    })
  }

  post<T>(url: string, data?: RequestConfig['data'], config?: Partial<RequestConfig>) {
    return this.request<T>({
      ...config,
      method: 'POST',
      url,
      data,
    })
  }

  put<T>(url: string, data?: RequestConfig['data'], config?: Partial<RequestConfig>) {
    return this.request<T>({
      ...config,
      method: 'PUT',
      url,
      data,
    })
  }

  delete<T>(url: string, data?: RequestConfig['data'], config?: Partial<RequestConfig>) {
    return this.request<T>({
      ...config,
      method: 'DELETE',
      url,
      data,
    })
  }
}

const request = new Request()

export default request