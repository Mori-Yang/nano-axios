import MoriAxiosError, { createMoriAxiosError } from '../core/MoriAxiosError'
import settle from '../core/settle'
import resolveConfig from '../helpers/resolveConfig'
import type { AdapterInstance, MoriAxiosResponse } from '../types'

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined'

const xhrAdapter: AdapterInstance<MoriAxiosResponse> = (config) => {
  return new Promise((resolve, reject) => {
    // pre processing
    config = resolveConfig(config)

    const { data = null, url, method = 'GET', headers, timeout } = config
    let request: XMLHttpRequest | null | undefined = new XMLHttpRequest()

    if (!url) {
      reject(createMoriAxiosError('Without url', MoriAxiosError.ERR_BAD_REQUEST, config, request))
    }
    // -------XHR Event Listeners-------
    request.timeout = timeout!
    request.ontimeout = function handleTimeout() {
      const timeoutErrorMessage = timeout ? `timeout of ${timeout}ms exceeded` : 'timeout exceeded'
      reject(createMoriAxiosError(timeoutErrorMessage, MoriAxiosError.ETIMEDOUT, config, request))

      request = null
    }
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

      request = null
    }

    request.onerror = function handleError() {
      reject(createMoriAxiosError('Network Error', null, config, request, this.response))
      request = null
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

export default isXHRAdapterSupported ? xhrAdapter : false
