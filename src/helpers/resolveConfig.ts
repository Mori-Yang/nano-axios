import buildFullPath from '../core/buildFullPath'
import mergeConfig from '../core/mergeConfig'
import type { MoriAxiosRequestConfig } from '../types'
import buildURL from './buildURL'
import { mergeHeaders } from './mergeHeaders'

export default function resolveConfig(config: MoriAxiosRequestConfig) {
  const newConfig = mergeConfig({}, config)

  const { baseURL, url, params, paramsSerializer, headers, method } = config

  // combined path
  const fullPath = buildFullPath(baseURL, url)
  // combined params
  newConfig.url = buildURL(fullPath, params, { paramsSerializer })
  newConfig.headers = mergeHeaders(headers, method!)
  return newConfig
}
