import type { MoriAxios as MoriAxiosT, MoriAxiosPromise, MoriAxiosRequestConfig, Interceptors, ResolvedFn, RejectedFn } from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface ChainNode<T> {
  task: ResolvedFn<T> | ((config: MoriAxiosRequestConfig) => MoriAxiosPromise<T>)
  errorCap: RejectedFn | null
}
type Chian<T> = Array<ChainNode<T>>

export default class MoriAxios implements MoriAxiosT {
  default: MoriAxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: MoriAxiosRequestConfig) {
    this.default = initConfig
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
  }

  request(url: string | MoriAxiosRequestConfig, config: MoriAxiosRequestConfig = {}): MoriAxiosPromise<unknown> {
    if (typeof url === 'string') {
      config.url = url
    }
    else {
      config = url
    }

    config = mergeConfig(this.default, config)

    const chain: Chian<any> = [{
      task: dispatchRequest,
      errorCap: null,
    }]

    this.interceptors.request.forEach((interceptor) => {
      chain.unshift({
        task: interceptor.resolved,
        errorCap: interceptor.rejected || null,
      })
    })

    this.interceptors.response.forEach((interceptor) => {
      chain.push({
        task: interceptor.resolved,
        errorCap: interceptor.rejected || null,
      })
    })

    let promise = Promise.resolve(config)

    while (chain.length > 0) {
      const { task, errorCap } = chain.shift()!
      promise = promise.then(task, errorCap)
    }

    return promise
  }
}
