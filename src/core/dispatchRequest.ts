import resolveConfig from '../helpers/resolveConfig'
import type { MoriAxiosPromise, MoriAxiosRequestConfig, MoriAxiosResponse } from '../types'
import MoriAxiosError, { createMoriAxiosError } from './MoriAxiosError'

export default function dispatchRequest(config: MoriAxiosRequestConfig): MoriAxiosPromise<unknown> {
  return xhr(config)
}

function xhr(config: MoriAxiosRequestConfig): MoriAxiosPromise {
  return new Promise((resolve, reject) => {
    // pre processing
    config = resolveConfig(config)

    const { data = null, url, method = 'GET', headers } = config
    let request: XMLHttpRequest | null | undefined = new XMLHttpRequest()

    if (!url) {
      reject(createMoriAxiosError('Without url', MoriAxiosError.ERR_BAD_REQUEST, config, request))
    }
    // -------XHR Event Listeners-------
    /**
     * XMLHttpRequest.readyState
     * 1-OPENED: open() has been called
     * 2-HEADERS_RECEIVED: The send() method has been called, and the header and state are available
     * 3-LOADING: Downloading; the responseText property already contains some data
     * 4-DONE: The download operation has been completed
     */
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== XMLHttpRequest.DONE)
        return

      const response: MoriAxiosResponse = {
        data: request.response,
        status: request.status,
        statusText: request.statusText,
        headers: headers || {},
        config,
        request,
      }

      settle(resolve, reject, response)
    }

    request.onerror = function handleError() {
      reject(createMoriAxiosError('Network Error', null, config, request, this.response))
    }

    request.onabort = function handleAbort() {
      if (!request)
        return

      reject(createMoriAxiosError('Request aborted', MoriAxiosError.ECONNABORTED, config, request))

      request = null
    }
    // -------XHR Event Listeners-------

    request.open(method.toUpperCase(), url!, true)

    request.send(data as XMLHttpRequestBodyInit || null)
  })
}

function settle(
  resolve: (value: MoriAxiosResponse) => void,
  reject: (reason: unknown) => void,
  response: MoriAxiosResponse,
) {
  const validateStatus = response.config.validateStatus

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response)
  }
  else {
    reject(createMoriAxiosError(`Request faild with status code ${response.status}`, [MoriAxiosError.ERR_BAD_REQUEST, MoriAxiosError.ERR_BAD_RESPONSE][
      Math.floor(response.status / 100) === 4 ? 0 : 1
    ], {}, null, response))
  }
}
