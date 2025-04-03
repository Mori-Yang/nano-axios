import { expect, describe, it } from 'vitest'
import { encode } from '../src/helpers/buildURL'

describe('should', () => {
  it('encodeURIComponent', () => {
    expect(encodeURIComponent('http://foo?x=1&y[]=2&y[]=3')).toBe(`http%3A%2F%2Ffoo%3Fx%3D1%26y%5B%5D%3D2%26y%5B%5D%3D3`)
  })

  it('encode', () => {
    expect(encode('http://foo?x=1&y[]=2&y[]=3')).toBe(`http:%2F%2Ffoo%3Fx%3D1%26y[]%3D2%26y[]%3D3`)
  })
})
