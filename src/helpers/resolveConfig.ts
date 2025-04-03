import buildFullPath from '../core/buildFullPath'
import mergeConfig from '../core/mergeConfig'
import type { MoriAxiosRequestConfig } from '../types'
import buildURL from './buildURL'

export default function resolveConfig(config: MoriAxiosRequestConfig) {
  const newConfig = mergeConfig({}, config)

  const { baseURL, url, params, paramsSerializer } = config

  // combined path
  const fullPath = buildFullPath(baseURL, url)
  // combined params
  newConfig.url = buildURL(fullPath, params, { paramsSerializer })

  return newConfig
}
