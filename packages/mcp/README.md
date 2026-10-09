# @blupinta/mcp

An [MCP](https://modelcontextprotocol.io) server for [Blupinta](https://blupinta.app)'s public API: an AI agent lists
the projects the person gave it, reads a home and its versions, checks a home with Blupinta's own checks and saves a
new version. Node 22 or later.

Sign in once with the CLI, which keeps the tokens in your system's keychain:

```sh
npx @blupinta/cli login
```

Then give the server to your agent, for example in its MCP configuration:

```json
{ "mcpServers": { "blupinta": { "command": "npx", "args": ["-y", "@blupinta/mcp"] } } }
```

| Tool | What |
|---|---|
| `list_projects` | the projects the person gave it |
| `get_home` | a project's home (the last version, or one asked), in Blupinta's home format, with the files it names |
| `list_versions` | its saved versions |
| `check_home` | what keeps a home from being saved, each problem with where it is |
| `save_version` | a home saved as a new version; refused when another was saved after the one it starts from |

A project is named by its id or its name. Without a keychain, `BLUPINTA_TOKEN` gives an access token instead.

The guide: <https://docs.blupinta.app/reference/public-api/>. Apache License 2.0.
