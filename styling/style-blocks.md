---
title: Style Blocks
description: Write SCSS/CSS inside components.
---

Component-scoped styles using SCSS syntax with automatic scoping.

## Basic Syntax

```sinth
component Card(title) {
  Div(class: "card") {
    Heading(level: 3) { title }
    $slot
  }

  style {
    .card {
      background: white
      borderRadius: "0.5rem"
      padding: "1.5rem"
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      
      &:hover {
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
        transform: "translateY(-2px)"
        transition: "all 0.2s"
      }
    }
  }
}
```

## SCSS Features

### Nesting

```sinth
style {
  .card {
    .header {
      padding: "1rem"
      borderBottom: "1px solid #eee"
      
      h3 { margin: 0; }
    }
    
    .body { padding: "1rem"; }
    .footer { padding: "1rem"; borderTop: "1px solid #eee"; }
  }
}
```

### Parent Selector (&)

```sinth
style {
  .button {
    background: blue
    color: white
    
    &:hover { background: darkblue; }
    &:focus { outline: "2px solid blue"; }
    &:disabled { opacity: 0.5; cursor: "not-allowed"; }
    
    &.primary { background: #007bff; }
    &.secondary { background: #6c757d; }
  }
}
```

### Variables

```sinth
style {
  $primary: #007bff
  $spacing: 1rem
  $radius: 0.5rem
  
  .card {
    borderRadius: $radius
    padding: $spacing
    
    .btn-primary { background: $primary; }
  }
}
```

### Mixins

```sinth
style {
  @mixin flex-center {
    display: flex
    alignItems: center
    justifyContent: center
  }
  
  @mixin card-shadow($elevation: 1) {
    boxShadow: if($elevation == 1, "0 2px 4px rgba(0,0,0,0.1)", "0 8px 16px rgba(0,0,0,0.15)")
  }
  
  .card {
    @include card-shadow(2)
  }
  
  .modal {
    @include flex-center
  }
}
```

### Functions

```sinth
style {
  @function fluid($min, $max, $vw: 1vw) {
    @return clamp($min, $vw * 10, $max)
  }
  
  h1 { fontSize: fluid(2rem, 4rem); }
}
```

### Conditionals & Loops

```sinth
style {
  $colors: (primary: #007bff, success: #28a745, danger: #dc3545)
  
  @each $name, $color in $colors {
    .btn-#{$name} {
      background: $color
      &:hover { background: darken($color, 10%); }
    }
  }
  
  @for $i from 1 through 12 {
    .col-#{$i} { width: percentage($i / 12); }
  }
}
```

## Media Queries

```sinth
style {
  .container {
    padding: "1rem"
    
    @media (min-width: 768px) {
      padding: "2rem"
      maxWidth: "720px"
    }
    
    @media (min-width: 1024px) {
      maxWidth: "960px"
    }
    
    @media (max-width: 480px) {
      padding: "0.5rem"
    }
  }
  
  -- Container queries (modern)
  @container (min-width: 400px) {
    .card { display: "flex"; }
  }
}
```

## Pseudo-elements & Classes

```sinth
style {
  .input {
    &:focus { borderColor: "var(--primary)"; }
    &:invalid { borderColor: "red"; }
    &::placeholder { color: "#999"; }
  }
  
  .list {
    li {
      &:first-child { borderTop: "none"; }
      &:last-child { borderBottom: "none"; }
      &:nth-child(odd) { background: "#fafafa"; }
    }
  }
  
  .tooltip {
    position: "relative"
    &::before {
      content: "attr(data-tooltip)"
      position: "absolute"
      bottom: "100%"
      left: "50%"
      transform: "translateX(-50%)"
      -- styling
    }
  }
}
```

## Global Styles

### Component-scoped (default)

Styles in component `style { }` blocks are automatically scoped:

```sinth
component Card {
  style {
    .card { background: white; }  -- Becomes .card_<hash> { ... }
  }
}
```

### Global Styles

Use `style global` for unscoped styles:

```sinth
component App {
  style global {
    * { boxSizing: "border-box"; }
    body { margin: 0; fontFamily: "system-ui, sans-serif"; }
    a { color: "var(--primary)"; }
  }
}
```

### Import Global CSS

```sinth
page
import css "../styles/reset.css"
import css "../styles/theme.scss"
```

## CSS Modules Alternative

For CSS Modules-like behavior:

```sinth
component Button {
  style {
    $base: (
      padding: "0.5rem 1rem",
      borderRadius: "0.25rem",
      fontWeight: 500,
      transition: "all 0.2s"
    )
    
    .btn { @include $base; }
    .btn-primary { background: var(--primary); color: white; }
    .btn-secondary { background: var(--secondary); color: white; }
  }
}
```

## Style Inheritance

Child components don't inherit parent styles automatically:

```sinth
component Parent {
  style { .box { padding: "1rem"; } }
  Child { }  -- Doesn't get .box styles
}

component Child {
  style { .box { background: blue; } }  -- Own .box
}
```

Use CSS variables for cross-component theming.

## Best Practices

1. **Keep component-scoped** — Prevents style leakage
2. **Use variables** — Consistent spacing, colors
3. **Nest logically** — Max 3 levels deep
4. **Extract mixins** — Reusable patterns
5. **Global only for reset/base** — App-level styles

## Next Steps

- [Global Styles](/docs/styling/global-styles)
- [Theming](/docs/styling/theming)
- [Inline Styles](/docs/styling/inline-styles)