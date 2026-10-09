# @blupinta/sdk

The client of [Blupinta](https://blupinta.app)'s public API, `https://api.blupinta.app/v1`, for the browser and Node
(20 or later): every operation typed from the API's OpenAPI document, the person signed in at `auth.blupinta.app`, a
home followed as its versions are saved, webhooks checked. It only talks to the API: what Blupinta knows (a home's
checks, its geometry), the API answers.

```sh
npm install @blupinta/sdk
```

## Signing in

A screen without a keyboard (a tablet on a wall) uses the device flow: show the code, the person types it on their
phone.

```ts
import { startDeviceSignIn } from '@blupinta/sdk/auth'

const signIn = await startDeviceSignIn({ scope: 'openid offline_access projects:read' })
console.log(`Go to ${signIn.verificationUri} and type ${signIn.userCode}`)
const tokens = await signIn.tokens()
```

An app with a browser uses the authorization code with PKCE, with the client id and return address you registered in
Blupinta's settings (Developers): `startBrowserSignIn` gives the address to send the person to, `finishBrowserSignIn`
turns the address they come back to into tokens. `tokenKeeper` refreshes the access token before it expires.

## Calling the API

```ts
import { createClient } from '@blupinta/sdk'
import { tokenKeeper } from '@blupinta/sdk/auth'

const client = createClient({
  token: tokenKeeper({ clientId: 'device', tokens, onTokens: (fresh) => save(fresh) }),
})
const { rows } = await client.call('listProjects')
const saved = await client.call('getHome', { path: { projectId: rows[0].id } })
```

Each operation is called by its id, as the [reference](https://docs.blupinta.app/reference/api/) names it; its
parameters, body and answer are typed. A refusal is a `BlupintaError` with the API's `code` (`not_found`, `conflict`,
`rate_limited`…), its `problems` and, for a 429, `retryAfter`. `callIfChanged` sends an ETag and answers `null` when
nothing changed.

## Following a home

```ts
import { watchHome } from '@blupinta/sdk/watch'

const watching = watchHome(client, projectId, { onHome: (saved) => draw(saved.home), store })
```

The copy kept in `store` (yours: a file, the browser's storage) shows at once; then the saved version, asked with its
ETag; then each new one, told by the project's events, the stream opened again when it drops.

## Webhooks

```ts
import { readWebhook } from '@blupinta/sdk/webhooks'

const event = await readWebhook({ body: rawBody, signature: request.headers.get('blupinta-signature'), secret })
if (!event) return new Response(null, { status: 400 })
```

The guide: <https://docs.blupinta.app/reference/public-api/>. Apache License 2.0.
