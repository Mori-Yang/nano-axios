import { MoriAxios as IAxios, MoriAxiosPromise, MoriAxiosRequestConfig } from '../types'
import dispatchRequest from './dispatchRequest'

export default class MoriAxios implements IAxios {
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

    return dispatchRequest({
      ...this.default,
      ...config,
    })
  }
}
