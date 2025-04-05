import MoriAxios from './core/MoriAxios'
import type { MoriAxiosInstance, MoriAxiosRequestConfig } from './types'
import defaultConfig from './default/default'
import mergeConfig from './core/mergeConfig'

function createInstance<R>(config: MoriAxiosRequestConfig<R | any>): MoriAxiosInstance {
  const ctx = new MoriAxios(defaultConfig === config
    ? defaultConfig
    : mergeConfig(defaultConfig, config),
  )

  const instance = MoriAxios.prototype.request.bind(ctx)

  return instance as MoriAxiosInstance
}

const moriAxios = createInstance(defaultConfig)

moriAxios.create = createInstance
moriAxios.default = defaultConfig

export default moriAxios
