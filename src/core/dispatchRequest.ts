import { MoriAxiosPromise, MoriAxiosRequestConfig, MoriAxiosResponse } from '../types'

export default function dispatchRequest(config: MoriAxiosRequestConfig): MoriAxiosPromise<unknown> {
  return xhr(config)
}

function xhr(config: MoriAxiosRequestConfig): MoriAxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'GET', headers } = config

    const request = new XMLHttpRequest()

    /**
     * XMLHttpRequest.readyState
     * 0-UNSENT: Proxy was created but the open() method has not been called yet
     * 1-OPENED: open() has been called
     * 2-HEADERS_RECEIVED: The send() method has been called, and the header and state are available
     * 3-LOADING: Downloading; the responseText property already contains some data.
     * 4-DONE: The download operation has been completed.
     */
    request.onreadystatechange = function handleLoad() {
      if (request.readyState === XMLHttpRequest.UNSENT)
        return
      if (request.readyState !== XMLHttpRequest.DONE)
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
      reject(new Error('Network Error'))
    }

    request.open(method.toUpperCase(), url!, true)

    // ensure data
    if (data !== null && data !== undefined) {
      request.send(data as XMLHttpRequestBodyInit)
    }
    else {
      request.send(null)
    }
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
    reject(new Error(`Request faild with status code ${response.status}`))
  }
}
