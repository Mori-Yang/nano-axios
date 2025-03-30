import type { MoriAxiosError as MoriAxiosErrorT, MoriAxiosRequestConfig, MoriAxiosResponse } from '../types'
export default class MoriAxiosError extends Error implements MoriAxiosErrorT {
  message: string
  code?: string | null
  config?: MoriAxiosRequestConfig
  request?: XMLHttpRequest
  response?: MoriAxiosResponse

  constructor(message: string) {
    super(message)
    this.message = message
  }
}
