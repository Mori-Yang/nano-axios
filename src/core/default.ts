import type { MoriAxiosRequestConfig } from '../types'

export default {
  method: 'GET',
  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined,
    },
  },
  validateStatus(status) {
    return status >= 200 && status < 300
  },
} as MoriAxiosRequestConfig
