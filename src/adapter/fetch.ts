import resolveConfig from '../helpers/resolveConfig'
import type { AdapterInstance, MoriAxiosResponse } from '../types'

const isFetchAdapterSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function'

const fetchAdapter: AdapterInstance<MoriAxiosResponse> = (config) => {
  return new Promise((_resolve, _reject) => {
    // pre processing
    config = resolveConfig(config)
    // const { data = null, url, method = 'GET', headers, timeout } = config
  })
}

export default isFetchAdapterSupported ? fetchAdapter : false
