---
title: Layout Components
description: Flex, Grid, Stack, Container, etc.
---

Layout components provide pre-styled containers for common layout patterns using CSS Flexbox and Grid.

## Flex

```sinth
Flex {
  Div { "Left" }
  Div { "Center" }
  Div { "Right" }
}

Flex(direction: "column", align: "center", gap: "1rem") {
  Heading { "Title" }
  Paragraph { "Description" }
  Button { "Action" }
}
```

**Attributes:**
- `direction`: `"row"` | `"column"` | `"row-reverse"` | `"column-reverse"`
- `align`: `"stretch"` | `"center"` | `"flex-start"` | `"flex-end"` | `"baseline"`
- `justify`: `"flex-start"` | `"center"` | `"flex-end"` | `"space-between"` | `"space-around"` | `"space-evenly"`
- `wrap`: `"nowrap"` | `"wrap"` | `"wrap-reverse"`
- `gap`: Spacing between items (e.g., `"1rem"`, `"16px"`)

Renders: `<div class="flex">`

## Grid

```sinth
Grid {
  Div { "1" }
  Div { "2" }
  Div { "3" }
  Div { "4" }
}

Grid(columns: "repeat(3, 1fr)", gap: "1rem") {
  Card { "One" }
  Card { "Two" }
  Card { "Three" }
}

Grid(template: "header header / sidebar main main / footer footer") {
  Header(slot: "header") { "Header" }
  Aside(slot: "sidebar") { "Sidebar" }
  Main(slot: "main") { "Content" }
  Footer(slot: "footer") { "Footer" }
}
```

**Attributes:**
- `columns`: Grid template columns (e.g., `"repeat(3, 1fr)"`, `"1fr 2fr"`)
- `rows`: Grid template rows
- `template`: Grid template areas
- `gap`: Gap between cells
- `align`, `justify`: Alignment

Renders: `<div class="grid">`

## Stack

```sinth
Stack {
  Heading { "Title" }
  Paragraph { "Description" }
  Button { "Action" }
}

Stack(direction: "horizontal", gap: "1rem", align: "center") {
  Logo { "Brand" }
  Nav { "Links" }
  Button { "Login" }
}
```

**Attributes:**
- `direction`: `"vertical"` | `"horizontal"`
- `gap`: Spacing
- `align`: `"stretch"` | `"center"` | `"start"` | `"end"`

Renders: `<div class="stack">`

## Container

```sinth
Container {
  -- Max-width centered content
}

Container(size: "lg") { -- Large: 1200px }
Container(size: "md") { -- Medium: 960px }
Container(size: "sm") { -- Small: 720px }
Container(fluid: true) { -- Full width }
```

**Attributes:**
- `size`: `"sm"` | `"md"` | `"lg"` | `"xl"` | `"fluid"`
- `fluid`: Boolean (full width)

Renders: `<div class="container">` or `<div class="container-fluid">`

## Row & Column

```sinth
Row {
  Col(size: 6) { "Half" }
  Col(size: 6) { "Half" }
}

Row(gap: "1rem") {
  Col(size: 4) { "Third" }
  Col(size: 4) { "Third" }
  Col(size: 4) { "Third" }
}

Col(size: 12) { "Full width" }
Col(size: 6, offset: 3) { "Centered half" }
Col(xs: 12, md: 6, lg: 4) { "Responsive" }
```

**Attributes:**
- `size`: Column width (1-12)
- `offset`: Left margin (1-11)
- `xs`, `sm`, `md`, `lg`, `xl`: Responsive sizes

Renders: `<div class="row">` / `<div class="col">`

## CardGrid

```sinth
CardGrid {
  Card(title: "Card 1") { "Content" }
  Card(title: "Card 2") { "Content" }
  Card(title: "Card 3") { "Content" }
  Card(title: "Card 4") { "Content" }
}

CardGrid(columns: 3, gap: "1.5rem") {
  for (item in items) {
    Card(title: item.title) { item.content }
  }
}
```

**Attributes:**
- `columns`: Number of columns (or CSS grid value)
- `gap`: Spacing between cards

Renders: `<div class="card-grid">`

## Responsive Breakpoints

All layout components support responsive props:

```sinth
Flex(
  direction: { xs: "column", md: "row" },
  gap: { xs: "0.5rem", lg: "2rem" }
) { ... }

Grid(
  columns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
  gap: { xs: "1rem", lg: "2rem" }
) { ... }

Container(
  size: { xs: "fluid", md: "md", lg: "lg" }
) { ... }
```

## Layout Examples

### Holy Grail Layout

```sinth
page
Main(style: { minHeight: "100vh", display: "flex", flexDirection: "column" }) {
  Header(style: { padding: "1rem", background: "#fff", borderBottom: "1px solid #eee" }) {
    Container { Nav { Link(href: "/") { "Logo" } } }
  }
  
  Div(style: { flex: 1, display: "flex" }) {
    Aside(style: { width: "250px", padding: "1rem", background: "#f8f9fa" }) {
      Nav(class: "sidebar") { "Sidebar" }
    }
    
    Main(style: { flex: 1, padding: "2rem" }) {
      Container { "Main content" }
    }
  }
  
  Footer(style: { padding: "1rem", background: "#fff", borderTop: "1px solid #eee" }) {
    Container { Paragraph { "© 2024" } }
  }
}
```

### Dashboard Layout

```sinth
Grid(
  template: "sidebar header / sidebar main",
  columns: "250px 1fr",
  rows: "auto 1fr",
  style: { minHeight: "100vh" }
) {
  Aside(slot: "sidebar", style: { padding: "1rem", background: "#1a1a2e", color: "white" }) {
    Nav(class: "sidebar-nav") { "Navigation" }
  }
  
  Header(slot: "header", style: { padding: "1rem", background: "#fff", borderBottom: "1px solid #eee" }) {
    Container { "Header content" }
  }
  
  Main(slot: "main", style: { padding: "2rem" }) {
    Container { "Dashboard content" }
  }
}
```

### Card Grid Layout

```sinth
Grid(
  columns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" },
  gap: "1.5rem"
) {
  for (product in products) {
    Card(title: product.name) {
      Img(src: product.image, alt: product.name)
      Paragraph { product.description }
      Button(onClick: addToCart(product)) { "Add to Cart" }
    }
  }
}
```

### Form Layout

```sinth
Stack(gap: "1.5rem") {
  Row {
    Col(size: 6) { Input(placeholder: "First Name", model: firstName) }
    Col(size: 6) { Input(placeholder: "Last Name", model: lastName) }
  }
  
  Row {
    Col(size: 12) { Input(placeholder: "Email", model: email, type: "email") }
  }
  
  Row {
    Col(size: 6) { Input(placeholder: "City", model: city) }
    Col(size: 4) { Select(model: state) { Option { "State" } } }
    Col(size: 2) { Input(placeholder: "ZIP", model: zip) }
  }
}
```

## Utility Classes

Use inline styles for custom layouts:

```sinth
Div(style: {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem",
  maxWidth: "800px",
  margin: "0 auto"
}) { ... }

Div(style: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "1.5rem"
}) { ... }
```

## Next Steps

- [Form Components](/docs/builtins/forms)
- [Styling](/docs/styling/inline-styles)
- [Responsive Design](/docs/guides/responsive)