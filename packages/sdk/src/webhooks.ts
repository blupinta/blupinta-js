// Checking that a webhook's post came from Blupinta (the guide's Webhooks): its `Blupinta-Signature` header is
// `t=<seconds>,v1=<hex>`, the HMAC-SHA256 of `<t>.<body>` with the webhook's secret. A post signed with another secret,
// changed on the way, or older than the tolerance (a replay) is refused. Web Crypto only: in Node, Deno, Bun, Workers.

import type { components } from './generated/openapi'

/** What a webhook's post carries, its JSON body read once the signature holds */
export type WebhookBody = components['schemas']['V1WebhookBody']

const hex = (bytes: ArrayBuffer) =>
  [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('')

/** Compared in a time that doesn't depend on where they differ */
function isSameText(a: string, b: string) {
  if (a.length !== b.length) return false
  let difference = 0
  for (let i = 0; i < a.length; i++) difference |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return difference === 0
}

/**
 * Whether `body` (the post's raw text, before any parsing) was signed by Blupinta with `secret` within the last
 * `toleranceSeconds` (5 minutes by default)
 */
export async function isSignedWebhook({
  body,
  signature,
  secret,
  toleranceSeconds = 300,
  now = new Date(),
}: {
  body: string
  /** the `Blupinta-Signature` header */
  signature: string | null
  secret: string
  toleranceSeconds?: number
  now?: Date
}) {
  const parts = new Map(
    (signature ?? '').split(',').map((part) => part.split('=', 2) as [string, string | undefined]),
  )
  const t = Number(parts.get('t'))
  const v1 = parts.get('v1')
  if (!Number.isInteger(t) || !v1) return false
  if (Math.abs(now.getTime() / 1000 - t) > toleranceSeconds) return false
  const encoder = new TextEncoder()
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const expected = hex(await globalThis.crypto.subtle.sign('HMAC', key, encoder.encode(`${t}.${body}`)))
  return isSameText(expected, v1)
}

/** The body of a post whose signature holds; `null` when it doesn't, so the app answers 400 and ignores it */
export async function readWebhook(
  options: Parameters<typeof isSignedWebhook>[0],
): Promise<WebhookBody | null> {
  return (await isSignedWebhook(options)) ? (JSON.parse(options.body) as WebhookBody) : null
}
