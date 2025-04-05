import MoriAxiosError, { createMoriAxiosError } from '../core/MoriAxiosError'
import type { Adapter, AdapterInstance, MoriAxiosResponse } from '../types'
import { isArray } from '../utils'
import xhrAdapter from './xhr'
import fetchAdapter from './fetch'

const knownAdapters: Record<string, (AdapterInstance<MoriAxiosResponse> | false | undefined)> = {
  xhr: xhrAdapter,
  fetch: fetchAdapter,
}

export default {
  adapters: knownAdapters,
  getAdapter<R>(adapters: Adapter<R>): AdapterInstance<R> {
    if (!isArray(adapters)) {
      adapters = [adapters] as Adapter<R>
    }

    let finalAdapter: AdapterInstance<R> | false | undefined
    for (let i = 0; i < adapters.length; i++) {
      const adapterOrName = (adapters as Array<string | AdapterInstance<R>>)[i]
      if (typeof adapterOrName === 'string') {
        finalAdapter = knownAdapters[adapterOrName] as AdapterInstance<R> | false | undefined
        if (finalAdapter !== false) {
          return finalAdapter as AdapterInstance<R>
        }
      }
      else if (typeof adapterOrName === 'function') {
        finalAdapter = adapterOrName
      }

      if (finalAdapter) {
        break
      }
    }

    if (!finalAdapter) {
      throw createMoriAxiosError('There is no suitable adapter to dispatch the request', MoriAxiosError.ERR_NOT_SUPPORT, {})
    }

    return finalAdapter as AdapterInstance<R>
  },
}
