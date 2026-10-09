# @blupinta/react

React hooks for [Blupinta](https://blupinta.app)'s public API, on [`@blupinta/sdk`](../sdk): a home followed as its
versions are saved, a project, its versions, and signing the person in from the browser. React 18 or 19.

```sh
npm install @blupinta/react @blupinta/sdk
```

```tsx
import { createClient } from '@blupinta/sdk'
import { useHome } from '@blupinta/react/hooks'
import { BlupintaProvider } from '@blupinta/react/provider'
import { useSignIn } from '@blupinta/react/sign-in'

function App() {
  const session = useSignIn({
    clientId: 'app_…', // registered in Blupinta's settings, Developers
    redirectUri: 'https://your.app/', // one of its return addresses: this page finishes the sign-in
    scope: 'openid offline_access projects:read',
  })
  const client = useMemo(() => createClient({ token: session.token }), [session.token])
  if (!session.tokens) return <button onClick={session.signIn}>Sign in with Blupinta</button>
  return (
    <BlupintaProvider client={client}>
      <Home projectId="…" />
    </BlupintaProvider>
  )
}

function Home({ projectId }: { projectId: string }) {
  const { data, error, isLoading } = useHome(projectId)
  if (isLoading) return <p>Loading…</p>
  if (error) return <p>{error.code}</p>
  return <h1>{data?.home.name}, version {data?.number}</h1>
}
```

- `useHome(projectId, { store })`: the last saved version, followed while a component shows it; the copy kept in
  `store` first, so a dashboard shows its house even offline.
- `useProject(projectId)`, `useRevisions(projectId)`: read once, shared by every component, `refresh()` to ask again.
- `useSignIn(options)`: the authorization code with PKCE; the tokens kept in the browser's storage (or yours) and
  refreshed before they expire.

Every hook returns `{ data, error, isLoading }`; `error` is the SDK's `BlupintaError`, with the API's `code`.

The guide: <https://docs.blupinta.app/reference/public-api/>. Apache License 2.0.
