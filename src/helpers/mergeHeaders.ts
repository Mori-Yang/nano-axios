import type { IHeaders, Method } from '../types'
import { mergeObject } from '../utils'

export function mergeHeaders(headers: IHeaders | undefined | null, method: Method) {
  if (!headers) {
    return headers
  }

  headers = mergeObject(headers.common, headers[method], headers)
  const needDeleteHeaders = ['get', 'post', 'delete', 'option', 'patch', 'put', 'head', 'common']
  needDeleteHeaders.forEach(defaultHeaderKey =>
    delete headers![defaultHeaderKey],
  )

  return headers
}
