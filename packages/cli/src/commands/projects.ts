// The projects the person gave the CLI: listed, a home pulled into a folder with its files, a folder's home pushed back
// as a new version (refused when someone saved in between, saying who), all the versions taken as a zip.

import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Client } from '@blupinta/sdk'
import { BlupintaError, isBlupintaError } from '@blupinta/sdk/errors'
import { type Context, clientOf } from '../context'
import {
  fileNameOf,
  readFolderFiles,
  readHome,
  readState,
  writeFolderFile,
  writeHome,
  writeState,
} from '../folder'

/** The project a command names, by its id or its name (any case), among those the person gave the CLI */
export async function projectNamed(client: Client, named: string | undefined) {
  if (!named)
    throw new BlupintaError(400, 'invalid_input', { problems: ['name a project: its id or its name'] })
  const { rows } = await client.call('listProjects')
  const found = rows.filter((p) => p.id === named || p.name.toLowerCase() === named.toLowerCase())
  if (found.length === 1 && found[0]) return found[0]
  const problem = found.length
    ? `${found.length} projects are named “${named}”: name it by its id`
    : `no project “${named}” among those you gave the CLI (blupinta projects)`
  throw new BlupintaError(404, 'not_found', { problems: [problem] })
}

export async function projects(context: Context) {
  const { rows } = await (await clientOf(context)).call('listProjects')
  for (const p of rows)
    context.out.line(
      `${p.id}  ${p.name}${p.lastRevision ? `  (version ${p.lastRevision.number})` : '  (no version yet)'}`,
    )
  if (!rows.length) context.out.line('No projects: allow some with `blupinta login`')
  context.out.result(rows)
}

/** The home of a project, the last version or the one asked, with the files it names, into `dir` */
export async function pull(
  context: Context,
  named: string | undefined,
  options: { revision?: number; dir?: string },
) {
  const client = await clientOf(context)
  const project = await projectNamed(client, named)
  const dir = resolve(context.cwd, options.dir ?? project.name)
  const path = { projectId: project.id }
  const saved = options.revision
    ? await client.call('getRevision', { path: { ...path, number: options.revision } })
    : await client.call('getHome', { path })
  await writeHome(dir, saved.home)
  for (const file of saved.files) {
    const { bytes } = await client.call('getFile', { path: { ...path, sha256: file.sha256 } })
    await writeFolderFile(dir, fileNameOf(file.sha256, file.contentType), bytes)
  }
  await writeState(dir, { projectId: project.id, revision: saved.number })
  context.out.line(`Version ${saved.number} of “${project.name}” in ${dir} (${saved.files.length} files)`)
  context.out.result({ projectId: project.id, revision: saved.number, dir, files: saved.files.length })
}

/** The folder's home saved as a new version of its project, its files uploaded first; refused if it is stale */
export async function push(context: Context, options: { message?: string; dir?: string }) {
  const dir = resolve(context.cwd, options.dir ?? '.')
  const state = await readState(dir)
  if (!state) throw new BlupintaError(400, 'invalid_input', { problems: [`${dir} isn't a pulled project`] })
  if (!options.message?.trim())
    throw new BlupintaError(400, 'invalid_input', { problems: ['say what changed: -m "…"'] })
  const client = await clientOf(context)
  const path = { projectId: state.projectId }
  for (const file of await readFolderFiles(dir))
    await client.call('uploadFile', {
      path,
      query: { name: file.name },
      file: { bytes: file.bytes, contentType: file.contentType },
    })
  try {
    const saved = await client.call('saveRevision', {
      path,
      body: { home: await readHome(dir), message: options.message.trim(), baseRevision: state.revision },
    })
    await writeState(dir, { ...state, revision: saved.number })
    context.out.line(`Saved as version ${saved.number}`)
    context.out.result(saved)
  } catch (e) {
    if (!isBlupintaError(e, 'conflict')) throw e
    // someone saved in between: say who, and how to go on
    const last = await client.call('getHome', { path })
    throw new BlupintaError(409, 'conflict', {
      problems: [
        `${last.authorName ?? 'Someone'} saved version ${last.number} after the one you pulled (${state.revision ?? 'none'}): ` +
          'pull it again, make your change there, and push',
      ],
    })
  }
}

/** Every saved version of a project, and the files they name, as a zip */
export async function exportProject(context: Context, named: string | undefined, options: { out?: string }) {
  const client = await clientOf(context)
  const project = await projectNamed(client, named)
  const { bytes } = await client.call('exportProject', { path: { projectId: project.id } })
  const file = resolve(context.cwd, options.out ?? `${project.name}.zip`)
  await writeFile(file, bytes)
  context.out.line(`The versions of “${project.name}” in ${file}`)
  context.out.result({ projectId: project.id, file, size: bytes.length })
}
