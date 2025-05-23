import MoriAxiosError, { createMoriAxiosError } from '../core/MoriAxiosError'
import settle from '../core/settle'
import resolveConfig from '../helpers/resolveConfig'
import type { AdapterInstance, MoriAxiosResponse, reason } from '../types'

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined'

const xhrAdapter: AdapterInstance<MoriAxiosResponse> = (config) => {
  return new Promise((resolve, reject) => {
    // pre processing
    config = resolveConfig(config)

    const { data = null, url, method = 'GET', headers, timeout, cancelToken, signal } = config
    let request: XMLHttpRequest | null | undefined = new XMLHttpRequest()

    if (!url) {
      reject(createMoriAxiosError('Without url', MoriAxiosError.ERR_BAD_REQUEST, config, request))
    }

    let onCanceled: (reason: reason) => void

    if (cancelToken || signal) {
      onCanceled = (reason: reason) => {
        if (!request) return
        reject(reason)
        request.abort()
      }
    }

    // -------XHR Event Listeners-------
    request.timeout = timeout!
    request.ontimeout = function handleTimeout() {
      const timeoutErrorMessage = timeout ? `timeout of ${timeout}ms exceeded` : 'timeout exceeded'
      reject(createMoriAxiosError(timeoutErrorMessage, MoriAxiosError.ETIMEDOUT, config, request))

      request = null
    }

    const cleanup = () => {
      if (signal) {
        signal?.removeEventListener('abort', onCanceled as unknown as any)
      }
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

      settle(
        (val) => {
          resolve(val)
          cleanup()
        },
        (val) => {
          reject(val)
          cleanup()
        },
        response,
      )

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

    if (cancelToken || signal) {
      cancelToken?.promise.then((reason) => {
        onCanceled(reason)
      })
      if (signal) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        signal.aborted
          ? onCanceled!(signal.reason)
          : signal.addEventListener('abort', () => {
            console.log('signal cancel')
            onCanceled!(signal.reason)
          })
      }
    }

    request?.send(data as XMLHttpRequestBodyInit || null)
  })
}

export default isXHRAdapterSupported ? xhrAdapter : false
