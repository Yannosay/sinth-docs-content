---
title: Syntax Overview
description: Learn the core Sinth syntax.
---

Sinth is a declarative, component-based language that compiles to HTML, CSS, and JavaScript. It feels like writing HTML with superpowers.

## File Structure

Every `.sinth` file follows this pattern:

```sinth
page -- Required for pages (not components)

import "../components/Button" -- Import other .sinth files
import css "../styles/reset.css" -- Import CSS/SCSS
import js "./utils.js" -- Import JavaScript

title = "Page Title" -- Page metadata (optional)
descr = "SEO description"
fav   = "assets/favicon.ico"

var num count = 0 -- Variable declarations (optional)
var str name = "World"

Main { -- Root component (usually Main)
  Heading(level: 1) { "Hello" } -- Child components
  Paragraph { "Welcome, " + name }
  Button(onClick: count += 1) { "Clicked " + count + " times" }
}

style { -- Component-scoped styles (optional)
  main { padding: "2rem"; }
}

script { -- Inline JavaScript (optional)
  function greet() { alert("Hi!"); }
}
```

## Core Concepts

### 1. Everything is an Expression

Sinth has no statements — everything returns a value:

```sinth
var num result = 1 + 2 * 3 -- result = 7 (operator precedence)
var str greeting = "Hi " + name -- String concatenation
var bool isAdult = age >= 18 -- Comparison returns bool
```

### 2. Components are Functions

Components accept parameters and render children:

```sinth
component Card(title, color = "blue") {
  Div(class: "card", style: { backgroundColor: color }) {
    Heading(level: 3) { title }
    $slot -- Children passed to component
  }
} -- Usage:
Card(title: "Hello", color: "green") {
  Paragraph { "Card content" }
}
```

### 3. Reactive by Default

Variables declared with `var` are reactive. Changing them triggers a re-render:

```sinth
var num count = 0

Button(onClick: count += 1) { "Count: " + count } -- Clicking updates the button text automatically
```

### 4. Type Safety

Sinth has a static type system with inference:

```sinth
var num x = 10 -- Explicit type
var str y = "hello" -- Inferred from value
var bool z = true -- Type error at compile time:
var num bad = "not a number" -- ❌ Error!
```

## Basic Syntax Elements

### Comments

```sinth
-- Single line comment

--[
  Multi-line
  block comment
]--
```

### Variables

```sinth
var str name = "Sinth" -- String
var num age = 5 -- Number (int or float)
var int count = 10 -- Integer (deprecated, use num)
var bool active = true -- Boolean
var str[] tags = ["a", "b"] -- String array
var obj config = { -- Object
  key: "value",
  num: 42
}
var obj user = null -- Nullable (no initial value)
```

### Components

```sinth -- Built-in (capitalized)
Main { Heading { "Title" } } -- Custom (imported)
import "./MyComponent"
MyComponent(prop: value) { "children" } -- Self-closing (void elements)
Img(src: "image.png", alt: "Description")
Input(type: "text", placeholder: "Enter...")
```

### Attributes

```sinth -- Static values
Button(class: "primary", disabled: false) { "Click" } -- Dynamic values (expressions)
Button(onClick: count += 1) { "Count: " + count } -- Boolean shorthand
Input(required) { } -- required: true
Input(disabled: false) { } -- disabled: false
 -- Event handlers
Button(onClick: handler) { }
Input(onInput: value = e.target.value) { }
```

### Children

```sinth -- Text content
Paragraph { "Hello world" } -- Nested components
Div {
  Heading { "Title" }
  Paragraph { "Content" }
} -- Conditional children
if (show) {
  Paragraph { "Visible" }
} else {
  Paragraph { "Hidden" }
} -- Loops
for (item in items) {
  ListItem { item.name }
}
```

### Style Blocks

```sinth
style {
  .card {
    padding: "1rem"
    borderRadius: "0.5rem"
    &:hover { boxShadow: "0 4px 12px rgba(0,0,0,0.1)"; }
  }
  
  @media (max-width: 768px) {
    .card { padding: "0.5rem"; }
  }
}
```

### Script Blocks

```sinth
script {
  // Runs once on page load
  function init() {
    console.log("Page loaded!")
  }
  init()
}
```

## Complete Minimal Example

```sinth
page
var num count = 0

Main {
  Heading(level: 1) { "Counter" }
  Paragraph { "Count: " + count }
  Button(onClick: count += 1) { "Increment" }
}

style {
  main { padding: "2rem"; textAlign: "center"; }
  button { marginTop: "1rem"; padding: "0.5rem 1rem"; }
}
```

## Key Differences from HTML/JSX

| Feature | HTML/JSX | Sinth |
|---------|----------|-------|
| Variables | `useState` | `var` (reactive by default) |
| Events | `onClick={() => setCount(c+1)}` | `onClick: count += 1` |
| Conditionals | `{show && <p>Hi</p>}` | `if (show) { Paragraph { "Hi" } }` |
| Loops | `{items.map(i => <li>{i}</li>)}` | `for (i in items) { ListItem { i } }` |
| Styles | CSS modules, styled-components | Scoped `style { }` blocks |
| Types | TypeScript (separate) | Built-in static types |

## Next Steps

- [Variables & Types](/docs/fundamentals/variables)
- [Components](/docs/fundamentals/components)
- [Expressions & Operators](/docs/fundamentals/expressions)