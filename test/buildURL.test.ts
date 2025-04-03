import { expect, describe, it } from 'vitest'
import buildURL from '../src/helpers/buildURL'
import type { MoriAxiosRequestConfig } from '../src'

describe('helpers::buildURL', function () {
  it('should support null params', function () {
    expect(buildURL('/foo')).toEqual('/foo')
  })

  it('should support params', function () {
    expect(buildURL('/foo', {
      foo: 'bar',
      isUndefined: undefined,
      isNull: null,
    })).toEqual('/foo?foo=bar')
  })

  it('should support sending raw params to custom serializer func', function () {
    const serializer = (_params: MoriAxiosRequestConfig['params']) => {
      return `foo=bar`
    }
    expect(
      buildURL(
        '/foo',
        {
          foo: 'bar',
        },
        {
          paramsSerializer: serializer,
        },
      ),
    ).toEqual('/foo?foo=bar')
  })

  // cant not serialized
  // it('should support object params', function () {
  //   expect(buildURL('/foo', {
  //     foo: {
  //       bar: 'baz',
  //     },
  //   })).toEqual('/foo?foo[bar]=baz')
  // })

  // use JSON.stringify
  it('should support object params', function () {
    expect(buildURL('/foo', {
      foo: {
        bar: 'baz',
      },
    })).toMatchInlineSnapshot(`"/foo?foo=%7B%22bar%22:%22baz%22%7D"`)
  })

  it('should support date params', function () {
    const date = new Date()

    expect(buildURL('/foo', {
      date: date,
    })).toEqual(`/foo?date=${date.toISOString()}`)
  })

  it('should support array params', function () {
    expect(buildURL('/foo', {
      foo: ['bar', 'baz', null, undefined],
    })).toEqual('/foo?foo[]=bar&foo[]=baz')
  })

  // cant not serialized nest array
  // it('should support nested array params', function () {
  //   expect(buildURL('/foo', {
  //     foo: ['bar', 'baz', [1, 2]],
  //   })).toEqual('/foo?foo[]=bar&foo[]=bazr&foo[]=[1,2]')
  // })

  it('should support special char params', function () {
    expect(buildURL('/foo', {
      foo: ':$, ',
    })).toEqual('/foo?foo=:$,+')
  })

  it('should support existing params', function () {
    expect(buildURL('/foo?foo=bar', {
      bar: 'baz',
    })).toEqual('/foo?foo=bar&bar=baz')
  })

  it('should support "length" parameter', function () {
    expect(buildURL('/foo', {
      query: 'bar',
      start: 0,
      length: 5,
    })).toEqual('/foo?query=bar&start=0&length=5')
  })

  it('should correct discard url hash mark', function () {
    expect(buildURL('/foo?foo=bar#hash', {
      query: 'baz',
    })).toEqual('/foo?foo=bar&query=baz')
  })

  it('should support URLSearchParams', function () {
    expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toEqual('/foo?bar=baz')
  })
})
