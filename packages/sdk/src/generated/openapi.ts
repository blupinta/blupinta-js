// Blupinta's public API, `/v1`: the types of its OpenAPI document (https://api.blupinta.app/v1/openapi.json).
// Generated: don't edit it by hand.

import type { HomeModel } from '@blupinta/home'

export interface paths {
    "/v1": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * What the API is
         * @description Where tokens come from, the resource they must be for, the scopes, every operation and where they are explained.
         */
        get: operations["getApiIndex"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/openapi.json": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * This OpenAPI document
         * @description Every operation of the API, its parameters, answers and refusals, generated from the server.
         */
        get: operations["getOpenApiDocument"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/homes/check": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Check a home file
         * @description What Blupinta’s own checks say of a home file, of any version of the format: brought to the current one as an import would, read, and checked as saving a version is. Nothing is kept. A file that isn’t a home answers `format` problems, each with its path.
         */
        post: operations["checkHome"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * The projects it may read
         * @description The projects the person chose when connecting the app, by name, each with its last saved version.
         */
        get: operations["listProjects"];
        put?: never;
        /**
         * Create a project
         * @description A new project in the person’s account, its home empty and in their language; the app may then read and write it as one of its own projects.
         */
        post: operations["createProject"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * One project
         * @description One of the projects it may read: its name, its address and its last saved version.
         */
        get: operations["getProject"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Rename a project
         * @description Its name and address, as its people read them.
         */
        patch: operations["renameProject"];
        trace?: never;
    };
    "/v1/projects/{projectId}/home": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * The last version saved
         * @description The last saved version of the project with its home. It carries an ETag: send it back in `If-None-Match` and an unchanged home answers 304 with no body. A project with no version saved yet answers `not_found`.
         */
        get: operations["getHome"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/revisions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Every version saved
         * @description The saved versions of the project, newest first, without their homes.
         */
        get: operations["listRevisions"];
        put?: never;
        /**
         * Save a version
         * @description Saves a home as the project’s next version, held to everything Save version is held to in the editor (the format, the checks, the files it names, what connected apps need). It starts from `baseRevision`: another version saved since is a `conflict`, nothing overwritten. The draft the editor works on is left as it is; the editors open on the project learn of the new version, which says the app saved it.
         */
        post: operations["saveRevision"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/revisions/{number}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * One version saved
         * @description One saved version of the project, with its home.
         */
        get: operations["getRevision"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * What happens to the project, as it happens
         * @description A stream of server-sent events (`text/event-stream`) that stays open. `revision.saved` (data: `V1RevisionSaved`) when a version is saved: read it then. `access.revoked` when the app is disconnected or loses the project, `token.expired` when the access token runs out: the stream ends after either, and the app reconnects with a fresh token (or not at all, once revoked). A comment line every 25 seconds keeps it open through proxies.
         */
        get: operations["projectEvents"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/thumbnail": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * The last version’s thumbnail
         * @description The plan seen from above, as the editor drew it when the last version was saved (WebP). A redirect to the CDN, as for files; `not_found` when that version has none (saved before thumbnails, or by another client).
         */
        get: operations["getThumbnail"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/files/{sha256}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * A file a version names
         * @description A file of the project that one of its saved versions names by its sha256 (a drawing, a floor’s image). The answer is a redirect to the file on Blupinta’s CDN, signed for a few minutes: follow it. Files never change, so keep them as long as you like.
         */
        get: operations["getFile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/files": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Upload a file
         * @description A drawing or an image for the project’s home: the body is the file’s bytes, `content-type` says what they are (PNG, JPEG, WebP or PDF, checked against the bytes) and `?name=` its name. Its `sha256` is how a home names it. The same bytes again are the same file (200, not 201).
         */
        post: operations["uploadFile"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/catalog/models/{sha256}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * A product’s 3D model
         * @description The 3D model (glTF binary) of a catalog product one of the project’s saved versions furnishes it with, by the sha256 its product names. A redirect to the CDN, as for files.
         */
        get: operations["getCatalogModel"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/catalog/thumbnails/{sha256}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * A product’s thumbnail
         * @description The thumbnail (WebP) of a catalog product one of the project’s saved versions names. A redirect to the CDN, as for files.
         */
        get: operations["getCatalogThumbnail"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/export": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Every version, as a zip
         * @description A zip of the project’s saved versions and the files they name: `project.json`, `versions.json` (the list), `versions/<number>.home.json` (each home) and `files/<sha256>.<extension>`.
         */
        get: operations["exportProject"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/host-references": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * The elements it declared it needs
         * @description What the app declared, for this project, of the elements of the home its code names.
         */
        get: operations["getHostReferences"];
        /**
         * Declare the elements it needs
         * @description Replaces what the app declared it needs of the home: elements by kind and id (a wall the app hangs a picture on, the room a switch belongs to). Every one must be in the last saved version (`invalid_input` names those that aren’t). From then on, saving a version that drops one is refused, naming the app, and the editor shows them as errors. An empty list declares nothing.
         */
        put: operations["putHostReferences"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/devices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * The devices it declared
         * @description The devices the app declared for this project.
         */
        get: operations["getDevices"];
        /**
         * Declare its devices
         * @description Replaces the devices the app knows for this project (its lights, covers, switches, sensors, climate and media, by its own ids), offered in the editor when binding a light or a shutter of the home.
         */
        put: operations["putDevices"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/catalog/products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Search the catalog
         * @description Blupinta’s catalog of products searched as the editor searches it: words, narrowed by category, brand, mount and colour family, in pages.
         */
        get: operations["searchProducts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/catalog/products/{namespace}/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * One product, whole
         * @description A product of the catalog as a home holds it among its `products`: its options, sizes as expressions of them, geometry, clearances, what a house entity may drive in it, its thumbnails.
         */
        get: operations["getProduct"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/catalog/models/{sha256}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * A product’s 3D model
         * @description Any 3D model (glTF binary) of the catalog, by the sha256 a product names; a redirect to the CDN.
         */
        get: operations["catalogModel"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/catalog/thumbnails/{sha256}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * A product’s thumbnail
         * @description Any thumbnail (WebP) of the catalog, by the sha256 a product names; a redirect to the CDN.
         */
        get: operations["catalogThumbnail"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/threads": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * The project’s threads
         * @description Every thread pinned on the project’s plans, with its messages, oldest first.
         */
        get: operations["listThreads"];
        put?: never;
        /**
         * Open a thread
         * @description A thread pinned on a plan, on one of its elements or at a point, with its first message, written as the person (anyone who can look at the project may comment); it says the app wrote it.
         */
        post: operations["openThread"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/threads/{threadId}/comments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Answer a thread
         * @description A message added to the thread; whoever opened it is told.
         */
        post: operations["answerThread"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/projects/{projectId}/threads/{threadId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Resolve a thread, or open it again
         * @description Whoever wrote in it is told.
         */
        patch: operations["resolveThread"];
        trace?: never;
    };
    "/v1/webhooks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * The app’s webhooks
         * @description Every webhook the app made, without their secrets; one turned off says when and why.
         */
        get: operations["listWebhooks"];
        put?: never;
        /**
         * Make a webhook
         * @description An HTTPS address of the app’s, on the public internet, that Blupinta posts each event of the projects the app reaches to (`V1WebhookBody`), signed: `Blupinta-Signature: t=<seconds>,v1=<hex>` is the HMAC-SHA256 of `<t>.<body>` with the webhook’s `secret`, given only now. Answer 2xx within 10 seconds; anything else is tried again after 1 min, 5 min, 30 min, 2 h and 12 h. Three days of nothing but failures turn it off.
         */
        post: operations["createWebhook"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/webhooks/{webhookId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete a webhook
         * @description Nothing more is posted to it, deliveries on their way included.
         */
        delete: operations["deleteWebhook"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/webhooks/{webhookId}/deliveries": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * A webhook’s deliveries
         * @description Its latest 50 deliveries, newest first: what was posted, how many tries, what the app answered.
         */
        get: operations["listDeliveries"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @description `GET /v1`: what the public API is, for whoever builds an app on it */
        ApiIndex: {
            name: string;
            /** @constant */
            version: "v1";
            /** @description the resource an app's token must be for (`resource` when asking it) */
            resource: string;
            /** @description where tokens come from: the OpenID provider */
            issuer: string;
            /** @description the provider's discovery document */
            discovery: string;
            /** @description the scopes `/v1` understands, each with what it gives */
            scopes: {
                [key: string]: string;
            };
            /** @description every operation, as `METHOD /path` */
            endpoints: string[];
            /** @description the OpenAPI document describing every operation */
            openapi: string;
            /** @description the guide's page for developers */
            docs: string;
        };
        /** @description A message in a thread */
        V1Comment: {
            id: string;
            /** @description who wrote it: their name, or their address when they gave none; null once their account is gone */
            authorName: string | null;
            body: string;
            /** @description the app that wrote it through `/v1`, as people read its name; null when written in the editor */
            appName: string | null;
            /** @description when it was last changed, ISO 8601; null when never */
            editedAt: string | null;
            createdAt: string;
        };
        /** @description Where a thread is pinned: on an element of a plan (by its kind and id), at a point of the plan's sheet */
        V1CommentAnchor: {
            /** @description the element, when it is on one: `{ kind: 'wall', id: 'north' }` */
            ref?: {
                kind: string;
                id: string;
            };
            /** @description the point, in the plan's sheet units */
            at: [
                number,
                number
            ];
        };
        /** @description A message to add */
        V1CommentInput: {
            body: string;
        };
        /** @description One event posted, or on its way, to a webhook */
        V1Delivery: {
            id: string;
            event: components["schemas"]["V1WebhookEvent"];
            createdAt: string;
            attempts: number;
            /** @description when the app answered 2xx; null until then */
            deliveredAt: string | null;
            /** @description the last try's HTTP status; null when no answer came */
            lastStatus: number | null;
            lastError: string | null;
            /** @description when it is tried again; null once delivered or given up */
            nextAttemptAt: string | null;
        };
        /**
         * @description What a webhook may be told
         * @enum {string}
         */
        V1WebhookEvent: "revision.saved" | "access.revoked";
        /** @description A webhook's latest deliveries, newest first */
        V1DeliveryPage: {
            rows: components["schemas"]["V1Delivery"][];
            next: string | null;
        };
        /** @description The devices an app declares for a project, replaced whole each time */
        V1Devices: {
            devices: components["schemas"]["V1Device"][];
        };
        /** @description A device an app knows, for the editor's binding pickers */
        V1Device: {
            /** @description the app's own name for it: a Home Assistant entity_id (`light.soggiorno`) */
            id: string;
            /** @description as people read it */
            name: string;
            /**
             * @description `cover`: shutters, curtains, awnings
             * @enum {string}
             */
            kind: "light" | "cover" | "switch" | "sensor" | "climate" | "media";
            /** @description the room it is in, as the app calls it; null when it doesn't say */
            room: string | null;
        };
        /** @description A file of a project, as uploaded */
        V1File: {
            /** @description its content's hash: how a home names it (a drawing's `src`, a floor's image) */
            sha256: string;
            /** @enum {string} */
            contentType: "image/png" | "image/jpeg" | "image/webp" | "application/pdf";
            /** @description in bytes */
            size: number;
            /** @description its name, as uploaded */
            name: string;
            /** @description when it was first uploaded, ISO 8601 */
            createdAt: string;
        };
        /** @description A project's name and where it is */
        V1ProjectInput: {
            name: string;
            /** @description where the home is; null or absent for none */
            address?: string | null;
        };
        /** @description A version to save: a home, a line saying what changed, and the version it starts from */
        V1SaveRevisionRequest: {
            /** @description the home, in any version of the format: brought to the current one as an import is */
            home: unknown;
            /** @description what changed, as people read it in the project's history */
            message: string;
            /** @description the last version the app had when it made this home; null when the project had none. Another one saved since: a `conflict`, so nobody's work is overwritten unseen */
            baseRevision: number | null;
            /** @description a picture of the home, WebP as base64, at most 256 kB; the version keeps none without it */
            thumbnail?: string;
        };
        /** @description What the server says of a home file */
        V1HomeCheck: {
            /** @description the format's version the file says it is; null when it says none */
            readAs: number | null;
            /** @description the version it was checked at: the current one, the file brought to it first as an import would */
            checkedAt: number;
            /** @description nothing in it keeps it from being saved as a version */
            isValid: boolean;
            problems: components["schemas"]["V1HomeProblem"][];
        };
        /** @description One problem the server finds in a home */
        V1HomeProblem: {
            /** @description `format`: the file isn't a home of the format (`message` says what, with its path); otherwise a check that blocks saving it as a version: `area-without-rooms`, `open-room`, `crossing`, `overlap`, `degenerate`, `shared-region`… */
            kind: string;
            /** @description for `format`: what is wrong, with its path in the file */
            message?: string;
            /** @description the plan it concerns, by id, when it concerns one */
            plan?: string;
            /** @description the problem as the checks found it: its walls, rooms, points, by the home's ids */
            detail?: {
                [key: string]: unknown;
            };
        };
        /** @description A home file to check: any version of the format */
        V1HomeCheckRequest: {
            /** @description the file's content, as JSON */
            home: unknown;
        };
        /** @description The elements an app declares it needs: saving a version that drops one is refused, naming the app */
        V1HostReferences: {
            refs: components["schemas"]["V1HostReference"][];
        };
        /** @description An element of the home an app's code names, by kind and id (the home format's own ids) */
        V1HostReference: {
            kind: components["schemas"]["HostReferenceKind"];
            id: string;
        };
        /** @enum {string} */
        HostReferenceKind: "plan" | "level" | "area" | "presentation" | "room" | "wall" | "opening" | "item" | "light" | "awning" | "plate" | "stair";
        /** @description A product of the catalog whole: its options, sizes, geometry, as a home holds it among its `products` */
        V1Product: components["schemas"]["ProductManifest"];
        ProductManifest: {
            /** @description namespace/name, stable forever ("ikea/kallax", "jal/handmade-drawers") */
            id: string;
            /** @description bumped on any change that can move or reshape an item */
            version: number;
            brand?: string;
            name: components["schemas"]["Translated"];
            description?: components["schemas"]["Translated"];
            /** @description a path in the shared taxonomy: "storage/shelving", "lighting/pendant", "decor/wall-art" */
            category: string;
            tags: string[];
            mount: components["schemas"]["Mount"];
            options: components["schemas"]["OptionSpec"][];
            /** @description option combinations the maker sells under its own article number */
            variants?: {
                options: {
                    [key: string]: string | number | boolean;
                };
                article: string;
            }[];
            geometry: components["schemas"]["GeometrySource"];
            /** @description width (x), height (y), depth (z) as expressions of the options, m */
            size: {
                w: string;
                h: string;
                d: string;
            };
            /** @description the space it needs in use, beside its sides (furnishing.md §8): drawers pulled out, a door's swing, a chair */
            clearances?: components["schemas"]["Clearance"][];
            /** @description what in it a house entity can drive */
            bindings?: {
                slot: string;
                /** @enum {string} */
                kind: "light" | "media" | "cover" | "appliance" | "sensor";
            }[];
            media?: {
                thumbnails: string[];
            };
            /** @description the product sheet or the measurement it comes from */
            source: string;
            links?: {
                url: string;
                /** @enum {string} */
                kind: "product" | "manual" | "shop";
            }[];
        };
        /** @description App content, shared by every user: in each of the app's languages (furnishing.md F5) */
        Translated: {
            it: string;
            en: string;
        };
        /** @enum {string} */
        Mount: "floor" | "wall" | "ceiling" | "surface" | "built-in";
        OptionSpec: components["schemas"]["ChoiceOption"] | components["schemas"]["MaterialOption"] | components["schemas"]["NumberOption"] | components["schemas"]["ToggleOption"] | components["schemas"]["ImageOption"] | components["schemas"]["SlotsOption"] | components["schemas"]["TextOption"];
        ChoiceOption: {
            /** @constant */
            kind: "choice";
            /** @description each with numbers the expressions read as `<option>.<name>` (KALLAX's `size.cols`) */
            choices: {
                id: string;
                name: components["schemas"]["Translated"];
                params?: {
                    [key: string]: number;
                };
            }[];
            default: string;
            id: string;
            name: components["schemas"]["Translated"];
            visibleIf?: components["schemas"]["Condition"];
        };
        /** @description Shows (or allows) an option only when another holds one of some values */
        Condition: {
            option: string;
            in: (string | number | boolean)[];
        };
        MaterialOption: {
            /** @constant */
            kind: "material";
            /** @description the library's materials it is sold in */
            materials: string[];
            default: string;
            id: string;
            name: components["schemas"]["Translated"];
            visibleIf?: components["schemas"]["Condition"];
        };
        NumberOption: {
            /** @constant */
            kind: "number";
            min: number;
            max: number;
            step: number;
            /** @enum {string} */
            unit: "m" | "count" | "degrees";
            default: number;
            id: string;
            name: components["schemas"]["Translated"];
            visibleIf?: components["schemas"]["Condition"];
        };
        ToggleOption: {
            /** @constant */
            kind: "toggle";
            default: boolean;
            id: string;
            name: components["schemas"]["Translated"];
            visibleIf?: components["schemas"]["Condition"];
        };
        ImageOption: {
            /** @constant */
            kind: "image";
            /** @description width over height of the picture's place */
            aspect: number;
            /** @description a picture cut across panels (a multi-panel canvas), with the gap between them, m */
            panels?: number;
            gap?: number;
            id: string;
            name: components["schemas"]["Translated"];
            visibleIf?: components["schemas"]["Condition"];
        };
        SlotsOption: {
            /** @constant */
            kind: "slots";
            /** @description how many slots, as an expression of the other options (KALLAX's cells) */
            count: string;
            choices: {
                id: string;
                name: components["schemas"]["Translated"];
            }[];
            id: string;
            name: components["schemas"]["Translated"];
            visibleIf?: components["schemas"]["Condition"];
        };
        TextOption: {
            /** @constant */
            kind: "text";
            maxLength: number;
            default: string;
            id: string;
            name: components["schemas"]["Translated"];
            visibleIf?: components["schemas"]["Condition"];
        };
        GeometrySource: {
            /** @constant */
            kind: "builtin";
            generator: string;
        } | {
            /** @constant */
            kind: "envelope";
            material?: string;
        } | {
            /** @constant */
            kind: "gltf";
            models: components["schemas"]["ModelChoice"][];
            materialVariant?: string;
        } | {
            /** @constant */
            kind: "recipe";
            parts: components["schemas"]["RecipePart"][];
        };
        /** @description A model and the options that choose it; one without `when` is the fallback */
        ModelChoice: {
            when?: components["schemas"]["When"];
            model: components["schemas"]["ModelRef"];
            lod?: components["schemas"]["ModelRef"];
        };
        /** @description Option values that must all hold: a choice's or a material's id, a number, yes or no */
        When: {
            [key: string]: string | number | boolean;
        };
        /** @description A model of the catalog: its bytes' sha256, and the file it is published from (`pnpm catalog:assets`) */
        ModelRef: {
            sha256: string;
            file: string;
        };
        RecipePart: {
            /** @enum {string} */
            shape: "box" | "cylinder";
            size: components["schemas"]["Triple"];
            material: components["schemas"]["MaterialRef"];
            /** @description where the part's box starts: its left, bottom, back corner, from the product's origin (floor, middle, back) */
            at: components["schemas"]["Triple"];
            /** @description how many, an expression; 0 leaves it out (an option switching a part off) */
            count?: string;
            /** @description the name each copy's number (0, 1, …) goes by in the part's expressions */
            index?: string;
            /** @description what the part is ("drawer 1"), for clearances and, later, animation */
            name?: string;
        } | {
            /** @constant */
            shape: "model";
            models: components["schemas"]["ModelChoice"][];
            /** @description where the part's box starts: its left, bottom, back corner, from the product's origin (floor, middle, back) */
            at: components["schemas"]["Triple"];
            /** @description how many, an expression; 0 leaves it out (an option switching a part off) */
            count?: string;
            /** @description the name each copy's number (0, 1, …) goes by in the part's expressions */
            index?: string;
            /** @description what the part is ("drawer 1"), for clearances and, later, animation */
            name?: string;
        };
        /** @description Three expressions of the options, m: x, y, z or w, h, d */
        Triple: string[];
        /** @description A part's finish: what a material option holds, or a material of the library */
        MaterialRef: {
            option: string;
        } | {
            material: string;
        };
        Clearance: {
            use: components["schemas"]["ClearanceUse"];
            /**
             * @description the side it opens out of, as the product faces: across its whole width on the front or back, its depth on a side
             * @enum {string}
             */
            side: "front" | "back" | "left" | "right";
            /** @description how far out, m, as an expression of the options */
            depth: string;
            /** @description where the measure comes from: the product sheet, a measurement, a usual allowance */
            source: string;
        };
        /**
         * @description What a clearance is kept free for, named in the editor's warnings
         * @enum {string}
         */
        ClearanceUse: "drawers" | "doors" | "seat" | "access" | "appliance";
        /** @description A page of a catalog search */
        V1ProductPage: {
            rows: components["schemas"]["V1ProductSummary"][];
            /** @description how many products the search found in all */
            total: number;
            /** @description where the next page starts, to send back as `after`; null on the last page */
            next: string | null;
        };
        /** @description A product of the catalog as a search lists it */
        V1ProductSummary: {
            /** @description `namespace/name`, stable forever ("ikea/kallax"): read it whole at `/v1/catalog/products/{namespace}/{name}` */
            id: string;
            /** @description bumped on any change that can move or reshape an item made of it */
            version: number;
            brand: string | null;
            name: {
                it: string;
                en: string;
            };
            /** @description a path in the catalog's taxonomy ("storage/shelving") */
            category: string;
            /** @enum {string} */
            mount: "floor" | "wall" | "ceiling" | "surface" | "built-in";
            /** @description its thumbnails, by sha256: `/v1/catalog/thumbnails/{sha256}` */
            thumbnails: string[];
        };
        /** @description A project an app may read */
        V1Project: {
            id: string;
            /** @description its name, as its people wrote it */
            name: string;
            /** @description where the home is, when they wrote it; null otherwise */
            address: string | null;
            /** @description the last version saved; null before the first */
            lastRevision: {
                number: number;
                /** @description when it was saved, ISO 8601 */
                createdAt: string;
            } | null;
        };
        /** @description The projects an app may read, by name: one page of them */
        V1ProjectPage: {
            rows: components["schemas"]["V1Project"][];
            /** @description where the next page starts; null on the last page (today every project fits on one) */
            next: string | null;
        };
        /** @description A saved version with its home */
        V1Revision: {
            /** @description the home, in Blupinta's home format at the version its `schema` field names */
            home: HomeModel;
            /** @description the files of the project the home names (its drawings' images, a floor's photo), each read by its sha256 */
            files: components["schemas"]["V1File"][];
            /** @description the version's number, from 1, never reused */
            number: number;
            /** @description what its author wrote when saving it */
            message: string;
            /** @description who saved it: their name, or their address when they gave none; null once their account is gone */
            authorName: string | null;
            /** @description the version it brought back, when it was a restore; null otherwise */
            restoredFrom: number | null;
            /** @description when it was saved, ISO 8601 */
            createdAt: string;
        };
        /** @description A saved version of a project's home, without the home itself */
        V1RevisionRow: {
            /** @description the version's number, from 1, never reused */
            number: number;
            /** @description what its author wrote when saving it */
            message: string;
            /** @description who saved it: their name, or their address when they gave none; null once their account is gone */
            authorName: string | null;
            /** @description the version it brought back, when it was a restore; null otherwise */
            restoredFrom: number | null;
            /** @description when it was saved, ISO 8601 */
            createdAt: string;
        };
        /** @description The saved versions of a project, newest first: one page of them */
        V1RevisionPage: {
            rows: components["schemas"]["V1RevisionRow"][];
            /** @description where the next page starts; null on the last page (today every version fits on one) */
            next: string | null;
        };
        /** @description The data of a `revision.saved` event: a version of the project was saved */
        V1RevisionSaved: {
            /** @description the new version's number: read it with `GET /v1/projects/{projectId}/home` */
            number: number;
        };
        /** @description A conversation pinned on a plan */
        V1Thread: {
            id: string;
            /** @description the plan it is on, by the home's id */
            planId: string;
            anchor: components["schemas"]["V1CommentAnchor"];
            /** @description when it was marked resolved; null while open */
            resolvedAt: string | null;
            createdAt: string;
            /** @description its messages, oldest first */
            comments: components["schemas"]["V1Comment"][];
        };
        /** @description A thread marked resolved, or open again */
        V1ThreadChange: {
            isResolved: boolean;
        };
        /** @description A thread to open: where, and its first message */
        V1ThreadInput: {
            planId: string;
            anchor: components["schemas"]["V1CommentAnchor"];
            body: string;
        };
        V1ThreadPage: {
            rows: components["schemas"]["V1Thread"][];
            /** @description where the next page starts; null on the last page */
            next: string | null;
        };
        /** @description Where an app is told what happens to the projects it reaches */
        V1Webhook: {
            id: string;
            url: string;
            events: components["schemas"]["V1WebhookEvent"][];
            createdAt: string;
            /** @description when it was turned off after three days of failing deliveries; null while on */
            disabledAt: string | null;
            disabledReason: string | null;
        };
        /** @description The body posted to a webhook. Its headers: `Blupinta-Event`, `Blupinta-Delivery` (the same id on every retry) and `Blupinta-Signature: t=<seconds>,v1=<hex>`, the HMAC-SHA256 of `<t>.<body>` with the webhook's secret */
        V1WebhookBody: {
            /** @description the delivery's id */
            id: string;
            type: components["schemas"]["V1WebhookEvent"];
            /** @description when it happened, ISO 8601 */
            createdAt: string;
            data: {
                projectId: string;
                /** @description for `revision.saved`: the new version's number */
                number?: number;
            };
        };
        /** @description A webhook just made, with its secret: shown this once, to check each delivery's `Blupinta-Signature` */
        V1WebhookCreated: {
            secret: string;
            id: string;
            url: string;
            events: components["schemas"]["V1WebhookEvent"][];
            createdAt: string;
            /** @description when it was turned off after three days of failing deliveries; null while on */
            disabledAt: string | null;
            disabledReason: string | null;
        };
        /** @description A webhook to make: where to post, and which events (all of them when none is said) */
        V1WebhookInput: {
            /** @description an HTTPS address on the public internet */
            url: string;
            events?: components["schemas"]["V1WebhookEvent"][];
        };
        V1WebhookPage: {
            rows: components["schemas"]["V1Webhook"][];
            /** @description where the next page starts; null on the last page */
            next: string | null;
        };
        /** @description The body of a refusal */
        V1Error: {
            error: components["schemas"]["V1ErrorCode"];
            /** @description the server's id for a `server_error`, to quote when asking for help */
            errorId?: string;
            /** @description what is wrong, for `invalid_input`, `conflict`, `invalid_home`, `blocking_problems` */
            problems?: string[];
        };
        /**
         * @description What `/v1` answers when it refuses
         * @enum {string}
         */
        V1ErrorCode: "unauthenticated" | "forbidden" | "not_found" | "rate_limited" | "server_error" | "invalid_input" | "conflict" | "invalid_home" | "blocking_problems" | "unsupported_file";
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: {
        /** @description The requests the caller may make in the window: an app counts per connection, every token together */
        "RateLimit-Limit": number;
        /** @description The requests left in the window */
        "RateLimit-Remaining": number;
        /** @description Seconds until the window starts again */
        "RateLimit-Reset": number;
        /** @description Seconds to wait before asking again */
        "Retry-After": number;
        /** @description The operation is deprecated since this moment (RFC 9745, `@` and Unix seconds) */
        Deprecation: string;
        /** @description The day the operation stops answering, at least six months after its deprecation (RFC 8594) */
        Sunset: string;
    };
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getApiIndex: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description What the API is */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiIndex"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    getOpenApiDocument: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description This OpenAPI document */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    checkHome: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["V1HomeCheckRequest"];
            };
        };
        responses: {
            /** @description Check a home file */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1HomeCheck"];
                };
            };
            /** @description `invalid_input`: What was sent isn’t right: `problems` says what, each with where */
            400: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    listProjects: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The projects it may read */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1ProjectPage"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    createProject: {
        parameters: {
            query?: never;
            header?: {
                /** @description Any unique text of the app’s, the same for a retry: the request is acted on once, its answer kept a day */
                "Idempotency-Key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["V1ProjectInput"];
            };
        };
        responses: {
            /** @description Create a project */
            201: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Project"];
                };
            };
            /** @description `invalid_input`: What was sent isn’t right: `problems` says what, each with where */
            400: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    getProject: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description One project */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Project"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    renameProject: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["V1ProjectInput"];
            };
        };
        responses: {
            /** @description Rename a project */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Project"];
                };
            };
            /** @description `invalid_input`: What was sent isn’t right: `problems` says what, each with where */
            400: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    getHome: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The last version saved */
            200: {
                headers: {
                    /** @description Send it back in `If-None-Match` */
                    ETag?: string;
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Revision"];
                };
            };
            /** @description Unchanged since the ETag sent in `If-None-Match` */
            304: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    listRevisions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Every version saved */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1RevisionPage"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    saveRevision: {
        parameters: {
            query?: never;
            header?: {
                /** @description Any unique text of the app’s, the same for a retry: the request is acted on once, its answer kept a day */
                "Idempotency-Key"?: string;
            };
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["V1SaveRevisionRequest"];
            };
        };
        responses: {
            /** @description Save a version */
            201: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1RevisionRow"];
                };
            };
            /** @description `invalid_input`: What was sent isn’t right: `problems` says what, each with where */
            400: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `conflict`: Another version was saved since the one the request starts from: `problems` names the last */
            409: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `invalid_home`: The home isn’t one of the format, or names files the project lacks: `problems` says what; `blocking_problems`: The home can’t be saved as a version: `problems` lists why (as `POST /v1/homes/check` does) */
            422: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    getRevision: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
                /** @description The version’s number */
                number: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description One version saved */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Revision"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    projectEvents: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Server-sent events: `revision.saved` (its data a `V1RevisionSaved`), then `access.revoked` or `token.expired` before the stream ends */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "text/event-stream": string;
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    getThumbnail: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The file’s bytes, where no CDN is set (a development server) */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/octet-stream": string;
                };
            };
            /** @description The file on Blupinta’s CDN, signed for a few minutes: follow the redirect */
            302: {
                headers: {
                    /** @description Where the file is */
                    Location?: string;
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    getFile: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
                /** @description The file’s sha256, as the home names it */
                sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The file’s bytes, where no CDN is set (a development server) */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/octet-stream": string;
                };
            };
            /** @description The file on Blupinta’s CDN, signed for a few minutes: follow the redirect */
            302: {
                headers: {
                    /** @description Where the file is */
                    Location?: string;
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    uploadFile: {
        parameters: {
            query?: {
                /** @description The file’s name, as people read it; `file` without */
                name?: string;
            };
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "image/png": string;
                "image/jpeg": string;
                "image/webp": string;
                "application/pdf": string;
            };
        };
        responses: {
            /** @description The project had the same file already */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1File"];
                };
            };
            /** @description Upload a file */
            201: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1File"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unsupported_file`: Not a PNG, JPEG, WebP or PDF, or its bytes aren’t the type it says */
            415: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    getCatalogModel: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
                /** @description The file’s sha256, as the home names it */
                sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The file’s bytes, where no CDN is set (a development server) */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/octet-stream": string;
                };
            };
            /** @description The file on Blupinta’s CDN, signed for a few minutes: follow the redirect */
            302: {
                headers: {
                    /** @description Where the file is */
                    Location?: string;
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    getCatalogThumbnail: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
                /** @description The file’s sha256, as the home names it */
                sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The file’s bytes, where no CDN is set (a development server) */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/octet-stream": string;
                };
            };
            /** @description The file on Blupinta’s CDN, signed for a few minutes: follow the redirect */
            302: {
                headers: {
                    /** @description Where the file is */
                    Location?: string;
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    exportProject: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Every version, as a zip */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/zip": string;
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    getHostReferences: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The elements it declared it needs */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1HostReferences"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    putHostReferences: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["V1HostReferences"];
            };
        };
        responses: {
            /** @description Declare the elements it needs */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1HostReferences"];
                };
            };
            /** @description `invalid_input`: What was sent isn’t right: `problems` says what, each with where */
            400: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    getDevices: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The devices it declared */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Devices"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    putDevices: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["V1Devices"];
            };
        };
        responses: {
            /** @description Declare its devices */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Devices"];
                };
            };
            /** @description `invalid_input`: What was sent isn’t right: `problems` says what, each with where */
            400: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    searchProducts: {
        parameters: {
            query?: {
                /** @description Words to find, tolerant of a slip of a letter and of accents */
                q?: string;
                /** @description A category or any below it (`storage` takes `storage/shelving`) */
                category?: string;
                /** @description Any of these brands */
                brand?: string[];
                /** @description Where it stands or hangs */
                mount?: "floor" | "wall" | "ceiling" | "surface" | "built-in";
                /** @description A colour family one of its finishes is in (`white`, `wood`) */
                family?: string;
                /** @description The order: by relevance (the default), by name, smallest or largest first */
                sort?: "relevance" | "name" | "smallest" | "largest";
                /** @description The names words and order are read in (`en` by default) */
                language?: "it" | "en";
                /** @description How many on a page, at most 100 (50 by default) */
                limit?: number;
                /** @description Where the page starts: the `next` of the page before */
                after?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Search the catalog */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1ProductPage"];
                };
            };
            /** @description `invalid_input`: What was sent isn’t right: `problems` says what, each with where */
            400: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    getProduct: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The first part of the product’s id (`ikea`) */
                namespace: string;
                /** @description The second part of the product’s id (`kallax`) */
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description One product, whole */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Product"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    catalogModel: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The file’s sha256, as the home names it */
                sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The file’s bytes, where no CDN is set (a development server) */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/octet-stream": string;
                };
            };
            /** @description The file on Blupinta’s CDN, signed for a few minutes: follow the redirect */
            302: {
                headers: {
                    /** @description Where the file is */
                    Location?: string;
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    catalogThumbnail: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The file’s sha256, as the home names it */
                sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The file’s bytes, where no CDN is set (a development server) */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/octet-stream": string;
                };
            };
            /** @description The file on Blupinta’s CDN, signed for a few minutes: follow the redirect */
            302: {
                headers: {
                    /** @description Where the file is */
                    Location?: string;
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    listThreads: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The project’s threads */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1ThreadPage"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    openThread: {
        parameters: {
            query?: never;
            header?: {
                /** @description Any unique text of the app’s, the same for a retry: the request is acted on once, its answer kept a day */
                "Idempotency-Key"?: string;
            };
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["V1ThreadInput"];
            };
        };
        responses: {
            /** @description Open a thread */
            201: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Thread"];
                };
            };
            /** @description `invalid_input`: What was sent isn’t right: `problems` says what, each with where */
            400: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    answerThread: {
        parameters: {
            query?: never;
            header?: {
                /** @description Any unique text of the app’s, the same for a retry: the request is acted on once, its answer kept a day */
                "Idempotency-Key"?: string;
            };
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
                /** @description One of the project’s threads */
                threadId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["V1CommentInput"];
            };
        };
        responses: {
            /** @description Answer a thread */
            201: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Thread"];
                };
            };
            /** @description `invalid_input`: What was sent isn’t right: `problems` says what, each with where */
            400: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    resolveThread: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the projects the person chose when connecting the app */
                projectId: string;
                /** @description One of the project’s threads */
                threadId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["V1ThreadChange"];
            };
        };
        responses: {
            /** @description Resolve a thread, or open it again */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Thread"];
                };
            };
            /** @description `invalid_input`: What was sent isn’t right: `problems` says what, each with where */
            400: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    listWebhooks: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The app’s webhooks */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1WebhookPage"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    createWebhook: {
        parameters: {
            query?: never;
            header?: {
                /** @description Any unique text of the app’s, the same for a retry: the request is acted on once, its answer kept a day */
                "Idempotency-Key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["V1WebhookInput"];
            };
        };
        responses: {
            /** @description Make a webhook */
            201: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1WebhookCreated"];
                };
            };
            /** @description `invalid_input`: What was sent isn’t right: `problems` says what, each with where */
            400: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    deleteWebhook: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the app’s webhooks */
                webhookId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Delete a webhook */
            204: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
    listDeliveries: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description One of the app’s webhooks */
                webhookId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A webhook’s deliveries */
            200: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1DeliveryPage"];
                };
            };
            /** @description `unauthenticated`: No valid access token for this API */
            401: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `forbidden`: The token lacks the scope this operation needs */
            403: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `not_found`: Nothing there, or nothing this token may read */
            404: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `rate_limited`: Too many requests: wait as long as `Retry-After` says */
            429: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    "Retry-After": components["headers"]["Retry-After"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
            /** @description `server_error`: Something failed on Blupinta’s side: quote `errorId` when asking for help */
            500: {
                headers: {
                    "RateLimit-Limit": components["headers"]["RateLimit-Limit"];
                    "RateLimit-Remaining": components["headers"]["RateLimit-Remaining"];
                    "RateLimit-Reset": components["headers"]["RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["V1Error"];
                };
            };
        };
    };
}
