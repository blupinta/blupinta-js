# @blupinta/home

The [Blupinta](https://blupinta.app) home format: the TypeScript types of a home, and its JSON Schema. Nothing else:
no parser, no geometry, no checks. A home read from Blupinta's API is already valid and in the current version; to
check a home of your own, send it to `POST https://api.blupinta.app/v1/homes/check`.

```sh
npm install @blupinta/home
```

```ts
import { HOME_SCHEMA_VERSION, type HomeModel } from '@blupinta/home'
import schema from '@blupinta/home/schema.json' with { type: 'json' }
```

`HomeModel` is a home at version `HOME_SCHEMA_VERSION` (its `schema` field). The schema is also published at
`https://blupinta.app/schema/home-<version>.json`.

The types are generated from the schema, which is generated from Blupinta's own: don't edit them by hand. The guide:
<https://docs.blupinta.app/reference/public-api/>.

Apache License 2.0.
