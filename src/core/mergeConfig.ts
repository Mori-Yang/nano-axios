import type { MoriAxiosRequestConfig } from '../types'
import { isPlainObject, mergeObject } from '../utils'

interface Strategy {
  (from1: unknown, from2: unknown): unknown
}

const defaultStrategy: Strategy = (val1, val2) => {
  return val2 ?? val1
}

const only2Strategy: Strategy = (_val1, val2) => {
  return val2
}

const deepStrategy: Strategy = (val1: unknown, val2: unknown) => {
  if (isPlainObject(val2)) {
    return mergeObject(val1, val2)
  }
  if (val2 != null) {
    return val2
  }

  if (isPlainObject(val1)) {
    return mergeObject(val1)
  }
  if (val1 != null) {
    return val1
  }
}

const mergeStrategyMap: Record<keyof MoriAxiosRequestConfig, Strategy> = {
  url: only2Strategy,
  method: defaultStrategy,
  adapter: defaultStrategy,
  timeout: defaultStrategy,
  data: only2Strategy,
  params: only2Strategy,
  headers: deepStrategy,
  validateStatus: defaultStrategy,
  baseURL: only2Strategy,
  paramsSerializer: only2Strategy,
  responseType: only2Strategy,
}

function mergeConfig(
  config: MoriAxiosRequestConfig,
  inputConfig: MoriAxiosRequestConfig,
): MoriAxiosRequestConfig {
  if (!inputConfig) {
    inputConfig = {}
  }
  const result = Object.create(null)

  const mergeField = (key: keyof MoriAxiosRequestConfig): void => {
    const mergeStrategy = mergeStrategyMap[key] || defaultStrategy

    result[key] = mergeStrategy(config[key], inputConfig[key])
  }

  for (const k in inputConfig) {
    const key = k as keyof MoriAxiosRequestConfig
    mergeField(key)
  }

  for (const k in config) {
    const key = k as keyof MoriAxiosRequestConfig
    if (!inputConfig[key]) {
      mergeField(key)
    }
  }

  return result
}

export default mergeConfig
