---
title: sinth deploy
description: Deploy to Cloudflare Pages.
---

Deploy your Sinth project to Cloudflare Pages with one command.

## Prerequisites

1. **Cloudflare account** with Pages enabled
2. **Wrangler CLI** installed: `npm install -g wrangler`
3. **API Token** with Pages permissions

## Setup

### Configure sinth.config.json

```json
{
  "outDir": "./dist",
  "cloudflare": {
    "accountId": "your-account-id",
    "projectName": "my-sinth-app",
    "productionBranch": "production",
    "compatibilityDate": "2024-01-15"
  }
}
```

### Authenticate Wrangler

```bash
wrangler login
# Or set token
export CLOUDFLARE_API_TOKEN=your-token
```

## Deploy

```bash
# Build and deploy
sinth deploy

# Or build separately then deploy
sinth build --prod
sinth deploy
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--out <dir>` | Build output directory | `./dist` |
| `--project <name>` | Cloudflare project name | From config |
| `--branch <name>` | Deploy branch | `production` |

## What It Does

1. Runs `sinth build --prod`
2. Generates `wrangler.toml` if missing
3. Runs `wrangler pages deploy dist --project-name=<name>`
4. Outputs deployment URL

## Cloudflare Configuration

### Full wrangler.toml

```toml
name = "my-sinth-app"
compatibility_date = "2024-01-15"
pages_build_output_dir = "dist"

[env.production]
name = "my-sinth-app-production"

[vars]
ENVIRONMENT = "production"
```

### Environment Variables

```toml
[vars]
API_URL = "https://api.example.com"
FEATURE_FLAG = "true"

[env.production.vars]
API_URL = "https://api.prod.example.com"
```

### KV Namespaces

```toml
kv_namespaces = [
  { binding = "CACHE", id = "namespace-id" }
]
```

### D1 Databases

```toml
d1_databases = [
  { binding = "DB", name = "my-db" }
]
```

## Custom Domains

1. Deploy first: `sinth deploy`
2. In Cloudflare Dashboard → Pages → Custom domains
3. Add domain, verify DNS
4. SSL automatic

## CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install
        run: npm ci
        
      - name: Build
        run: npx sinth build --prod
        
      - name: Deploy
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: my-sinth-app
          directory: dist
          branch: production
```

### GitLab CI

```yaml
deploy:
  stage: deploy
  image: node:20
  script:
    - npm ci
    - npx sinth build --prod
    - npx wrangler pages deploy dist --project-name=$PROJECT_NAME
  only:
    - main
```

## Troubleshooting

### Build Fails

```bash
# Check build locally
sinth build --prod

# Check for TypeScript errors
npx tsc --noEmit
```

### Deploy Fails

```bash
# Check Wrangler auth
wrangler whoami

# Check project exists
wrangler pages project list
```

### 404 on Refresh

Ensure SPA fallback in `wrangler.toml`:
```toml
# Cloudflare Pages handles this automatically
```

## Next Steps

- [sinth preview](/docs/cli/preview)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler Config](https://developers.cloudflare.com/workers/wrangler/configuration/)