// A home file checked by Blupinta's own checks (`POST /v1/homes/check`: the CLI holds none of them), and a project's
// home followed as its versions are saved: each one said, written into a folder, and a command run, as asked.

import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { BlupintaError } from '@blupinta/sdk/errors'
import { watchHome } from '@blupinta/sdk/watch'
import { type Context, clientOf } from '../context'
import { fileNameOf, HOME_FILE, writeFolderFile, writeHome, writeState } from '../folder'
import { projectNamed } from './projects'

/** The file checked: what blocks saving it, each problem with where it is. Fails (exit 1) when it isn't valid */
export async function check(context: Context, file: string | undefined) {
  const path = resolve(context.cwd, file ?? HOME_FILE)
  let home: unknown
  try {
    home = JSON.parse(await readFile(path, 'utf8'))
  } catch (e) {
    throw new BlupintaError(400, 'invalid_input', {
      problems: [`${path}: ${e instanceof Error ? e.message : 'not readable'}`],
    })
  }
  const checked = await (await clientOf(context)).call('checkHome', { body: { home } })
  context.out.line(
    checked.isValid
      ? `${path}: valid, version ${checked.checkedAt}`
      : `${path}: ${checked.problems.length} problems keep it from being saved`,
  )
  for (const p of checked.problems)
    context.out.line(`  ${p.kind}${p.plan ? ` (plan ${p.plan})` : ''}${p.message ? `: ${p.message}` : ''}`)
  context.out.result(checked)
  return checked.isValid
}

/** Runs `command` in a shell, the version's number in `BLUPINTA_REVISION`; its failure is said, not thrown */
function run(context: Context, command: string, revision: number, dir: string | null) {
  return new Promise<void>((done) => {
    const child = spawn(command, {
      shell: true,
      stdio: context.out.isJson ? 'ignore' : 'inherit',
      cwd: dir ?? context.cwd,
      env: { ...process.env, BLUPINTA_REVISION: String(revision) },
    })
    child.on('exit', (code) => {
      if (code) context.out.line(`\`${command}\` ended with ${code}`)
      done()
    })
  })
}

/** Follows a project's saved versions until stopped (Ctrl-C), or until the CLI loses the project */
export async function watch(
  context: Context,
  named: string | undefined,
  options: { dir?: string; exec?: string; signal?: AbortSignal },
) {
  const client = await clientOf(context)
  const project = await projectNamed(client, named)
  const dir = options.dir ? resolve(context.cwd, options.dir) : null
  context.out.line(`Following “${project.name}”: Ctrl-C to stop`)
  let queue = Promise.resolve()
  await new Promise<void>((stopped) => {
    const watching = watchHome(client, project.id, {
      signal: options.signal,
      onHome: (saved) => {
        // one version handled at a time, in the order they came
        queue = queue.then(async () => {
          context.out.line(`Version ${saved.number}: ${saved.message}`)
          if (context.out.isJson) context.out.result({ revision: saved.number, message: saved.message })
          if (dir) {
            await writeHome(dir, saved.home)
            for (const file of saved.files) {
              const { bytes } = await client.call('getFile', {
                path: { projectId: project.id, sha256: file.sha256 },
              })
              await writeFolderFile(dir, fileNameOf(file.sha256, file.contentType), bytes)
            }
            await writeState(dir, { projectId: project.id, revision: saved.number })
          }
          if (options.exec) await run(context, options.exec, saved.number, dir)
        })
      },
      onError: (error) => {
        context.out.line(`! ${error.code}${error.problems.length ? `: ${error.problems.join('; ')}` : ''}`)
        if (error.code === 'forbidden' || error.code === 'not_found' || error.code === 'unauthenticated')
          stopped()
      },
    })
    options.signal?.addEventListener('abort', () => {
      watching.stop()
      stopped()
    })
  })
  await queue
}
