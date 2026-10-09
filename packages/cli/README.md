# @blupinta/cli

`blupinta`, [Blupinta](https://blupinta.app)'s public API from the command line: pull a home and its files into a
folder, push it back as a new version, check a home file with Blupinta's own checks, follow a project as its versions
are saved. Node 22 or later.

```sh
npx @blupinta/cli login        # or: npm install --global @blupinta/cli
```

| Command | What |
|---|---|
| `blupinta login` / `logout` / `whoami` | connect the CLI with a code typed in your browser, choosing the projects it may use; the tokens go in your system's keychain |
| `blupinta projects` | the projects you gave it |
| `blupinta pull <project> [--revision n] [--dir folder]` | the home (`home.json`) and the files it names (`files/`) into a folder |
| `blupinta push [--dir folder] -m "what changed"` | the folder's home saved as a new version; refused, saying who, when someone saved in between |
| `blupinta check [home.json]` | Blupinta's checks on a home file: exit 1 when something keeps it from being saved |
| `blupinta watch <project> [--dir folder] [--exec command]` | each new version said, written into the folder, the command run (`BLUPINTA_REVISION` set) |
| `blupinta export <project> [--out file.zip]` | every version and its files as a zip |

A project is named by its id or its name. `--json` makes every command speak JSON, for scripts and agents. On a
machine without a keychain (a CI runner), `BLUPINTA_TOKEN` gives an access token to use instead.

The guide: <https://docs.blupinta.app/reference/public-api/>. Apache License 2.0.
