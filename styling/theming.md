---
title: Theming & CSS Variables
description: Use CSS custom properties for theming.
---

## CSS Variable Theming

Sinth leverages CSS custom properties for powerful theming.

## Define Theme Variables

```scss
/* styles/theme.scss */
:root {
  /* Light theme (default) */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --border-color: #dee2e6;
  --primary: #007bff;
  --primary-hover: #0056b3;
}

[data-theme="dark"] {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --text-primary: #f8f9fa;
  --text-secondary: #adb5bd;
  --border-color: #0f3460;
  --primary: #4dabf7;
  --primary-hover: #74c0fc;
}
```

## Apply Theme

```sinth
page
var str theme = "light"  -- "light" | "dark"

script {
  function toggleTheme() {
    theme = theme == "light" ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }
  
  -- Load saved theme
  var saved = localStorage.getItem("theme")
  if (saved) { theme = saved; document.documentElement.setAttribute("data-theme", theme) }
}

Main(style: { backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh" }) {
  Button(onClick: toggleTheme) { theme == "light" ? "🌙 Dark" : "☀️ Light" }
  -- Content
}
```

## Using Theme Variables

```sinth
style {
  .card {
    background: var(--bg-secondary)
    color: var(--text-primary)
    border: "1px solid var(--border-color)"
    padding: "1.5rem"
    borderRadius: "0.5rem"
  }
  
  .btn-primary {
    background: var(--primary)
    color: white
    &:hover { background: var(--primary-hover); }
  }
}
```

Inline:
```sinth
Div(style: { background: "var(--bg-primary)", color: "var(--text-primary)" }) { ... }
```

## Multiple Themes

```scss
:root {
  /* Default */
}

[data-theme="dark"] { ... }
[data-theme="high-contrast"] {
  --bg-primary: #000;
  --text-primary: #fff;
  --border-color: #fff;
}
[data-theme="sepia"] {
  --bg-primary: #f4ecd8;
  --text-primary: #433422;
  --primary: #8b4513;
}
```

```sinth
var str theme = "light"

Select(model: theme) {
  Option(value: "light") { "Light" }
  Option(value: "dark") { "Dark" }
  Option(value: "high-contrast") { "High Contrast" }
  Option(value: "sepia") { "Sepia" }
}
```

## Component-Level Theming

```sinth
component ThemedButton(variant = "primary") {
  style {
    .btn {
      padding: "0.5rem 1rem"
      borderRadius: "0.25rem"
      fontWeight: 500
      transition: "background 0.2s"
      --variant-primary: var(--primary)
      --variant-secondary: var(--secondary)
      --variant-danger: var(--danger)
      background: var(--variant-#{$variant})
      color: white
    }
  }
  
  Button(class: "btn", style: { background: "var(--variant-#{$variant})" }) { $slot }
}
```

## Theme Persistence

```sinth
script {
  function initTheme() {
    var saved = localStorage.getItem("theme")
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    theme = saved || (prefersDark ? "dark" : "light")
    applyTheme()
  }
  
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }
  
  function toggleTheme() {
    theme = theme == "light" ? "dark" : "light"
    applyTheme()
  }
  
  -- System preference listener
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      theme = e.matches ? "dark" : "light"
      applyTheme()
    }
  })
  
  initTheme()
}
```

## Dynamic Theme Values

```sinth
var str primaryColor = "#007bff"

style {
  :root { --primary: #{$primaryColor}; }
  
  .btn-primary { background: var(--primary); }
}

Input(type: "color", model: primaryColor, label: "Primary Color")
```

## Best Practices

1. **Define all colors as variables** — Single source of truth
2. **Use semantic names** — `--text-primary` not `--white`
3. **Scope to `[data-theme]`** — Clean switching
4. **Persist user choice** — localStorage + system preference
5. **Transition smoothly** — `transition: background 0.2s, color 0.2s`

```sinth
style {
  * { transition: background-color 0.2s, color 0.2s, border-color 0.2s; }
}
```

## Next Steps

- [Inline Styles](/docs/styling/inline-styles)
- [Style Blocks](/docs/styling/style-blocks)
- [Global Styles](/docs/styling/global-styles)