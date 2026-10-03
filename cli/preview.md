---
title: sinth preview
description: Preview built output locally.
---

Preview your production build locally before deploying.

## Basic Usage

```bash
sinth build --prod
sinth preview
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--port <num>` | Server port | `4000` |

## What It Does

- Serves `dist/` directory
- SPA fallback to `index.html`
- Correct MIME types for assets
- No live reload (static preview)

## Usage

```bash
# Build first
sinth build --prod

# Preview
sinth preview
# Serving at http://localhost:4000

# Custom port
sinth preview --port 5000
```

## Use Cases

- Verify production build locally
- Test routing (SPA fallback)
- Check asset loading
- Share with stakeholders

## Comparison

| Command | Purpose | Live Reload | Output |
|---------|---------|-------------|--------|
| `sinth dev` | Development | Yes | Memory |
| `sinth preview` | Production preview | No | `dist/` |
| `sinth build` | Production build | No | `dist/` |

## Next Steps

- [sinth build](/docs/cli/build)
- [sinth deploy](/docs/cli/deploy)
- [Deployment](/docs/guides/deployment)