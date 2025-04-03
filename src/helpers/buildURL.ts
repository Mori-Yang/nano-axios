import type { MoriAxiosRequestConfig } from '../types'
import { forEach, isArray, isURLSearchParams, isDate, isPlainObject } from '../utils'

interface BuildURLOptions {
  paramsSerializer: MoriAxiosRequestConfig['paramsSerializer']
}

export function encode(val: string) {
  return encodeURIComponent(val)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export default function buildURL(url: string, params: MoriAxiosRequestConfig['params'], options: BuildURLOptions): string {
  if (!params) {
    return url
  }

  const serializer = options.paramsSerializer
  let serializedParams = ''
  if (serializer) {
    serializedParams = serializer(params)
  }
  else if (isURLSearchParams(params)) {
    serializedParams = (params as URLSearchParams).toString()
  }
  else {
    /**
     * axios.get("https://example/",{params:{id:[1,2,3]}})
     * https://example/?id[]=1&id[]=2&id[]=3
     */
    const pairs: string[] = []
    forEach(params, (v, k) => {
      if (v == null) return

      const valueArray: unknown[] = []
      if (isArray(v)) {
        valueArray.concat(v)
        k += '[]'
      }
      else {
        valueArray.push(v)
      }

      forEach<Array<unknown>, number>(valueArray, (value) => {
        let _val: string
        if (isDate(value)) {
          _val = (value as Date).toISOString()
        }
        else if (isPlainObject(value)) {
          _val = JSON.stringify(value)
        }
        else {
          _val = String(value)
        }

        pairs.push(`${encode(k)}=${encode(_val)}`)
      })
    })

    serializedParams = pairs.join('&')
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#')

    // has hash
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
