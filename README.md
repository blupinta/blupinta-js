# Blupinta for JavaScript and TypeScript

The JavaScript and TypeScript libraries of [Blupinta](https://blupinta.app)'s public API,
`https://api.blupinta.app/v1`. Each package is in `packages/`, released on its own.

| Package | For |
|---|---|
| [`@blupinta/sdk`](packages/sdk) | the browser and Node: every operation typed, sign-in (device flow, PKCE), a home followed as it is saved, webhooks checked |
| [`@blupinta/react`](packages/react) | React hooks: a home followed, a project, its versions, signing in |
| [`@blupinta/home`](packages/home) | the home format: its TypeScript types and its JSON Schema |
| [`@blupinta/cli`](packages/cli) | `blupinta`, the command line: pull, push, check, watch |
| [`@blupinta/mcp`](packages/mcp) | an MCP server for AI agents: read a home and its versions, check one, save one |

**Status: nothing is released yet.** The first releases are coming.

The guide, with each package's first lines: <https://docs.blupinta.app/reference/libraries/>. Other languages:
[github.com/blupinta/blupinta](https://github.com/blupinta/blupinta).

Issues and pull requests are welcome here (see [CONTRIBUTING.md](CONTRIBUTING.md)); security problems go to
[SECURITY.md](SECURITY.md). Apache License 2.0.
