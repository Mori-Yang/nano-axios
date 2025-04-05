import type { DefaultMoriAxiosRequestConfig } from '../types'

const defaultConfig = {
  method: 'GET',
  timeout: 0,
  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined,
    },
  },
  adapter: ['xhr'],
  validateStatus(status) {
    return status >= 200 && status < 300
  },
} as DefaultMoriAxiosRequestConfig

export default defaultConfig
