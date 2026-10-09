// A dashboard's first lines with @blupinta/sdk: connect with a code typed on a phone, then show the home and follow
// each new version. Typechecked with the package, so it can't drift from it.
import { createClient } from '@blupinta/sdk'
import { startDeviceSignIn, tokenKeeper } from '@blupinta/sdk/auth'
import { memoryHomeStore, watchHome } from '@blupinta/sdk/watch'

const signIn = await startDeviceSignIn({ scope: 'openid offline_access projects:read' })
console.log(`Open ${signIn.verificationUri} and type ${signIn.userCode}`)
const tokens = await signIn.tokens()

const client = createClient({ token: tokenKeeper({ clientId: 'device', tokens }) })
const { rows } = await client.call('listProjects')
const project = rows[0]
if (!project) throw new Error('no project was chosen')

watchHome(client, project.id, {
  store: memoryHomeStore(),
  onHome: (saved) => console.log(`${saved.home.name}: version ${saved.number}`),
  onError: (error) => console.error(error.code, error.problems),
})
