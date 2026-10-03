---
title: sinth build
description: Compile .sinth pages to HTML/JS/CSS.
---

Build your Sinth project for production or development.

## Basic Usage

```bash
sinth build                    # Build all pages
sinth build pages/index.sinth  # Build specific file
sinth build pages/about.sinth pages/contact.sinth  # Multiple files
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--out <dir>` | Output directory | `./dist` |
| `--prod` | Production mode (minify) | `false` |
| `--shared-runtime` | Single shared runtime.js | `false` |
| `--inline-js` | Inline JS in HTML | `false` |
| `--inline-css` | Inline CSS in HTML | `false` |
| `--check-only` | Lint without emitting | `false` |

## Output Structure

```
dist/
├── index.html
├── about.html
├── _sinth/
│   ├── js/
│   │   ├── pages-index.abc123.js
│   │   └── sinth-runtime.js (if --shared-runtime)
│   └── styles/
│       ├── pages-index.def456.css
│       └── sinthui.a1b2c3.css
├── assets/
│   └── images/logo.png
└── libraries/
    └── ui/
        └── Button.sinth
```

## Production Build

```bash
sinth build --prod
```

Optimizations:
- Minified HTML
- Minified JS/CSS
- Content hashes for caching
- Dead code elimination

## Shared Runtime

```bash
sinth build --shared-runtime
```

Creates `sinth-runtime.js` shared across all pages. Reduces total bundle size for multi-page apps.

## Inline Assets

```bash
# Single HTML file per page (no external JS/CSS)
sinth build --inline-js --inline-css

# Useful for email templates, embedding
```

## Watch Mode (Development)

```bash
# Use dev server instead
sinth dev
```

## Configuration

```json
{
  "outDir": "./dist",
  "minify": false,
  "sharedRuntime": false,
  "inlineJS": false,
  "inlineCSS": false
}
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Build failed |

## CI/CD Example

```yaml
# GitHub Actions
- name: Build Sinth
  run: |
    npm install -g @yannosay/sinth
    sinth build --prod
    
- name: Deploy to Netlify
  uses: netlify/actions/cli@master
  with:
    args: deploy --dir=dist --prod
```

## Next Steps

- [sinth dev](/docs/cli/dev)
- [sinth preview](/docs/cli/preview)
- [sinth deploy](/docs/cli/deploy)