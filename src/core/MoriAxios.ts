import type { MoriAxios as MoriAxiosT, MoriAxiosPromise, MoriAxiosRequestConfig } from '../types'
import dispatchRequest from './dispatchRequest'
import mergeConfig from './mergeConfig'

export default class MoriAxios implements MoriAxiosT {
  default: MoriAxiosRequestConfig

  constructor(initConfig: MoriAxiosRequestConfig) {
    this.default = initConfig
  }

  request(url: string | MoriAxiosRequestConfig, config: MoriAxiosRequestConfig = {}): MoriAxiosPromise<unknown> {
    if (typeof url === 'string') {
      config.url = url
    }
    else {
      config = url
    }

    config = mergeConfig(this.default, config)
    return dispatchRequest(config)
  }
}
