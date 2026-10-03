---
title: Project Structure
description: Understand the standard Sinth project layout.
---

## Standard Layout

```
project-root/
├── pages/              # Page entry points (required)
│   ├── index.sinth     # Homepage (auto-served at /)
│   ├── about.sinth     # Served at /about.html
│   └── blog/
│       └── post-1.sinth # Served at /blog/post-1.html
├── components/         # Reusable UI components
│   ├── Navbar.sinth
│   ├── Card.sinth
│   └── forms/
│       └── ContactForm.sinth
├── styles/             # Global stylesheets
│   ├── reset.css
│   ├── variables.scss
│   └── theme.scss
├── libraries/          # Shared Sinth libraries
│   ├── ui-components/
│   │   ├── Button.sinth
│   │   └── Modal.sinth
│   └── utils/
│       └── helpers.sinth
├── assets/             # Static assets (copied to dist/)
│   ├── images/
│   │   └── logo.png
│   ├── fonts/
│   └── favicon.ico
├── dist/               # Build output (gitignored)
│   ├── _sinth/
│   │   ├── js/        # Compiled JavaScript
│   │   └── styles/    # Compiled CSS
│   ├── index.html
│   └── about.html
├── sinth.config.json   # Project configuration
└── package.json
```

## Directory Purposes

### `pages/` — Page Entry Points

Every `.sinth` file in `pages/` that starts with `page` becomes an HTML page.

```sinth
page -- Required keyword
import "../components/Navbar" -- Import components
import css "../styles/reset" -- Import CSS

title = "Page Title" -- Meta: <title>
descr = "Description" -- Meta: <meta name="description">
fav   = "assets/favicon.ico" -- Meta: <link rel="icon">

Main { ... } -- Page content
```

**Naming convention:** File name = URL path (`about.sinth` → `/about.html`)

### `components/` — Reusable Components

Components are imported into pages or other components:

```sinth
component Card(title, color = "blue") {
  Div(class: "card") {
    Heading(level: 3) { title }
    Div(class: "card-body") { $slot }
  }
  style {
    .card { background: color; padding: "1rem"; borderRadius: "0.5rem"; }
  }
}
```

Use in pages:
```sinth
import "../components/Card.sinth"

Card(title: "Hello") { "Content goes here" }
```

### `libraries/` — Shared Libraries

Libraries are **auto-imported** — no import statement needed:

```
libraries/
└── ui/
    ├── Button.sinth    # Available as <Button> everywhere
    └── Modal.sinth     # Available as <Modal> everywhere
```

```sinth
page -- No import needed!
Button { "Click me" }
Modal { "Hello" }
```

::: tip
Libraries are great for design systems and shared component collections.
:::

### `styles/` — Global Stylesheets

Import in pages with `import css`:

```sinth
page
import css "../styles/reset.css"
import css "../styles/theme.scss" -- SCSS supported with sass package
```

### `assets/` — Static Files

Copied as-is to `dist/` on build:

```
assets/
└── images/logo.png  →  dist/images/logo.png
```

Reference in code:
```sinth
Img(src: "images/logo.png", alt: "Logo")
```

## Configuration: `sinth.config.json`

```json
{
  "outDir": "./dist",                    // Build output directory
  "libraryPaths": ["./libraries"],       // Additional library paths
  "staticDirs": ["assets"],              // Extra static directories
  "minify": false,                       // Minify HTML output (--prod overrides)
  "sharedRuntime": false,                // Shared runtime.js file
  "inlineJS": false,                     // Inline JS in HTML (--inline-js overrides)
  "inlineCSS": false,                    // Inline CSS in HTML (--inline-css overrides)
  "port": 3000                           // Dev server port
}
```

All options can be overridden via CLI flags.

## Multi-Page Apps

Create multiple pages:

```
pages/
├── index.sinth      # /
├── about.sinth      # /about.html
├── contact.sinth    # /contact.html
└── blog/
    ├── index.sinth  # /blog.html
    └── post.sinth   # /blog/post.html
```

Navigate with standard `<Link>` or `<NavLink>` components.

## Build Output Structure

```
dist/
├── index.html
├── about.html
├── _sinth/
│   ├── js/
│   │   ├── pages-index.abc123.js      # Page-specific JS
│   │   └── sinth-runtime.js           # Shared runtime (if enabled)
│   └── styles/
│       ├── pages-index.def456.css
│       └── sinthui.a1b2c3.css         # Built-in component styles
├── assets/
│   └── images/logo.png
└── libraries/                          # Copied libraries (minus .sinth/.html)
```

## Git Ignore

Always ignore `dist/` and `node_modules/`:

```gitignore
# .gitignore
dist/
node_modules/
.env
*.log
```

## Environment-Specific Builds

```bash
# Development
sinth build

# Production (minified, optimized)
sinth build --prod

# With shared runtime (smaller page bundles)
sinth build --shared-runtime

# Inline everything (single HTML file per page)
sinth build --inline-js --inline-css
```