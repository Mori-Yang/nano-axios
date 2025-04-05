import { expect, describe, it } from 'vitest'
import adapter from '../src/adapter/adapter'
import type { AdapterInstance, MoriAxiosRequestConfig } from '../src'
import moriAxios from '../src'
describe('should', () => {
  it('show::Known Adapters:', () => {
    expect(adapter.adapters).toMatchInlineSnapshot(`
      {
        "fetch": [Function],
        "xhr": false,
      }
    `)
  })

  it('custom adapter', () => {
    interface RenturnType<D> {
      data: D
      upstream: string
    }
    const customAdapter: AdapterInstance<RenturnType<number>> = (_config: MoriAxiosRequestConfig<RenturnType<number>>) => {
      return new Promise((resolve) => {
        resolve({ data: 1, upstream: 'custom' })
      })
    }
    const instance = moriAxios.create({ adapter: customAdapter })
    expect(instance.default.adapter).toBe(customAdapter)
  })

  it('get adapters', () => {
    interface RenturnType<D> {
      data: D
      upstream: string
    }
    const customAdapter: AdapterInstance<RenturnType<number>> = (_config: MoriAxiosRequestConfig<RenturnType<number>>) => {
      return new Promise((resolve) => {
        resolve({ data: 1, upstream: 'custom' })
      })
    }

    expect(adapter.getAdapter([customAdapter, 'fetch', 'xhr'])).toBe(customAdapter)
    expect(adapter.getAdapter(['fetch', customAdapter, 'xhr'])).toBe(adapter.adapters.fetch)
    expect(adapter.getAdapter(['xhr', customAdapter, 'fetch'])).toBe(customAdapter)
    expect(adapter.getAdapter(['fetch', 'xhr', customAdapter])).toBe(adapter.adapters.fetch)
  })
})
