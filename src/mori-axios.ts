import MoriAxios from './core/MoriAxios'
import type { MoriAxiosInstance, MoriAxiosRequestConfig } from './types'
import defaultConfig from './core/default'

export function createInstance(config: MoriAxiosRequestConfig): MoriAxiosInstance {
  const ctx = new MoriAxios(config)

  return ctx as MoriAxiosInstance
}

const moriAxios = createInstance(defaultConfig)

export default moriAxios
