---
title: Structural Components
description: Main, Header, Footer, Section, Div, etc.
---

Structural components map directly to semantic HTML5 elements.

## Container Components

### Main

```sinth
Main {
  -- Page content
}
```

Renders: `<main>`

### Header

```sinth
Header {
  Nav { Link(href: "/") { "Home" } }
}
```

Renders: `<header>`

### Footer

```sinth
Footer {
  Paragraph { "© 2024 MyApp" }
}
```

Renders: `<footer>`

### Nav

```sinth
Nav {
  Link(href: "/") { "Home" }
  Link(href: "/about") { "About" }
}
```

Renders: `<nav>`

### Section

```sinth
Section {
  Heading(level: 2) { "Features" }
  Paragraph { "Content" }
}
```

Renders: `<section>`

### Article

```sinth
Article {
  Heading(level: 2) { "Blog Post" }
  Paragraph { "Content..." }
}
```

Renders: `<article>`

### Aside

```sinth
Aside {
  Paragraph { "Sidebar content" }
}
```

Renders: `<aside>`

## Generic Containers

### Div

```sinth
Div(class: "container") {
  Paragraph { "Content" }
}
```

Renders: `<div>`

### Span

```sinth
Span { "Inline text" }
```

Renders: `<span>`

## Layout Helpers

These are Divs with preset classes:

### Hero

```sinth
Hero {
  Heading(level: 1) { "Welcome" }
  Paragraph { "Subtitle" }
  Button { "Get Started" }
}
```

Renders: `<section class="hero">`

### Container

```sinth
Container {
  -- Max-width centered content
}
```

Renders: `<div class="container">`

### Grid

```sinth
Grid {
  Div { "Item 1" }
  Div { "Item 2" }
  Div { "Item 3" }
}
```

Renders: `<div class="grid">`

### Flex

```sinth
Flex {
  Div { "Left" }
  Div { "Center" }
  Div { "Right" }
}
```

Renders: `<div class="flex">`

### Stack

```sinth
Stack {
  Heading { "Title" }
  Paragraph { "Description" }
  Button { "Action" }
}
```

Renders: `<div class="stack">`

### Row

```sinth
Row {
  Col { "Left" }
  Col { "Right" }
}
```

Renders: `<div class="row">`

### Column / Col

```sinth
Column { "Column content" }
Col { "Short alias" }
```

Renders: `<div class="col">`

### CardGrid

```sinth
CardGrid {
  Card(title: "Card 1") { "Content" }
  Card(title: "Card 2") { "Content" }
}
```

Renders: `<div class="card-grid">`

## HTML5 Semantic Elements

All standard HTML5 elements are available as PascalCase components:

```sinth
Address { "Contact info" }
Blockquote { "Quote" }
Cite { "Citation" }
Code { "code()" }
Data(value: "123") { "Label" }
Dfn { "Definition" }
Del { "Deleted" }
Details { Summary { "Click" } Paragraph { "Details" } }
Dialog(open: true) { "Modal" }
Dl { Dt { "Term" } Dd { "Definition" } }
Figure { Figcaption { "Caption" } }
Kbd { "Ctrl+S" }
Mark { "Highlighted" }
Pre { Code { "const x = 1" } }
Q { "Inline quote" }
Samp { "Sample output" }
Small { "Small print" }
Strong { "Bold" }
Sub { "Subscript" }
Sup { "Superscript" }
Time(dateTime: "2024-01-01") { "Jan 1, 2024" }
Var { "variable" }
```

## Usage Examples

### Page Layout

```sinth
page
Main {
  Header {
    Nav {
      Link(href: "/", class: "logo") { "MyApp" }
      Div(class: "nav-links") {
        NavLink(href: "/") { "Home" }
        NavLink(href: "/about") { "About" }
      }
    }
  }
  
  Hero {
    Heading(level: 1) { "Welcome" }
    Button { "Start" }
  }
  
  Section {
    Heading(level: 2) { "Features" }
    Grid {
      Card(title: "Fast") { "Optimized runtime" }
      Card(title: "Simple") { "Clean syntax" }
      Card(title: "Typed") { "Static types" }
    }
  }
  
  Footer {
    Paragraph { "© 2024 MyApp" }
  }
}
```

### Article Page

```sinth
page
Article {
  Header {
    Heading(level: 1) { "Blog Post Title" }
    Div(class: "meta") {
      Time(dateTime: "2024-01-15") { "Jan 15, 2024" }
      Span { " · 5 min read" }
    }
  }
  
  Div(class: "content") {
    Paragraph { "First paragraph..." }
    Heading(level: 2) { "Section" }
    Paragraph { "More content..." }
    Blockquote { "A wise quote" }
  }
  
  Footer {
    Nav { "Tags" }
  }
}
```

## Styling Structural Components

All structural components accept inline style attributes:

```sinth
Main(style: { padding: "2rem", maxWidth: "1200px", margin: "0 auto" }) { ... }
Section(class: "hero", style: { background: "linear-gradient(...)" }) { ... }
Div(style: { display: "flex", gap: "1rem" }) { ... }
```

## Next Steps

- [Typography Components](/docs/builtins/typography)
- [Interactive Components](/docs/builtins/interactive)
- [Layout Components](/docs/builtins/layout)