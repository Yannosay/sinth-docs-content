---
title: Global Styles
description: Import and use global CSS/SCSS files.
---

## Importing CSS/SCSS

### In Pages

```sinth
page
import css "../styles/reset.css"
import css "../styles/theme.scss"
import css "https://cdn.example.com/styles.css"
```

### In Components

```sinth
component App {
  style global {
    @import "../styles/variables.scss"
    @import "../styles/base.css"
  }
}
```

## Global Style Files

### Reset/Normalize

```css
/* styles/reset.css */
*, *::before, *::after { box-sizing: border-box; }
html { font-size: 16px; -webkit-text-size-adjust: 100%; }
body { margin: 0; font-family: system-ui, sans-serif; line-height: 1.5; }
img, video { max-width: 100%; height: auto; display: block; }
button, input, select, textarea { font: inherit; }
```

### Variables/Design Tokens

```scss
/* styles/variables.scss */
:root {
  /* Colors */
  --color-primary: #007bff;
  --color-primary-hover: #0056b3;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;
  
  /* Neutral */
  --color-white: #ffffff;
  --color-gray-50: #f8f9fa;
  --color-gray-100: #f1f3f5;
  --color-gray-200: #e9ecef;
  --color-gray-300: #dee2e6;
  --color-gray-400: #ced4da;
  --color-gray-500: #adb5bd;
  --color-gray-600: #6c757d;
  --color-gray-700: #495057;
  --color-gray-800: #343a40;
  --color-gray-900: #212529;
  --color-black: #000000;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 3rem;
  
  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: "SF Mono", "Fira Code", monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 3rem;
  
  /* Borders */
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}
```

### Base Styles

```scss
/* styles/base.scss */
@import "variables";

body {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--color-gray-900);
  background: var(--color-white);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  font-weight: 600;
  line-height: 1.3;
}

h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }

a { color: var(--color-primary); text-decoration: none; }
a:hover { color: var(--color-primary-hover); text-decoration: underline; }

button { cursor: pointer; }

/* Focus visible for accessibility */
:focus:not(:focus-visible) { outline: none; }
:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
```

### Utility Classes

```scss
/* styles/utilities.scss */
@import "variables";

/* Spacing */
.m-0 { margin: 0; }
.m-auto { margin: auto; }
.mt-1 { margin-top: var(--space-1); }
.mt-2 { margin-top: var(--space-2); }
.mb-1 { margin-bottom: var(--space-1); }
.mx-auto { margin-left: auto; margin-right: auto; }

.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.px-4 { padding-left: var(--space-4); padding-right: var(--space-4); }

/* Display */
.d-flex { display: flex; }
.d-grid { display: grid; }
.d-none { display: none; }
.d-block { display: block; }

/* Flex */
.flex-1 { flex: 1; }
.justify-center { justify-content: center; }
.items-center { align-items: center; }
.gap-2 { gap: var(--space-2); }

/* Text */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
.fw-bold { font-weight: 700; }
.text-primary { color: var(--color-primary); }
.text-muted { color: var(--color-gray-600); }

/* Visibility */
.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}
```

## Using Global Styles

### In sinth.config.json

```json
{
  "staticDirs": ["assets"],
  "libraryPaths": ["./libraries"]
}
```

Place global CSS in `styles/` and import in pages:

```sinth
page
import css "../styles/reset.css"
import css "../styles/base.scss"
import css "../styles/utilities.scss"

Main { ... }
```

### SCSS Compilation

Sinth uses Dart Sass for `.scss` files. Install:

```bash
npm install -D sass
```

## CSS Layers (Modern)

```sinth
page
import css "../styles/reset.css" layer(reset)
import css "../styles/theme.css" layer(theme)
import css "../styles/components.css" layer(components)

style {
  @layer components {
    .my-custom { color: red; }
  }
}
```

## Critical CSS

For performance, inline critical CSS:

```sinth
page
style global {
  /* Critical above-the-fold styles only */
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui; }
  .hero { min-height: 100vh; display: flex; align-items: center; }
}

-- Non-critical loaded async
import css "../styles/full.css"
```

## Next Steps

- [Theming](/docs/styling/theming)
- [Inline Styles](/docs/styling/inline-styles)
- [Style Blocks](/docs/styling/style-blocks)