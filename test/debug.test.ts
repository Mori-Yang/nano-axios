import { describe, it, expect } from 'vitest'
import { isPlainObject } from '../src/utils'

describe('should', () => {
  it('type test', () => {
    expect(isPlainObject(() => {})).toMatchInlineSnapshot(`false`)
  })
})
