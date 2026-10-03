---
title: Slots & Composition
description: Pass children to components with $slot.
---

Slots enable flexible component composition by allowing parent content to be injected into specific places.

## Basic Slot

```sinth
component Card(title) {
  Div(class: "card") {
    Heading(level: 3) { title }
    Div(class: "card-body") { $slot }
  }
}

-- Usage
Card(title: "Welcome") {
  Paragraph { "This content goes into the slot" }
  Button { "Action" }
}
```

## Named Slots

```sinth
component Layout {
  Div(class: "layout") {
    Header { $slot(name: "header") }
    Main { $slot }
    Footer { $slot(name: "footer") }
  }
}

Layout {
  slot(name: "header") { Nav { "Navigation" } }
  Paragraph { "Main content" }
  slot(name: "footer") { "© 2024" }
}
```

## Slot Fallbacks

```sinth
component Modal(title) {
  Div(class: "modal") {
    Heading(level: 3) { $slot(name: "title", fallback: title) }
    Div(class: "body") { $slot }
    Div(class: "footer") { $slot(name: "actions") }
  }
}

Modal(title: "Default Title") {
  Paragraph { "Body content" }
  slot(name: "actions") {
    Button { "Cancel" }
    Button { "Confirm" }
  }
}
```

## Multiple Slots

```sinth
component DataTable(columns, data) {
  Table {
    Thead {
      Tr {
        for (col in columns) {
          Th(onClick: sort(col.key)) { 
            col.label + $slot(name: "sort-" + col.key) 
          }
        }
      }
    }
    Tbody {
      for (row in data) {
        Tr {
          for (col in columns) {
            Td { $slot(name: "cell-" + col.key, fallback: row[col.key]) }
          }
        }
      }
    }
  }
}

DataTable(
  columns: [{ key: "name", label: "Name" }, { key: "age", label: "Age" }],
  data: users
) {
  slot(name: "sort-name") { " ↑" }
  slot(name: "cell-age", fallback: row.age) { 
    Strong { row.age } 
  }
}
```

## Conditional Slots

```sinth
component FormField(label, required = false, error = "") {
  Div(class: "field") {
    Label { 
      label + if (required) { $slot(name: "required", fallback: "*") }
    }
    $slot
    if (error) { 
      Span(class: "error") { $slot(name: "error", fallback: error) }
    }
  }
}

FormField(label: "Email", required: true, error: "Invalid") {
  Input(type: "email", model: email)
  slot(name: "error") { "Please enter a valid email" }
}
```

## Slot in Loops

```sinth
component List(items, renderItem) {
  Ul {
    for (item, index in items) {
      Li { $slot(name: "item", fallback: renderItem(item, index)) }
    }
  }
}

List(items: users, renderItem: (u) => u.name) {
  slot(name: "item", fallback: renderItem(user, index)) {
    Div(class: "user-card") {
      Img(src: user.avatar)
      Strong { user.name }
      Span { user.email }
    }
  }
}
```

## Slot Props (Advanced)

```sinth
component SelectableList(items) {
  var str selected = ""
  
  Ul {
    for (item in items) {
      Li(
        class: selected == item.id ? "selected" : "",
        onClick: selected = item.id
      ) { 
        $slot(name: "item", props: { item, selected: selected == item.id, select: () => selected = item.id })
      }
    }
  }
}

SelectableList(items: users) {
  slot(name: "item", props: { item, selected, select }) {
    Div(class: selected ? "selected" : "") {
      Strong { item.name }
      if (selected) { Span { "✓" } }
    }
  }
}
```

## Default Slot Content

```sinth
component Button(variant = "primary") {
  Button(class: "btn btn-" + variant) { 
    $slot(fallback: "Button") 
  }
}

Button { "Custom" }
Button(variant: "secondary")  -- Renders "Button"
```

## Slot with Data

```sinth
component DataProvider(source) {
  var obj data = null
  var bool loading = true
  
  script {
    async function load() {
      loading = true
      sinthRender()
      data = await fetch(source).then(r => r.json())
      loading = false
      sinthRender()
    }
    load()
  }
  
  if (loading) { $slot(name: "loading", fallback: "Loading...") }
  else if (data) { $slot(props: { data }) }
  else { $slot(name: "empty", fallback: "No data") }
}

DataProvider(source: "/api/users") {
  slot(props: { data }) {
    for (user in data) { UserCard(user: user) }
  }
  slot(name: "loading") { Spinner() }
  slot(name: "empty") { "No users found" }
}
```

## Best Practices

1. **Always provide fallbacks** — Graceful degradation
2. **Document slot names** — In component comments
3. **Use named slots** — For complex layouts
4. **Keep slots focused** — One purpose per slot
5. **Combine with props** — For dynamic content

## Next Steps

- [Custom Elements](/docs/advanced/custom-elements)
- [Component Composition](/docs/fundamentals/components)
- [Event Handling](/docs/advanced/events)