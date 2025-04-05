export type Method =
  'get' | 'post' | 'delete' | 'options' | 'pathc' | 'put' | 'head' |
  'GET' | 'POST' | 'DELETE' | 'OPTIONS' | 'PATCH' | 'PUT' | 'HEAD'

export type Params = Record<string, unknown> | URLSearchParams
export type IHeaders = Record<string, unknown>

export type Adapter<R> = Array<string | AdapterInstance<R>> | string | AdapterInstance<R>
export type AdapterInstance<R> = (config: MoriAxiosRequestConfig<R>) => MoriAxiosPromise<R>

export interface MoriAxiosRequestConfig<R = MoriAxiosResponse<unknown>> {
  method?: Method
  baseURL?: string
  url?: string
  data?: unknown
  params?: Params
  headers?: IHeaders | null
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  adapter?: Adapter<R>
  paramsSerializer?: (params: Params) => string
  validateStatus?: (status: number) => boolean
}
export type MakeRequired<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] }
export type DefaultMoriAxiosRequestConfig = MakeRequired<MoriAxiosRequestConfig<MoriAxiosResponse<unknown>>, 'method' | 'timeout' | 'headers' | 'adapter'>

export interface MoriAxiosResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: IHeaders
  config: MoriAxiosRequestConfig<MoriAxiosResponse<unknown>>
  request: XMLHttpRequest
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MoriAxiosPromise<D, R = (MoriAxiosResponse<D> | D)> extends Promise<R | D> {

}

export type MoriAxiosErrorCode =
  'ERR_BAD_OPTION_VALUE' |
  'ERR_BAD_OPTION' |
  'ECONNABORTED' |
  'ETIMEDOUT' |
  'ERR_NETWORK' |
  'ERR_FR_TOO_MANY_REDIRECTS' |
  'ERR_DEPRECATED' |
  'ERR_BAD_RESPONSE' |
  'ERR_BAD_REQUEST' |
  'ERR_CANCELED' |
  'ERR_NOT_SUPPORT' |
  'ERR_INVALID_URL'

export interface MoriAxiosError extends Error {
  isMoriAxiosError: boolean
  message: string
  code?: MoriAxiosErrorCode | null
  config?: MoriAxiosRequestConfig
  request?: XMLHttpRequest | null
  response?: MoriAxiosResponse<unknown>
}

export interface MoriAxios {
  default: MoriAxiosRequestConfig

  request(config: MoriAxiosRequestConfig): MoriAxiosPromise<unknown>
  request(url: string, config?: MoriAxiosRequestConfig): MoriAxiosPromise<unknown>
}

export interface MoriAxiosInstance extends MoriAxios {
  default: MoriAxiosRequestConfig
  create: (config: MoriAxiosRequestConfig) => MoriAxios
}
