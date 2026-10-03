---
title: Your First Project
description: Scaffold and run a Sinth project.
---

## Quick Start with `sinth init`

The fastest way to start is the interactive project scaffolder:

```bash
sinth init my-app
```

This prompts you to choose a preset:

| Preset | Description |
|--------|-------------|
| **basic** | Single page + component (minimal) |
| **full** | Multi-page, components, SCSS demo |
| **blank** | Folders + config only |

Choose **basic** for your first project.

## Manual Project Setup

If you prefer manual setup:

```bash
mkdir my-app && cd my-app
npm init -y
npm install -g @yannosay/sinth
```

Create the standard folder structure:

```bash
mkdir pages components styles libraries assets
```

Create `sinth.config.json`:

```json
{
  "outDir": "./dist",
  "libraryPaths": ["./libraries"],
  "minify": false
}
```

Create `pages/index.sinth`:

```sinth
page
import "../components/Navbar.sinth"
import css "../styles/reset.css"

title = "My Sinth App"
fav   = "assets/favicon.ico"
descr = "Built with Sinth 5."

var num count = 0
var str message = "Welcome!"

Navbar

Main {
  Heading(level: 1) { "Hello, Sinth!" }
  Paragraph { message }
  Button(onClick: count += 1; message = "Count: " + count; sinthRender()) {
    "Increment: " + count
  }
}

style {
  main { padding: "2rem"; maxWidth: "800px"; margin: "0 auto"; }
}
```

Create `components/Navbar.sinth`:

```sinth
component Navbar {
  Header {
    Nav {
      Link(href: "/", class: "logo") { "MyApp" }
      Div(class: "links") {
        NavLink(href: "/") { "Home" }
        NavLink(href: "/about") { "About" }
      }
    }
  }
  style {
    header { display: "flex"; justifyContent: "space-between"; padding: "1rem 2rem"; background: "#1a1a2e"; color: "white"; }
    .logo { fontSize: "1.5rem"; fontWeight: "700"; color: "white"; textDecoration: "none"; }
    .links { display: "flex"; gap: "1.5rem"; }
    .links a { color: "rgba(255,255,255,0.8)"; textDecoration: "none"; }
  }
}
```

Create `styles/reset.css`:

```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; line-height: 1.6; }
img { max-width: 100%; display: block; }
```

## Run the Dev Server

```bash
sinth dev
```

Opens `http://localhost:3000` with live reload. Edit files and see changes instantly!

## Build for Production

```bash
sinth build --prod
```

Outputs optimized files to `./dist`. Deploy this folder anywhere (Netlify, Vercel, Cloudflare Pages, etc.).

## Project Structure Explained

```
my-app/
├── pages/           # Page entry points (must have `page` keyword)
│   └── index.sinth
├── components/      # Reusable components (imported into pages)
│   └── Navbar.sinth
├── styles/          # Global CSS/SCSS files
│   └── reset.css
├── libraries/       # Shared Sinth libraries (auto-imported)
├── assets/          # Static assets (images, fonts, etc.)
├── dist/            # Build output (gitignored)
├── sinth.config.json
└── package.json
```

### Key Rules

- **Pages** go in `pages/` and must start with `page`
- **Components** go in `components/` and start with `component`
- **Import components** with relative paths: `import "../components/Navbar.sinth"`
- **Import CSS** with `import css "../styles/reset.css"`
- **Assets** in `assets/` are copied to `dist/assets/` on build

## Next Steps

- Read [Syntax Overview](/docs/fundamentals/syntax-overview)
- Explore [Built-in Components](/docs/builtins/structural)
- Learn [State Management](/docs/state-management/reactive-variables)