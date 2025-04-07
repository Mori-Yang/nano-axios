import MoriAxios from './core/MoriAxios'
import type { MoriAxiosInstance, MoriAxiosRequestConfig } from './types'
import defaultConfig from './default/default'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'

function createInstance<R>(config: MoriAxiosRequestConfig<R | any>): MoriAxiosInstance {
  const ctx = new MoriAxios(defaultConfig === config
    ? defaultConfig
    : mergeConfig(defaultConfig, config),
  )

  return ctx as MoriAxiosInstance
}

const moriAxios = createInstance(defaultConfig)

moriAxios.create = createInstance
moriAxios.default = defaultConfig
moriAxios.CancelToken = CancelToken

export default moriAxios
