// A page with @blupinta/react: sign in with Blupinta, then show a home that updates as versions are saved.
// Typechecked with the package, so it can't drift from it.
import { useHome } from '@blupinta/react/hooks'
import { BlupintaProvider } from '@blupinta/react/provider'
import { useSignIn } from '@blupinta/react/sign-in'
import { createClient } from '@blupinta/sdk'
import { useMemo } from 'react'

export function App() {
  const session = useSignIn({
    clientId: 'app_…', // registered in Blupinta's settings, Developers
    redirectUri: 'https://your.app/', // one of its return addresses: this page finishes the sign-in
    scope: 'openid offline_access projects:read',
  })
  const client = useMemo(() => createClient({ token: session.token }), [session.token])
  if (!session.tokens)
    return (
      <button type="button" onClick={session.signIn}>
        Sign in with Blupinta
      </button>
    )
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
  return (
    <h1>
      {data?.home.name}, version {data?.number}
    </h1>
  )
}
