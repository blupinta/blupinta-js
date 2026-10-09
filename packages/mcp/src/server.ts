// Blupinta's public API as tools for an AI agent (the Model Context Protocol): the projects the person gave it, a
// project's home and its versions, a home checked by Blupinta's own checks, a new version saved. Each tool one call of
// the API through `@blupinta/sdk`; a refusal is the tool's error, with the API's reason.

import { projectNamed } from '@blupinta/cli/commands/projects'
import type { Client } from '@blupinta/sdk'
import { isBlupintaError } from '@blupinta/sdk/errors'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

const PROJECT = z.string().describe('The project: its id, or its name')

/** A tool's answer: the API's JSON as text, or the refusal as the tool's error */
async function answer(call: () => Promise<unknown>) {
  try {
    return { content: [{ type: 'text' as const, text: JSON.stringify(await call(), null, 2) }] }
  } catch (e) {
    const reason = isBlupintaError(e) ? `${e.code}: ${e.problems.join('; ') || e.message}` : String(e)
    return { content: [{ type: 'text' as const, text: reason }], isError: true }
  }
}

export function createBlupintaMcp(client: Client, version: string) {
  const server = new McpServer({ name: 'blupinta', version })
  const projectId = async (named: string) => (await projectNamed(client, named)).id

  server.registerTool(
    'list_projects',
    {
      title: 'List projects',
      description: 'The Blupinta projects the person gave this app: id, name, address, last saved version',
      inputSchema: {},
    },
    () => answer(async () => (await client.call('listProjects')).rows),
  )

  server.registerTool(
    'get_home',
    {
      title: 'Read a home',
      description:
        "A project's home in Blupinta's home format (https://blupinta.app/schema/home-<version>.json): the last " +
        'saved version, or the one asked, with the files it names',
      inputSchema: {
        project: PROJECT,
        revision: z.number().int().min(1).optional().describe('A saved version'),
      },
    },
    ({ project, revision }) =>
      answer(async () => {
        const path = { projectId: await projectId(project) }
        return revision
          ? client.call('getRevision', { path: { ...path, number: revision } })
          : client.call('getHome', { path })
      }),
  )

  server.registerTool(
    'list_versions',
    {
      title: 'List versions',
      description: "A project's saved versions, newest first: number, message, author, when",
      inputSchema: { project: PROJECT },
    },
    ({ project }) =>
      answer(
        async () =>
          (await client.call('listRevisions', { path: { projectId: await projectId(project) } })).rows,
      ),
  )

  server.registerTool(
    'check_home',
    {
      title: 'Check a home',
      description:
        "Blupinta's own checks on a home file: whether it can be saved as a version, and each problem that keeps it " +
        'from it, with where it is. Check a home before saving it',
      inputSchema: {
        home: z.record(z.string(), z.unknown()).describe('The home, as JSON in the home format'),
      },
    },
    ({ home }) => answer(() => client.call('checkHome', { body: { home } })),
  )

  server.registerTool(
    'save_version',
    {
      title: 'Save a version',
      description:
        'Saves a home as a new version of a project, as its person would: refused (conflict) when another version ' +
        'was saved after `base_revision`, so read the home again first; refused with its problems when it is invalid',
      inputSchema: {
        project: PROJECT,
        home: z.record(z.string(), z.unknown()).describe('The whole home, as JSON in the home format'),
        message: z.string().min(1).describe('What changed, as people read it in the history'),
        base_revision: z
          .number()
          .int()
          .min(1)
          .nullable()
          .describe('The number of the version the change starts from; null when the project has none yet'),
      },
    },
    ({ project, home, message, base_revision }) =>
      answer(async () =>
        client.call('saveRevision', {
          path: { projectId: await projectId(project) },
          body: { home, message, baseRevision: base_revision },
        }),
      ),
  )

  return server
}
