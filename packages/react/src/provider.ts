// The client every hook of this package uses, given once near the top of the app: `<BlupintaProvider client={…}>`,
// the client of `@blupinta/sdk` (its token kept fresh by `tokenKeeper`), and the answers the hooks share.

import type { Client } from '@blupinta/sdk'
import { createContext, createElement, type ReactNode, useContext, useState } from 'react'
import { type Answers, createAnswers } from './answers'

type Blupinta = { client: Client; answers: Answers }

const BlupintaContext = createContext<Blupinta | null>(null)

export function BlupintaProvider({ client, children }: { client: Client; children?: ReactNode }) {
  // the answers belong to this client: a new one (another person signed in) starts with none
  const [value, setValue] = useState<Blupinta>(() => ({ client, answers: createAnswers() }))
  if (value.client !== client) setValue({ client, answers: createAnswers() })
  return createElement(BlupintaContext.Provider, { value }, children)
}

/** The provider's client and answers; outside a `BlupintaProvider` it throws, saying so */
export function useBlupinta(): Blupinta {
  const value = useContext(BlupintaContext)
  if (!value) throw new Error('@blupinta/react: wrap the app in a <BlupintaProvider client={…}>')
  return value
}
