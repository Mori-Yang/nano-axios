import type { MoriAxiosResponse } from '../types'
import MoriAxiosError, { createMoriAxiosError } from './MoriAxiosError'

export default function settle(
  resolve: (value: MoriAxiosResponse) => void,
  reject: (reason: unknown) => void,
  response: MoriAxiosResponse,
) {
  const validateStatus = response.config.validateStatus

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response)
  }
  else {
    reject(createMoriAxiosError(`Request faild with status code ${response.status}`, [MoriAxiosError.ERR_BAD_REQUEST, MoriAxiosError.ERR_BAD_RESPONSE][
      Math.floor(response.status / 100) === 4 ? 0 : 1
    ], {}, null, response))
  }
}
