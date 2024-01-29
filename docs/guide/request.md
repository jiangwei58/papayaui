# 请求

> [!TIP]
> 当前内部封装了一个请求类，使用类 `axios` 语法

## 基本用法

```ts
import request from 'papayaui/request'

const fetch = request.create({
  baseUrl: 'http://xxxxxxx',
})

fetch.get('/api/xxx', { name: 'xxx' })
fetch.post('/api/xxx', { name: 'xxx' })
fetch.put('/api/xxx', { name: 'xxx' })
fetch.delete('/api/xxx', { name: 'xxx' })

fetch.request({
  url: '/api/xxx',
  method: 'POST',
  data: { name: 'xxx' },
})
```

## 拦截器

::: info 请求拦截

> [!TIP]
> 返回 false 会阻止请求，支持 Promise

```ts
request.interceptor.request.use((config) => {
  // 判断请求路径是否为 api 开头
  if (!config.url.startsWith('/api')) return false
  // 修改请求头
  config.header['Authorization'] = `Bearer xxx`
  return config
})

request.interceptor.request.use(async (config) => {
  // token 获取失败，阻止请求
  const token = await getToken().catch(() => Promise.reject(false))
  // 修改请求头
  config.header['Authorization'] = `Bearer ${token}`
  return config
})
```
:::

::: info 响应拦截

> [!TIP]
> 返回 false 代表请求失败，可以用对应请求的 catch 处理，支持 Promise

```ts
request.interceptor.response.use((response) => {
  const result = response.data

  if (result.code === 0) {
    return result.data
  } else {
    // 其他错误
    console.log(result.message)
    return false
  }
})

request.interceptor.response.use(async (response) => {
  const result = response.data

  if (result.code === 401) {
    console.log('未登录')
    // 重新登录
    await login()
    // 跳转到首页
    toIndex()
  }
})
```
:::

## 配置

> [!TIP]
> 继承自 `uni.request` 的 `UniApp.RequestOptions` 类型，在此基础上增加如下配置项。
> 基础配置请查看 [UniApp 文档](https://uniapp.dcloud.io/api/request/request?id=requestoptions)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| baseUrl | 基础路径 | `string` | - |
| showLoading | 是否显示加载状态 | `boolean` | true |
| loadingType | 加载状态类型<br />model：小程序中间加载模态框<br />navigation：页面标题显示加载状态(默认) | `modal \| navigation` | navigation |
| loadingText | 加载文案（仅model模式有效） | `string` | 加载中... |
| loadingTime | 请求超过多少时间显示加载状态（毫秒） | `number` | 300 |
| loadingMask | 加载状态是否需要全屏遮罩（防止加载中点击其他元素） | `boolean` | true |
| validateStatus | 判断是否请求失败 | `(status: number) => boolean` | (status) => status === 200 |