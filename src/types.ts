export type Method =
  'get' | 'post' | 'delete' | 'options' | 'pathc' | 'put' | 'head' |
  'GET' | 'POST' | 'DELETE' | 'OPTIONS' | 'PATCH' | 'PUT' | 'HEAD'

export type Params = Record<string, unknown>
export type IHeaders = Record<string, unknown>

export interface MoriAxiosRequestConfig {
  method?: Method
  url?: string
  data?: unknown
  params?: Params
  headers?: IHeaders | null

  validateStatus?: (status: number) => boolean
}

export interface MoriAxiosResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: IHeaders
  config: MoriAxiosRequestConfig
  request: XMLHttpRequest
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MoriAxiosPromise<T = unknown> extends Promise<MoriAxiosResponse<T>> {

}

// 在 TypeScript 中，接口中的方法是可以重载的。对于 `MoriAxios` 接口中的 `request` 方法，我们可以为其添加重载签名。
// 下面是一个添加了重载签名的 `MoriAxios` 接口示例，假设我们希望根据不同的参数类型提供不同的调用方式。

export interface MoriAxios {
  default: MoriAxiosRequestConfig
  // 重载签名
  request(config: MoriAxiosRequestConfig): MoriAxiosPromise<unknown>
  request(url: string, config?: MoriAxiosRequestConfig): MoriAxiosPromise<unknown>
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MoriAxiosInstance extends MoriAxios {

}
