import type { MoriAxiosErrorCode, MoriAxiosError as MoriAxiosErrorT, MoriAxiosRequestConfig, MoriAxiosResponse } from '../types'
import { isFunction, toJSONObject } from '../utils'
export default class MoriAxiosError extends Error implements MoriAxiosErrorT {
  static ERR_BAD_OPTION_VALUE: MoriAxiosErrorCode = 'ERR_BAD_OPTION_VALUE'
  static ERR_BAD_OPTION: MoriAxiosErrorCode = 'ERR_BAD_OPTION'
  static ECONNABORTED: MoriAxiosErrorCode = 'ECONNABORTED'
  static ETIMEDOUT: MoriAxiosErrorCode = 'ETIMEDOUT'
  static ERR_NETWORK: MoriAxiosErrorCode = 'ERR_NETWORK'
  static ERR_FR_TOO_MANY_REDIRECTS: MoriAxiosErrorCode = 'ERR_FR_TOO_MANY_REDIRECTS'
  static ERR_DEPRECATED: MoriAxiosErrorCode = 'ERR_DEPRECATED'
  static ERR_BAD_RESPONSE: MoriAxiosErrorCode = 'ERR_BAD_RESPONSE'
  static ERR_BAD_REQUEST: MoriAxiosErrorCode = 'ERR_BAD_REQUEST'
  static ERR_CANCELED: MoriAxiosErrorCode = 'ERR_CANCELED'
  static ERR_NOT_SUPPORT: MoriAxiosErrorCode = 'ERR_NOT_SUPPORT'
  static ERR_INVALID_URL: MoriAxiosErrorCode = 'ERR_INVALID_URL'

  isMoriAxiosError: boolean

  constructor(
    public message: string,
    public code: MoriAxiosErrorCode | null,
    public config: MoriAxiosRequestConfig,
    public request?: XMLHttpRequest | null,
    public response?: MoriAxiosResponse,
  ) {
    super(message)
    this.isMoriAxiosError = true
    this.message = message
    this.config = config
    this.request = request
    this.response = response
    this.code = code

    // Node env and Some Browser env have captureStackTrace
    // https://caniuse.com/?search=captureStackTrace
    if ('captureStackTrace' in Error && isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor)
    }
    else {
      this.stack = (new Error()).stack
    }
  }

  // https://tc39.es/ecma262/multipage/structured-data.html#sec-serializejsonproperty
  // when use JSON.stringify(instance),while invoke instance.constructor.toJSON()
  toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      stack: this.stack,
      config: toJSONObject(this.config),
      code: this.code,
      status: this.response?.status || null,
    }
  }
}

export function createMoriAxiosError(
  message: string,
  code: MoriAxiosErrorCode | null,
  config: MoriAxiosRequestConfig,
  request?: XMLHttpRequest | null,
  response?: MoriAxiosResponse,
) {
  const instance = new MoriAxiosError(message, code, config, request, response)
  return instance
}
