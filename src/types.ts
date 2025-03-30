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

export interface MoriAxiosError extends Error {
  message: string
  code?: string | null
  config?: MoriAxiosRequestConfig
  request?: XMLHttpRequest
  response?: MoriAxiosResponse
}

export interface MoriAxios {
  default: MoriAxiosRequestConfig
  // 重载签名
  request(config: MoriAxiosRequestConfig): MoriAxiosPromise<unknown>
  request(url: string, config?: MoriAxiosRequestConfig): MoriAxiosPromise<unknown>
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MoriAxiosInstance extends MoriAxios {

}
