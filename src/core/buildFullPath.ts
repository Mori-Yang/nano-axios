import combineURLS from '../helpers/combineURLs'
import isAbsoluteURL from '../helpers/isAbsoluteURL'
import type { MoriAxiosRequestConfig } from '../types'
import MoriAxiosError, { createMoriAxiosError } from './MoriAxiosError'

export default function buildFullPath(baseURL: MoriAxiosRequestConfig['baseURL'], url: MoriAxiosRequestConfig['baseURL']): string {
  if (!url) {
    throw createMoriAxiosError(`Wrong URL`, MoriAxiosError.ERR_BAD_REQUEST, { baseURL, url })
  }
  if (isAbsoluteURL(url)) {
    return url
  }
  else {
    if (baseURL) {
      return combineURLS(baseURL, url)
    }
    return url
  }
}
