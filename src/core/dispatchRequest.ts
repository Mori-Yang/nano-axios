import type { MoriAxiosPromise, MoriAxiosRequestConfig } from '../types'
import adapters from '../adapter/adapter'
import defaultConfig from '../default/default'

export default function dispatchRequest(config: MoriAxiosRequestConfig): MoriAxiosPromise<unknown> {
  const adapterFn = adapters.getAdapter(config.adapter || defaultConfig.adapter)
  return adapterFn(config)
}
