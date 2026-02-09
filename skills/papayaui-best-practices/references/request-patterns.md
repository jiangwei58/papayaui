# papayaui/request 使用模式

## 目标

基于 `papayaui/request` 建立统一请求层，标准化鉴权、错误处理和加载态。

## 推荐基础封装

```ts
import paRequest from "papayaui/request";

interface CommonResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

const request = paRequest.create({
  baseUrl: "https://api.example.com",
  validateStatus: () => true,
});

request.interceptor.request.use(async (config) => {
  const token = await getToken();
  config.header["Authorization"] = `Bearer ${token}`;
  return config;
});

request.interceptor.response.use((response) => {
  const result = response.data as CommonResponse;
  if (result.code === 0) return result.data;
  if (result.code === 401) {
    clearToken();
    toLogin();
    return false;
  }
  uni.showToast({ icon: "none", title: result.message || "请求失败" });
  return false;
});

export default request;
```

## 拦截器策略

1. 请求拦截器负责：
- token 注入
- 业务头注入（如机构编码）
- 请求前置门禁（必要时返回 `false` 阻止请求）

2. 响应拦截器负责：
- 业务成功码提取（通常 `code === 0`）
- 认证失败处理（如 401）
- 权限失败处理（如 403）
- 其他错误统一提示并返回 `false`

## 加载态建议

默认行为：

- `showLoading: true`
- `loadingType: navigation`
- `loadingTime: 300`

建议：

1. 列表快速请求可设置 `showLoading: false`，避免频繁闪烁。
2. 关键提交动作可使用 `loadingType: modal`，阻止重复点击。

## validateStatus 约定

若后端业务码在 `response.data`，建议 `validateStatus: () => true`，将 HTTP 结果统一交给响应拦截器处理。

## 常见误区与修正

1. 误区：业务页面直接 `uni.request`，缺失统一拦截策略。
   修正：统一通过 `paRequest.create()` 产出实例。
2. 误区：在每个 API 函数重复写 token 注入。
   修正：token 注入放到请求拦截器。
3. 误区：响应拦截器中遇错仅 `console.log` 不中断流程。
   修正：返回 `false` 明确 reject，交给调用方 `catch`。
4. 误区：对所有请求都展示 loading。
   修正：按交互场景控制 `showLoading` 与 `loadingType`。

## 快速检查清单

- 是否统一使用 request 实例而非散落请求。
- 请求拦截器是否集中处理 token 和公共头。
- 响应拦截器是否统一处理成功码与错误码。
- 调用方是否正确处理 `false` 返回导致的失败分支。
