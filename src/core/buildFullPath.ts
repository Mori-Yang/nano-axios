import combineURLS from '../helpers/combineURLs'
import isAbsoluteURL from '../helpers/isAbsoluteURL'
import MoriAxiosError, { createMoriAxiosError } from './MoriAxiosError'

export default function buildFullPath(baseURL: string, url: string): string {
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
