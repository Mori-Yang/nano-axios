import type { Interceptor, InterceptorManagerClass, RejectedFn, ResolvedFn } from '../types'

class InterceptorManager<T> implements InterceptorManagerClass<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  // for user
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
    const id = this.interceptors.length
    this.interceptors.push({ resolved, rejected })
    return id
  }

  // for user
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  // inner needed
  forEach(cb: (interceptor: Interceptor<T>) => void) {
    this.interceptors.forEach((int) => {
      if (int !== null) {
        cb(int)
      }
    })
  }
}

export default InterceptorManager
