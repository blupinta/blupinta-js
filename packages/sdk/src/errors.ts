// What Blupinta's API answers when it says no: one error for every refusal, with the API's own code (`not_found`,
// `conflict`, `rate_limited`…), the problems it lists for a request it can't take, the server's id for its own failure
// and, when it asked to slow down, how long to wait.

import type { components } from './generated/openapi'

/** A refusal's code, as the API names it */
export type ErrorCode = components['schemas']['V1ErrorCode'] | 'network'

export class BlupintaError extends Error {
  readonly status: number
  readonly code: ErrorCode
  /** what is wrong with the request, each with its path */
  readonly problems: string[]
  /** the server's id for a failure of its own: quote it when asking for help */
  readonly errorId: string | null
  /** seconds to wait before asking again (a 429's `Retry-After`) */
  readonly retryAfter: number | null

  constructor(
    status: number,
    code: ErrorCode,
    details: { problems?: string[]; errorId?: string | null; retryAfter?: number | null } = {},
  ) {
    super(details.problems?.length ? `${code}: ${details.problems.join('; ')}` : code)
    this.name = 'BlupintaError'
    this.status = status
    this.code = code
    this.problems = details.problems ?? []
    this.errorId = details.errorId ?? null
    this.retryAfter = details.retryAfter ?? null
  }
}

/** Whether `e` is a refusal of the API, of the code `code` when one is given */
export const isBlupintaError = (e: unknown, code?: ErrorCode): e is BlupintaError =>
  e instanceof BlupintaError && (code === undefined || e.code === code)

/** The error a refused answer stands for, read from its body and headers */
export async function errorOf(response: Response): Promise<BlupintaError> {
  const body: unknown = await response.json().catch(() => null)
  const field = (name: string) =>
    body && typeof body === 'object' ? (body as Record<string, unknown>)[name] : undefined
  const error = field('error')
  const problems = field('problems')
  const errorId = field('errorId')
  const retryAfter = Number(response.headers.get('retry-after'))
  return new BlupintaError(
    response.status,
    typeof error === 'string' ? (error as ErrorCode) : 'server_error',
    {
      problems: Array.isArray(problems) ? problems.filter((p): p is string => typeof p === 'string') : [],
      errorId: typeof errorId === 'string' ? errorId : null,
      retryAfter: Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : null,
    },
  )
}
