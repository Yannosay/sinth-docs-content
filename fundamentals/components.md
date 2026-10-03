---
title: Components
description: Create reusable UI components.
---

Components are the building blocks of Sinth applications. They encapsulate markup, logic, and styles into reusable units.

## Basic Component

```sinth
component Card(title, color = "blue") {
  Div(class: "card") {
    Heading(level: 3) { title }
    Div(class: "card-body") { $slot }
  }

  style {
    .card {
      backgroundColor: color
      borderRadius: "0.5rem"
      padding: "1rem"
      marginBottom: "1rem"
    }
    .card-body { marginTop: "0.5rem"; }
  }
}
```

**Usage:**

```sinth
import "./Card"

Card(title: "Hello", color: "green") {
  Paragraph { "This is the card content" }
}
```

## Component Parameters

Components accept parameters like functions:

```sinth
component Button(
  str label,
  str variant = "primary", -- Default value
  bool disabled = false,
  str? icon = null -- Optional (nullable)
) {
  Button(
    class: "btn btn-" + variant,
    disabled: disabled,
    onClick: handleClick
  ) {
    if (icon) { Span(class: "icon") { icon } }
    label
  }
}
```

### Parameter Types

| Type | Required | Example |
|------|----------|---------|
| `str name` | Yes | `Button("Click")` |
| `str name = "default"` | No (has default) | `Button()` |
| `str? name` | No (nullable) | `Button()` |

## Slots (`$slot`)

Pass children to components with `$slot`:

```sinth
component Modal(title, open, onClose) {
  if (open) {
    Div(class: "modal-overlay", onClick: onClose) {
      Div(class: "modal", onClick: (e) => e.stopPropagation()) {
        Heading(level: 3) { title }
        Div(class: "modal-body") { $slot }
        Button(onClick: onClose) { "Close" }
      }
    }
  }
} -- Usage:
var bool showModal = false
Modal(title: "Confirm", open: showModal, onClose: showModal = false) {
  Paragraph { "Are you sure?" }
  Button(onClick: confirm(); showModal = false) { "Yes" }
}
```

### Named Slots (Multiple Content Areas)

```sinth
component Layout {
  Div(class: "layout") {
    Header { $slot(name: "header") }
    Main { $slot }
    Footer { $slot(name: "footer") }
  }
}

Layout {
  slot(name: "header") { NavLink { "Home" } }
  Paragraph { "Main content" }
  slot(name: "footer") { "© 2024" }
}
```

## Component Styles

Styles in components are **scoped** — they only affect that component:

```sinth
component Alert(message, type = "info") {
  Div(class: "alert alert-" + type, role: "alert") {
    Paragraph { message }
  }

  style {
    .alert { padding: "1rem"; borderRadius: "0.25rem"; }
    .alert-info { background: "#d1ecf1"; color: "#0c5460"; }
    .alert-success { background: "#d4edda"; color: "#155724"; }
    .alert-warning { background: "#fff3cd"; color: "#856404"; }
    .alert-danger { background: "#f8d7da"; color: "#721c24"; }
  }
}
```

## Component Scripts

Add JavaScript logic with `script` blocks:

```sinth
component Counter(initial = 0) {
  var num count = initial

  Div(class: "counter") {
    Span { count }
    Button(onClick: count += 1) { "+" }
    Button(onClick: count -= 1) { "-" }
  }

  script {
    // Runs when component is first rendered
    console.log("Counter mounted with:", initial)
    
    // Access component variables
    function reset() { count = 0; sinthRender(); }
  }
}
```

## Importing Components

```sinth -- Relative import
import "../components/Button" -- Library import (from libraries/)
import "ui/Button" -- from libraries/ui/Button.sinth
 -- Alias to avoid conflicts
import "../components/Button" as PrimaryButton
```

## Component Composition

Compose components together:

```sinth
component InputGroup(label, model, type = "text", error = "") {
  Div(class: "input-group") {
    Label { label }
    Input(type: type, model: model)
    if (error) { Span(class: "error") { error } }
  }
}

component Form {
  var str email = ""
  var str password = ""

  Div(class: "form") {
    InputGroup(label: "Email", model: email, type: "email")
    InputGroup(label: "Password", model: password, type: "password")
    Button(onClick: submit()) { "Submit" }
  }
}
```

## Recursive Components

Components can reference themselves (with depth limit):

```sinth
component TreeNode(node) {
  Div(class: "tree-node") {
    Span { node.name }
    if (node.children && node.children.length > 0) {
      Div(class: "children") {
        for (child in node.children) {
          TreeNode(node: child)
        }
      }
    }
  }
}
```

::: warning
Recursive components have a max depth of 64 to prevent infinite loops.
:::

## Component Return Types

Functions that return UI use `-> ui`:

```sinth
function renderItem(str name) -> ui {
  return Div(class: "item") { Paragraph { name } }
}

component List(items) {
  Div {
    for (item in items) {
      renderItem(item.name)
    }
  }
}
```

## Best Practices

1. **Single Responsibility** — Each component does one thing well
2. **Use Defaults** — Provide sensible defaults for optional params
3. **Scope Styles** — Always use `style { }` blocks for component styles
4. **Name Clearly** — `UserCard` not `Card2`
5. **Document Props** — Use TypeScript-like comments for complex props

```sinth
component DataTable(
  /** Array of data objects */
  obj[] data,
  /** Column definitions: { key: "name", label: "Name" } */
  obj[] columns,
  /** Optional sort key */
  str? sortBy = null
) { ... }
```

## Component vs Function

| Feature | Component | Function |
|---------|-----------|----------|
| Returns | UI (elements) | Any type |
| Syntax | `component Name { }` | `function Name() -> type { }` |
| Children | `$slot` supported | No |
| Styles | `style { }` block | No |
| Scripts | `script { }` block | No |
| Naming | PascalCase | camelCase |

## Next Steps

- [Functions](/docs/fundamentals/functions)
- [Built-in Components](/docs/builtins/structural)
- [Slots & Composition](/docs/advanced/slots)