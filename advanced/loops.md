---
title: List Rendering
description: for loops with key, index, and item variables.
---

Render lists efficiently with `for` loops and keys.

## Basic Loop

```sinth
var str[] fruits = ["apple", "banana", "cherry"]

for (fruit in fruits) {
  ListItem { fruit }
}
```

## With Index

```sinth
for (fruit, index in fruits) {
  ListItem { (index + 1) + ". " + fruit }
}
```

## With Key (Required for Dynamic Lists)

```sinth
var obj[] users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" }
]

for (user in users) key (user.id) {
  UserCard(user: user)
}
```

## Key Options

```sinth
-- Key from property
for (item in items) key (item.id) { ... }

-- Key from expression
for (user in users) key (user.email.toLowerCase()) { ... }

-- Key from index (avoid for dynamic lists)
for (item, index in items) key (index) { ... }
```

## Destructuring

```sinth
for (user in users) {
  -- user is the full object
  Paragraph { user.name }
}

for (user, index in users) {
  -- index available
  Paragraph { index + ": " + user.name }
}

for (user, index, key in users) key (user.id) {
  -- All three available
  Paragraph { key + " | " + index + " | " + user.name }
}
```

## Loop Variables Scope

```sinth
for (item in items) {
  var str local = item.name  -- New scope each iteration
  Paragraph { local }
}
-- local not accessible here
```

## Nested Loops

```sinth
var obj[] categories = [
  { name: "Fruits", items: ["apple", "banana"] },
  { name: "Veggies", items: ["carrot", "pea"] }
]

for (category in categories) {
  Heading(level: 3) { category.name }
  for (item in category.items) {
    ListItem { item }
  }
}
```

## Filtering in Loops

```sinth
var str[] allItems = ["apple", "banana", "cherry"]
var str filter = ""

for (item in allItems) if (item.includes(filter)) {
  ListItem { item }
}

Input(model: filter, placeholder: "Filter...")
```

## Conditional Rendering in Loops

```sinth
for (user in users) {
  if (user.active) {
    UserCard(user: user)
  }
}
```

## Mapping Before Loop

```sinth
var str[] raw = ["  apple  ", "BANANA", "  Cherry  "]

var str[] clean = raw.map(s => s.trim().toLowerCase())

for (item in clean) {
  ListItem { item }
}
```

## Sorting in Loops

```sinth
var obj[] users = [{ name: "Bob", age: 30 }, { name: "Alice", age: 25 }]

for (user in users.sort((a, b) => a.name > b.name ? 1 : -1)) {
  Paragraph { user.name }
}
```

## Loop Performance

### Keys Are Critical

```sinth
-- Good: Stable identity
for (user in users) key (user.id) { UserCard(user: user) }

-- Bad: Index changes on reorder
for (user, index in users) { UserCard(user: user) }
```

### Persist in Loops

```sinth
for (item in items) persist {
  Input(model: item.value)  -- Keeps focus/value on reorder
}
```

## Loop with Range

```sinth
-- Basic range
for (i in range(5)) { ListItem { i } }  -- 0,1,2,3,4

-- Start, end
for (i in range(1, 6)) { ListItem { i } }  -- 1,2,3,4,5

-- Step
for (i in range(0, 10, 2)) { ListItem { i } }  -- 0,2,4,6,8
```

## Loop in Components

```sinth
component UserList(users) {
  Ul {
    for (user in users) key (user.id) {
      Li {
        Strong { user.name }
        Span { user.email }
      }
    }
  }
}

-- Usage
UserList(users: users)
```

## Virtual Scrolling (Large Lists)

```sinth
component VirtualList(items, itemHeight = 50) {
  var num scrollTop = 0
  var num containerHeight = 400
  
  var num visibleCount = Math.ceil(containerHeight / itemHeight) + 1
  var num startIndex = Math.floor(scrollTop / itemHeight)
  var num endIndex = Math.min(startIndex + visibleCount, items.length)
  
  var num offsetY = startIndex * itemHeight
  
  Div(class: "virtual-list", style: { height: containerHeight + "px", overflow: "auto" }, onScroll: scrollTop = e.target.scrollTop) {
    Div(style: { height: items.length * itemHeight + "px", position: "relative" }) {
      Div(style: { transform: "translateY(" + offsetY + "px)" }) {
        for (i in range(startIndex, endIndex)) key (items[i].id) {
          Div(style: { height: itemHeight + "px", position: "absolute", top: (i * itemHeight) + "px", width: "100%" }) {
            ItemComponent(item: items[i])
          }
        }
      }
    }
  }
}
```

## Loop Best Practices

1. **Always use `key`** for dynamic lists
2. **Use `persist`** for inputs in loops
3. **Filter/map before** looping when possible
4. **Avoid side effects** in loop body
5. **Consider virtualization** for 100+ items

## Next Steps

- [Conditional Rendering](/docs/advanced/conditionals)
- [Event Handling](/docs/advanced/events)
- [Virtual Scrolling](/docs/guides/virtual-scrolling)