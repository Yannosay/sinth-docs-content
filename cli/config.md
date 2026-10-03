---
title: sinth.config.json
description: Project configuration options.
---

Configure your Sinth project with `sinth.config.json`.

## Basic Configuration

```json
{
  "outDir": "./dist",
  "libraryPaths": ["./libraries"],
  "staticDirs": ["assets"],
  "minify": false,
  "sharedRuntime": false,
  "inlineJS": false,
  "inlineCSS": false,
  "port": 3000
}
```

## All Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `outDir` | string | `./dist` | Build output directory |
| `libraryPaths` | string[] | `["./libraries"]` | Additional library search paths |
| `staticDirs` | string[] | `["assets"]` | Static asset directories to copy |
| `minify` | boolean | `false` | Minify HTML output |
| `sharedRuntime` | boolean | `false` | Generate shared runtime.js |
| `inlineJS` | boolean | `false` | Inline JavaScript in HTML |
| `inlineCSS` | boolean | `false` | Inline CSS in HTML |
| `port` | number | `3000` | Dev server port |
| `cloudflare` | object | — | Cloudflare Pages config |

## Cloudflare Config

```json
{
  "cloudflare": {
    "accountId": "your-account-id",
    "projectName": "my-app",
    "productionBranch": "production",
    "compatibilityDate": "2024-01-15",
    "compatibilityFlags": ["nodejs_compat"],
    "kvNamespaces": [
      { "binding": "CACHE", "id": "namespace-id" }
    ],
    "d1Databases": [
      { "binding": "DB", "name": "my-db" }
    ],
    "r2Buckets": [
      { "binding": "BUCKET", "bucketName": "my-bucket" }
    ]
  }
}
```

## Environment-Specific Config

```json
{
  "outDir": "./dist",
  "development": {
    "minify": false,
    "sharedRuntime": true
  },
  "production": {
    "minify": true,
    "sharedRuntime": false,
    "inlineJS": false,
    "inlineCSS": false
  }
}
```

## CLI Override

Command-line flags override config:

```bash
sinth build --prod --out ./build --shared-runtime
```

## Complete Example

```json
{
  "outDir": "./dist",
  "libraryPaths": [
    "./libraries",
    "./shared/components"
  ],
  "staticDirs": [
    "assets",
    "public"
  ],
  "minify": false,
  "sharedRuntime": false,
  "inlineJS": false,
  "inlineCSS": false,
  "port": 3000,
  "cloudflare": {
    "accountId": "abc123",
    "projectName": "my-sinth-app",
    "productionBranch": "main",
    "compatibilityDate": "2024-01-15"
  },
  "development": {
    "sharedRuntime": true
  },
  "production": {
    "minify": true,
    "inlineJS": true,
    "inlineCSS": true
  }
}
```

## Validation

Run `sinth check` to validate config:

```bash
sinth check
# Validates:
# - outDir exists/writable
# - libraryPaths exist
# - cloudflare config complete
# - staticDirs exist
```

## Next Steps

- [sinth build](/docs/cli/build)
- [sinth deploy](/docs/cli/deploy)
- [Project Structure](/docs/getting-started/project-structure)