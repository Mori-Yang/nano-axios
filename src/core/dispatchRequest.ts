import type { MoriAxiosPromise, MoriAxiosRequestConfig } from '../types'
import adapters from '../adapter/adapter'
import defaultConfig from '../default/default'
import MoriAxiosError, { createMoriAxiosError } from './MoriAxiosError'

export default function dispatchRequest(config: MoriAxiosRequestConfig): MoriAxiosPromise<unknown> {
  if (!config) {
    throw createMoriAxiosError(`Invalid axios config:${config},check the config and interceptors' return value`, MoriAxiosError.ERR_BAD_OPTION, config)
  }
  if (config.cancelToken) {
    if (config.cancelToken.reason) {
      config.cancelToken.throwIfRequested()
    }
  }
  const adapterFn = adapters.getAdapter(config.adapter || defaultConfig.adapter)
  return adapterFn(config)
}
