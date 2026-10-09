// A client of Blupinta's public API, `/v1`: every operation called by its id (`getHome`, `saveRevision`…), with its
// parameters, body and answer typed from the API's OpenAPI document, the token on every request, and a refusal thrown
// as a `BlupintaError`. It only sends requests: what the API knows, it answers.

import { BlupintaError, errorOf } from './errors'
import type { operations } from './generated/openapi'
import { OPERATIONS, type OperationId } from './generated/operations'

export const API_ORIGIN = 'https://api.blupinta.app'

export type ClientOptions = {
  /** the access token, or how to get a valid one before each request (`tokenKeeper` in `@blupinta/sdk/auth`) */
  token: string | (() => string | Promise<string>)
  /** where the API is; Blupinta's by default */
  baseUrl?: string
  /** the `fetch` to send requests with; the global one by default */
  fetch?: typeof fetch
}

type Operation<Id extends OperationId> = operations[Id]
type Parameters<Id extends OperationId> = Operation<Id>['parameters']
type PathOf<Id extends OperationId> = Parameters<Id> extends { path: infer P } ? P : never
type QueryOf<Id extends OperationId> = Parameters<Id> extends { query?: infer Q } ? Q : never
type BodyOf<Id extends OperationId> =
  Operation<Id> extends {
    requestBody: { content: { 'application/json': infer B } }
  }
    ? B
    : never
type Responses<Id extends OperationId> = Operation<Id>['responses']
type JsonOf<R> = R extends { content: { 'application/json': infer J } } ? J : never
type SuccessOf<Id extends OperationId> =
  | JsonOf<Responses<Id> extends { 200: infer R } ? R : never>
  | JsonOf<Responses<Id> extends { 201: infer R } ? R : never>
type IsFileUpload<Id extends OperationId> =
  Operation<Id> extends {
    requestBody: { content: { 'image/png': unknown } }
  }
    ? true
    : false

/** A file's bytes as sent or received, with their type */
export type FileBytes = { bytes: Uint8Array; contentType: string }

/** What an operation's call takes: its path and query parameters, its body, and what every call may add */
export type Input<Id extends OperationId> = ([PathOf<Id>] extends [never] | [undefined]
  ? { path?: never }
  : { path: PathOf<Id> }) &
  ([QueryOf<Id>] extends [never] | [undefined] ? { query?: never } : { query?: QueryOf<Id> }) &
  ([BodyOf<Id>] extends [never] ? { body?: never } : { body: BodyOf<Id> }) &
  (IsFileUpload<Id> extends true ? { file: FileBytes } : { file?: never }) & {
    /** for an operation that takes one: the same key sent again gets the same answer, acted on once */
    idempotencyKey?: string
    signal?: AbortSignal
  }

/** What an operation's call gives back: its JSON, a file's bytes, or nothing */
export type Answer<Id extends OperationId> = (typeof OPERATIONS)[Id]['answer'] extends 'json'
  ? SuccessOf<Id>
  : (typeof OPERATIONS)[Id]['answer'] extends 'bytes'
    ? FileBytes
    : undefined

/** An answer that may not have changed since its ETag: `null` when it hasn't */
export type Changed<Id extends OperationId> = { data: Answer<Id>; etag: string | null } | null

/** Operations whose input may be left out: nothing in it is required */
type Optional<Id extends OperationId> =
  Partial<Input<Id>> extends Input<Id> ? [input?: Input<Id>] : [input: Input<Id>]

/** The URL of an operation, its path parameters in place and its query after it */
function urlOf(base: string, path: string, input: { path?: unknown; query?: unknown }) {
  const params = (input.path ?? {}) as Record<string, string | number>
  const filled = path.replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = params[name]
    if (value === undefined) throw new TypeError(`the path parameter ${name} is missing`)
    return encodeURIComponent(String(value))
  })
  const url = new URL(filled, base)
  for (const [name, value] of Object.entries((input.query ?? {}) as Record<string, unknown>)) {
    for (const one of [value].flat())
      if (one !== undefined && one !== null) url.searchParams.append(name, String(one))
  }
  return url
}

export function createClient(options: ClientOptions) {
  const base = options.baseUrl ?? API_ORIGIN
  const send = options.fetch ?? globalThis.fetch

  const tokenOf = async () => (typeof options.token === 'string' ? options.token : await options.token())

  /** The answer of the operation `id`, as the API sent it; a refusal thrown */
  async function respond<Id extends OperationId>(
    id: Id,
    input: Partial<Input<Id>> = {},
    headers: Record<string, string> = {},
  ): Promise<Response> {
    const operation = OPERATIONS[id]
    const all: Record<string, string> = { authorization: `Bearer ${await tokenOf()}`, ...headers }
    let body: RequestInit['body']
    if (input.file) {
      all['content-type'] = input.file.contentType
      body = input.file.bytes as RequestInit['body']
    } else if (input.body !== undefined) {
      all['content-type'] = 'application/json'
      body = JSON.stringify(input.body)
    }
    if (input.idempotencyKey) all['idempotency-key'] = input.idempotencyKey
    let response: Response
    try {
      response = await send(urlOf(base, operation.path, input), {
        method: operation.method,
        headers: all,
        body,
        signal: input.signal,
      })
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') throw e
      throw new BlupintaError(0, 'network', { problems: [e instanceof Error ? e.message : String(e)] })
    }
    if (response.status >= 400) throw await errorOf(response)
    return response
  }

  async function answerOf<Id extends OperationId>(id: Id, response: Response): Promise<Answer<Id>> {
    const answer = OPERATIONS[id].answer
    if (answer === 'bytes') {
      const bytes = new Uint8Array(await response.arrayBuffer())
      const contentType = response.headers.get('content-type') ?? 'application/octet-stream'
      return { bytes, contentType } as Answer<Id>
    }
    if (answer === 'json' && response.status !== 204) return (await response.json()) as Answer<Id>
    return undefined as Answer<Id>
  }

  return {
    /** Calls the operation `id` with `input`: its answer, or a `BlupintaError` */
    async call<Id extends OperationId>(id: Id, ...[input]: Optional<Id>): Promise<Answer<Id>> {
      return answerOf(id, await respond(id, input))
    },

    /**
     * Calls the operation `id` unless its answer is still the one of `etag` (an operation that answers with an ETag:
     * the home, a project, a product): `null` when it is, else the new answer and its ETag
     */
    async callIfChanged<Id extends OperationId>(
      id: Id,
      etag: string | null,
      ...[input]: Optional<Id>
    ): Promise<Changed<Id>> {
      const response = await respond(id, input, etag ? { 'if-none-match': etag } : {})
      if (response.status === 304) return null
      return { data: await answerOf(id, response), etag: response.headers.get('etag') }
    },

    /** The operation's raw answer, for one read as it comes (a project's events, `@blupinta/sdk/watch`) */
    response: <Id extends OperationId>(id: Id, ...[input]: Optional<Id>) => respond(id, input),
  }
}

export type Client = ReturnType<typeof createClient>
