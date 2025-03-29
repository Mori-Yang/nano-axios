import MoriAxios from './core/MoriAxios'
import { MoriAxiosInstance, MoriAxiosRequestConfig } from './types'

const defaults = {

} as MoriAxiosRequestConfig

export function createInstance(config: MoriAxiosRequestConfig): MoriAxiosInstance {
  const ctx = new MoriAxios(config)

  return ctx as MoriAxiosInstance
}

const moriAxios = createInstance(defaults)

export default moriAxios
