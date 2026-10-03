---
title: sinth dev
description: Live-reload development server.
---

Start a development server with hot reload.

## Basic Usage

```bash
sinth dev                    # Serve all pages
sinth dev pages/index.sinth  # Serve specific file
sinth dev --port 4000        # Custom port
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--port <num>` | Server port | `3000` |
| `--out <dir>` | Output directory | `./dist` |

## Features

### Live Reload

- Automatic browser refresh on file changes
- SSE (Server-Sent Events) for instant updates
- Preserves scroll position

### Error Overlay

- Compilation errors shown in browser
- Source-mapped line numbers
- Auto-dismiss on fix

### Selective Recompilation

- Only recompiles changed `.sinth` files
- Full rebuild for CSS/JS/assets
- Incremental compilation

## Usage

```bash
# Start dev server
sinth dev

# Open http://localhost:3000
# Edit files, see changes instantly
```

## File Watching

Watches:
- `pages/` — Page entry points
- `components/` — Components
- `styles/` — CSS/SCSS
- `libraries/` — Shared libraries
- `assets/` — Static assets (copied to dist)

Ignores:
- `dist/` — Build output
- `node_modules/`
- `.git/`

## Error Handling

```bash
# Compilation errors shown in terminal
sinth dev
# [sinth] Changed: pages/index.sinth
# Error: Variable 'x' is used but never declared
#   at: pages/index.sinth (line 10, col 5)
```

Errors also appear in browser overlay.

## HTTPS (Local Development)

```bash
# Generate certs
mkcert localhost

# Run with certs
sinth dev --https --cert localhost.pem --key localhost-key.pem
```

## Proxy API Requests

```bash
# In sinth.config.json
{
  "proxy": {
    "/api": "http://localhost:4000"
  }
}
```

## Custom Port

```bash
sinth dev --port 4000
# Or set in config
```

## Environment Variables

```bash
# In .env
SINTH_PORT=3000
SINTH_HOST=0.0.0.0
```

## Debug Mode

```bash
DEBUG=sinth:* sinth dev
```

## Next Steps

- [sinth build](/docs/cli/build)
- [sinth preview](/docs/cli/preview)
- [Configuration](/docs/cli/config)