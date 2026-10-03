---
title: Control Flow
description: Use if/else, for loops, and ternary expressions.
---

Sinth provides familiar control flow constructs with reactive integration.

## If / Else

```sinth
var bool show = true
var num score = 85

if (show) {
  Paragraph { "Visible!" }
}

if (score >= 90) {
  Paragraph { "Grade: A" }
} else if (score >= 80) {
  Paragraph { "Grade: B" }
} else if (score >= 70) {
  Paragraph { "Grade: C" }
} else {
  Paragraph { "Grade: F" }
}
```

### Inline If (Ternary)

```sinth
var bool isLoggedIn = true

Paragraph { isLoggedIn ? "Welcome back!" : "Please log in" } -- Nested ternary
var str status = score >= 90 ? "Excellent" : 
                 score >= 70 ? "Good" : 
                 "Needs improvement"
```

### If in Component Body

```sinth
component UserProfile(user) {
  Div(class: "profile") {
    if (user) {
      Heading { user.name }
      Paragraph { user.email }
      if (user.isAdmin) {
        Span(class: "badge") { "Admin" }
      }
    } else {
      Paragraph { "Please log in" }
      Button(onClick: login()) { "Login" }
    }
  }
}
```

### Persist Option

Keep DOM nodes when conditionally hidden (preserves state):

```sinth
var bool showDetails = false

if (showDetails) persist {
  Div(class: "details") {
    Input(model: details) -- Keeps input value when toggled
  }
}

Button(onClick: showDetails = !showDetails) { 
  showDetails ? "Hide" : "Show" 
}
```

## For Loops

```sinth
var str[] fruits = ["apple", "banana", "cherry"]

for (fruit in fruits) {
  ListItem { fruit }
} -- With index
for (fruit, index in fruits) {
  ListItem { (index + 1) + ". " + fruit }
} -- With key (for efficient updates)
for (fruit, index in fruits) key (fruit) {
  ListItem { fruit }
} -- Key from object property
var obj[] users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" }
]

for (user in users) key (user.id) {
  Div { user.name }
}
```

### Loop Variables

Inside loops, these are available:

| Variable | Description |
|----------|-------------|
| `item` | Current item (custom name) |
| `index` | Zero-based index (if declared) |
| `key` | Key value (if declared) |

```sinth
for (user, index, key in users) key (user.id) { -- user = current object
  -- index = 0, 1, 2... -- key = user.id
  Div { key + ": " + user.name + " (#" + index + ")" }
}
```

### Loop Over Numbers

```sinth -- Range function (native)
for (i in range(5)) { -- 0, 1, 2, 3, 4
  ListItem { i }
}

for (i in range(1, 6)) { -- 1, 2, 3, 4, 5
  ListItem { i }
}

for (i in range(0, 10, 2)) { -- 0, 2, 4, 6, 8
  ListItem { i }
}
```

### Nested Loops

```sinth
var obj[] categories = [
  { name: "Fruits", items: ["apple", "banana"] },
  { name: "Vegetables", items: ["carrot", "pea"] }
]

for (category in categories) {
  Heading(level: 3) { category.name }
  for (item in category.items) {
    ListItem { item }
  }
}
```

### Loop with Conditions

```sinth
var str[] items = ["a", "b", "c", "d", "e"] -- Filter in loop
for (item in items) if (item != "c") {
  ListItem { item }
} -- Break/continue not available — use if inside loop
for (item in items) {
  if (item == "c") { continue } -- Not valid Sinth
  -- Instead:
  if (item != "c") {
    ListItem { item }
  }
}
```

## Switch (via if/else chain)

```sinth
var str action = "save"

if (action == "save") {
  Paragraph { "Saving..." }
} else if (action == "delete") {
  Paragraph { "Deleting..." }
} else if (action == "cancel") {
  Paragraph { "Cancelled" }
} else {
  Paragraph { "Unknown action" }
}
```

## Early Returns in Functions

```sinth
function process(str input) -> str {
  if (!input) return "empty"
  if (input.length > 100) return "too long"
  
  var str result = input.trim().toLowerCase()
  return result
}
```

## Conditional Rendering Patterns

### Show/Hide with Boolean

```sinth
var bool show = true

Button(onClick: show = !show) { show ? "Hide" : "Show" }
if (show) { Paragraph { "Content" } }
```

### Loading States

```sinth
var bool loading = false
var obj data = null

Button(onClick: load()) { loading ? "Loading..." : "Load" }

if (loading) {
  Spinner()
} else if (data) {
  UserCard(user: data)
} else {
  Button(onClick: load()) { "Load Data" }
}
```

### Error Boundaries

```sinth
var str error = null
var obj data = null

if (error) {
  Div(class: "error") {
    Paragraph { "Error: " + error }
    Button(onClick: error = null; retry()) { "Retry" }
  }
} else if (data) {
  Content(data: data)
} else {
  Button(onClick: load()) { "Load" }
}
```

## Loop Performance

### Keys Are Important

Always use `key` for dynamic lists:

```sinth -- Good - stable identity
for (item in items) key (item.id) {
  ItemComponent(item: item)
} -- Bad - uses index (breaks on reorder)
for (item, index in items) {
  ItemComponent(item: item)
}
```

### Persist in Loops

```sinth
for (item in items) persist {
  Input(model: item.value) -- Keeps focus/value on reorder
}
```

## Control Flow in Scripts

```sinth
script {
  function processItems(str[] items) -> num {
    var num count = 0
    for (item in items) {
      if (item.startsWith("priority:")) {
        count += 2
      } else {
        count += 1
      }
    }
    return count
  }
}
```

## Best Practices

1. **Use `key`** — Always provide stable keys for dynamic lists
2. **Prefer `persist`** — For inputs and stateful components in conditionals
3. **Avoid deep nesting** — Extract to components
4. **Use ternary for simple cases** — `condition ? a : b` for inline
5. **Filter before looping** — Create filtered array first if needed

```sinth -- Instead of if inside loop
var str[] activeUsers = users.filter(u => u.active)
for (user in activeUsers) { UserCard(user: user) }
```

## Next Steps

- [Expressions & Operators](/docs/fundamentals/expressions)
- [State Management](/docs/state-management/reactive-variables)
- [List Rendering](/docs/advanced/loops)