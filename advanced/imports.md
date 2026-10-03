---
title: Imports & Libraries
description: Import .sinth, .js, .css files and builtins.
---

Import system for composing applications from multiple files.

## Import Syntax

```sinth
-- Import Sinth component
import "../components/Button.sinth"

-- Import CSS/SCSS
import css "../styles/reset.css"
import css "../styles/theme.scss"

-- Import JavaScript
import js "./utils.js"

-- Import built-in library
import "ui/Button"
```

## Import Types

### Sinth Files

```sinth
-- Relative path
import "./Button"
import "../components/Card"

-- With alias
import "./Button" as PrimaryButton

-- From libraries/
import "ui/Button"  -- From libraries/ui/Button.sinth
```

### CSS/SCSS

```sinth
-- Local file
import css "../styles/reset.css"

-- SCSS (requires sass package)
import css "../styles/theme.scss"

-- External URL
import css "https://cdn.example.com/styles.css"
```

### JavaScript

```sinth
-- Local file
import js "./utils.js"

-- With attributes
import js "./analytics.js" { defer: true, async: true }

-- External
import js "https://cdn.example.com/lib.js"
```

## Library System

### Creating Libraries

```
libraries/
└── ui/
    ├── Button.sinth
    ├── Card.sinth
    └── Modal.sinth
```

### Using Libraries

```sinth
-- No import needed! Auto-available
page
Button { "Click" }
Card(title: "Hello") { "Content" }
```

### Library Configuration

```json
{
  "libraryPaths": ["./libraries", "./shared/lib"]
}
```

## Import Resolution

1. **Relative paths** — From current file
2. **Library paths** — From `libraryPaths` config
3. **Built-ins** — Core components
4. **External URLs** — Full URLs

## Circular Imports

```sinth
-- A.sinth imports B.sinth
-- B.sinth imports A.sinth  -- ERROR!

-- Solution: Extract shared to C.sinth
import "./C"  -- Both import C
```

## Dynamic Imports (Script)

```sinth
script {
  async function loadComponent(name) {
    var module = await import("./components/" + name + ".sinth")
    -- Use module.default or module[name]
  }
}
```

## CSS Processing

### PostCSS/SCSS

```bash
npm install -D sass postcss autoprefixer
```

```json
{
  "scripts": {
    "build:css": "postcss styles/*.css -o dist/styles.css"
  }
}
```

## Import Order

```sinth
page

-- 1. Sinth components (first)
import "../components/Button"
import "./CustomComponent"

-- 2. CSS (order matters for cascade)
import css "../styles/reset.css"
import css "../styles/variables.css"
import css "../styles/components.css"

-- 3. JavaScript
import js "./utils.js"
import js "./analytics.js"

-- 4. Page content
Main { ... }
```

## Best Practices

1. **Organize by feature** — `components/ui/`, `components/forms/`
2. **Use libraries** for shared components
3. **Keep imports minimal** — Only import what you use
3. **Use aliases** for conflicting names
4. **Order CSS logically** — Reset → Variables → Components → Utilities

## Next Steps

- [Project Structure](/docs/getting-started/project-structure)
- [Custom Elements](/docs/advanced/custom-elements)
- [Libraries](/docs/guides/libraries)