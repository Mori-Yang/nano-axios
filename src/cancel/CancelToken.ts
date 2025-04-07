import type { CancelExecutor, CancelTokenClass, reason, ResolvedFunction } from '../types'

class CancelToken implements CancelTokenClass {
  promise: Promise<reason>
  reason?: reason

  constructor(executor: CancelExecutor) {
    let resolveFn: ResolvedFunction
    this.promise = new Promise((resolve) => {
      resolveFn = resolve as ResolvedFunction
    })

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const token = this
    executor(function cancel(message: string) {
      if (token.reason) {
        return
      }
      token.reason = message
      resolveFn(message)
    })
  }

  /**
   * If the request has been sent, an error is reported.
   * This function should be called before sending the request.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }
}

export default CancelToken
