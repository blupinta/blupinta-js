// A project's home in a folder, as `pull` writes it and `push` reads it: `home.json`, the files it names in `files/` by
// their sha256, and `.blupinta.json` saying which project and which version the folder holds, so a push names the
// version it starts from.

import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export const HOME_FILE = 'home.json'
export const FILES_DIR = 'files'
export const STATE_FILE = '.blupinta.json'

/** What the folder holds: the project, and the version its home was pulled at (or last pushed as) */
export type FolderState = { projectId: string; revision: number | null }

const EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
}

/** The content types of the files a folder may hold, by their extension */
export const CONTENT_TYPES = Object.fromEntries(Object.entries(EXTENSIONS).map(([type, ext]) => [ext, type]))

export const fileNameOf = (sha256: string, contentType: string) =>
  `${sha256}.${EXTENSIONS[contentType] ?? 'bin'}`

export async function writeHome(dir: string, home: unknown) {
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, HOME_FILE), `${JSON.stringify(home, null, 2)}\n`)
}

export async function writeFolderFile(dir: string, name: string, bytes: Uint8Array) {
  await mkdir(join(dir, FILES_DIR), { recursive: true })
  await writeFile(join(dir, FILES_DIR, name), bytes)
}

export async function writeState(dir: string, state: FolderState) {
  await writeFile(join(dir, STATE_FILE), `${JSON.stringify(state, null, 2)}\n`)
}

export async function readState(dir: string): Promise<FolderState | null> {
  try {
    return JSON.parse(await readFile(join(dir, STATE_FILE), 'utf8')) as FolderState
  } catch {
    return null
  }
}

export async function readHome(dir: string): Promise<unknown> {
  return JSON.parse(await readFile(join(dir, HOME_FILE), 'utf8'))
}

/** The files in the folder's `files/`, each with its bytes and type */
export async function readFolderFiles(dir: string) {
  const names = await readdir(join(dir, FILES_DIR)).catch(() => [] as string[])
  const found: { name: string; bytes: Uint8Array; contentType: string }[] = []
  for (const name of names) {
    const contentType = CONTENT_TYPES[name.split('.').pop() ?? '']
    if (!contentType) continue
    found.push({ name, contentType, bytes: new Uint8Array(await readFile(join(dir, FILES_DIR, name))) })
  }
  return found
}
