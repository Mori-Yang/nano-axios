const typeOfTest = (type: string) => {
  return (thing: unknown) => {
    return typeof thing === type
  }
}

const kindOfTest = (type: string) => {
  type = type.toLowerCase()

  return (thing: unknown) => {
    return Object.prototype.toString.call(thing).slice(8, -1).toLowerCase() === type
  }
}

export const { isArray } = Array
export const isFunction = typeOfTest('function')
export const isUndefined = typeOfTest('undefined')
export const isString = typeOfTest('string')
export const isNumber = typeOfTest('number')
export const isSymbol = typeOfTest('symbol')
export const isBoolearn = typeOfTest('boolean')
export const isObject = (thing: unknown) => {
  return thing !== null && typeof thing === 'object'
}
export const isPlainObject = (thing: unknown) => {
  if (!kindOfTest('object')(thing)) {
    return false
  }

  const prototype = Object.getPrototypeOf(thing)
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in (thing as Record<symbol, unknown>)) && !(Symbol.iterator in (thing as Record<symbol, unknown>))
}

export const toJSONObject = <T = object>(obj: T) => {
  const stack = new Array(10)

  const visit = (source: T, i: number) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return
      }

      if (!('toJSON' in source)) {
        stack[i] = source
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target: Record<string | number, any> = isArray(source) ? [] : {}
        for (const key in source) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const value = (source as Record<string, any>)[key]
          const reducedValue = visit(value, i + 1)

          if (!isUndefined(reducedValue))
            target[key] = reducedValue
        }
        stack[i] = undefined
        return target
      }
    }

    return source
  }

  return visit(obj, 0)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mergeObject(...args: any[]) {
  const res = Object.create(null)

  const assignValue = (val: unknown, key: string) => {
    if (isPlainObject(res[key]) && isPlainObject(val)) {
      res[key] = mergeObject(res[key], val)
    }
    else if (isPlainObject(val)) {
      res[key] = mergeObject({}, key)
    }
    else {
      res[key] = val
    }
  }

  for (let i = 0; i < args.length; i++) {
    const temp = args[i]

    for (const key in temp) {
      assignValue(temp[key], key)
    }
  }

  return res
}
