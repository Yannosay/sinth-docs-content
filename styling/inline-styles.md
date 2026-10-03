---
title: Inline Styles
description: Apply CSS properties directly as attributes.
---

Apply CSS styles directly to any component using camelCase attributes.

## Basic Usage

```sinth
Div(style: { padding: "1rem", backgroundColor: "#f5f5f5" }) { "Content" }

Button(
  style: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem"
  }
) { "Click me" }
```

## Supported Properties

All standard CSS properties work in camelCase:

```sinth
-- Layout
display: "flex"
flexDirection: "column"
justifyContent: "center"
alignItems: "center"
gap: "1rem"

-- Spacing
margin: "1rem"
marginTop: "0.5rem"
padding: "1rem 2rem"

-- Sizing
width: "100%"
maxWidth: "800px"
minHeight: "200px"

-- Typography
fontSize: "1.5rem"
fontWeight: "600"
lineHeight: "1.6"
color: "#333"
textAlign: "center"

-- Borders
border: "1px solid #ccc"
borderRadius: "0.5rem"
borderTop: "2px solid #007bff"

-- Background
backgroundColor: "#f8f9fa"
backgroundImage: "linear-gradient(45deg, #007bff, #00c6ff)"
opacity: 0.9

-- Position
position: "relative"
top: "10px"
zIndex: 10

-- Transforms
transform: "translateX(10px) scale(1.05)"
transition: "all 0.3s ease"
```

## Dynamic Styles

Use expressions for dynamic values:

```sinth
var bool isActive = false
var str themeColor = "#007bff"

Div(
  style: {
    backgroundColor: isActive ? themeColor : "#ccc",
    opacity: isActive ? 1 : 0.5,
    transform: isActive ? "scale(1.02)" : "scale(1)"
  }
) { "Toggle me" }

Button(onClick: isActive = !isActive) { isActive ? "Active" : "Inactive" }
```

## Conditional Styles

```sinth
var str status = "success"  -- "success" | "warning" | "error"

Div(
  style: {
    padding: "1rem",
    borderRadius: "0.25rem",
    backgroundColor: status == "success" ? "#d4edda" :
                     status == "warning" ? "#fff3cd" :
                     "#f8d7da",
    color: status == "success" ? "#155724" :
           status == "warning" ? "#856404" :
           "#721c24"
  }
) { status }
```

## Responsive Inline Styles

```sinth
Div(
  style: {
    padding: "1rem",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1rem"
  }
)

-- Use media queries in style blocks instead for complex responsive
```

## Style Precedence

Inline styles have highest specificity:

```sinth
style {
  .card { background: white; }
}

Div(class: "card", style: { background: "red" }) { "Red wins!" }
```

## Performance

Inline styles are efficient for dynamic values but consider:

```sinth
-- Good: Simple dynamic values
Div(style: { color: isError ? "red" : "black" }) { ... }

-- Better: CSS classes for complex states
style {
  .text-error { color: red; }
  .text-success { color: green; }
}
Div(class: isError ? "text-error" : "text-success") { ... }
```

## CSS Variables (Custom Properties)

```sinth
style {
  :root {
    --primary: #007bff;
    --spacing: 1rem;
  }
}

Div(style: {
  color: "var(--primary)",
  padding: "var(--spacing)"
}) { ... }
```

## Best Practices

1. **Use for dynamic values** — hover states, toggles, animations
2. **Use style blocks** for static/component styles
3. **CSS variables** for theming
4. **Avoid !important** — use specificity instead

```sinth
-- Good: Dynamic theming
var str theme = "dark"
Div(style: { backgroundColor: theme == "dark" ? "#1a1a2e" : "white" }) { ... }

-- Good: Animation triggers
var bool open = false
Div(style: { height: open ? "200px" : "0", transition: "height 0.3s" }) { ... }

-- Avoid: Static styles
Div(style: { padding: "1rem", margin: "0 auto", maxWidth: "800px" }) { ... }
-- Better in style block:
style { .container { padding: "1rem"; margin: "0 auto"; maxWidth: "800px"; } }
```

## Next Steps

- [Style Blocks](/docs/styling/style-blocks)
- [Global Styles](/docs/styling/global-styles)
- [Theming](/docs/styling/theming)