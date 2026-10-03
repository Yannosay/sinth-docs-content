---
title: Computed Values
description: Derived state with expressions.
---

Computed values are reactive expressions that automatically update when their dependencies change.

## Basic Computed Values

```sinth
var num price = 100
var num quantity = 2
var num taxRate = 0.1

var num subtotal = price * quantity
var num tax = subtotal * taxRate
var num total = subtotal + tax

Paragraph { "Subtotal: $" + subtotal }
Paragraph { "Tax: $" + tax }
Paragraph { "Total: $" + total }
```

When `price` or `quantity` changes, all derived values update automatically.

## Computed in Functions

```sinth
function calculateTotal() -> num {
  return price * quantity * (1 + taxRate)
}

Paragraph { "Total: $" + calculateTotal() }
```

## Computed in Components

```sinth
component OrderSummary(items) {
  var num subtotal = 0
  for (item in items) {
    subtotal += item.price * item.qty
  }
  
  var num tax = subtotal * 0.1
  var num total = subtotal + tax
  
  Div {
    Paragraph { "Subtotal: $" + subtotal }
    Paragraph { "Tax: $" + tax }
    Paragraph { "Total: $" + total }
  }
}
```

## Filtering & Mapping

```sinth
var str[] allItems = ["apple", "banana", "cherry", "date"]
var str filter = ""

var str[] filteredItems = allItems.filter(item => item.includes(filter))

for (item in filteredItems) {
  ListItem { item }
}

Input(model: filter, placeholder: "Filter...")
```

## Sorting

```sinth
var obj[] users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 }
]

var str sortBy = "name"
var bool ascending = true

var obj[] sortedUsers = users
  .sort((a, b) => {
    var val = a[sortBy] > b[sortBy] ? 1 : -1
    return ascending ? val : -val
  })

for (user in sortedUsers) {
  ListItem { user.name + " (" + user.age + ")" }
}

Select(model: sortBy) {
  Option(value: "name") { "Name" }
  Option(value: "age") { "Age" }
}
Button(onClick: ascending = !ascending) { ascending ? "↑" : "↓" }
```

## Grouping

```sinth
var obj[] expenses = [
  { category: "Food", amount: 50 },
  { category: "Transport", amount: 30 },
  { category: "Food", amount: 20 }
]

var obj grouped = {}
for (expense in expenses) {
  if (!grouped[expense.category]) { grouped[expense.category] = 0 }
  grouped[expense.category] += expense.amount
}

for (category, total in grouped) {
  Paragraph { category + ": $" + total }
}
```

## Memoized Computed

```sinth
function expensiveTransform(str[] items) -> str[] {
  -- Heavy processing
  return items.map(item => item.toUpperCase())
}

var str[] processed = $expensiveTransform(rawItems)
```

## Lazy Computed

```sinth
component LazyList(items) {
  var bool showAll = false
  
  var num displayCount = showAll ? items.length : 10
  var str[] displayed = items.slice(0, displayCount)
  
  Div {
    for (item in displayed) { ListItem { item } }
    if (items.length > 10) {
      Button(onClick: showAll = !showAll) { 
        showAll ? "Show less" : "Show all (" + items.length + ")" 
      }
    }
  }
}
```

## Async Computed

```sinth
var obj user = null
var bool loading = false

async function loadUser(num id) {
  loading = true
  sinthRender()
  var response = await fetch("/api/users/" + id)
  user = await response.json()
  loading = false
  sinthRender()
}

if (loading) { Spinner() }
else if (user) { UserProfile(user: user) }
else { Button(onClick: loadUser(1)) { "Load User" } }
```

## Computed Properties Pattern

```sinth
component DataTable(data, sortKey = "name", sortDir = "asc") {
  var str currentSort = sortKey
  var str currentDir = sortDir
  
  var obj[] sortedData = data
    .sort((a, b) => {
      var val = a[currentSort] > b[currentSort] ? 1 : -1
      return currentDir == "asc" ? val : -val
    })
  
  function handleSort(str key) {
    if (currentSort == key) { currentDir = currentDir == "asc" ? "desc" : "asc" }
    else { currentSort = key; currentDir = "asc" }
  }
  
  Table {
    Thead {
      Tr {
        for (col in columns) {
          Th(onClick: handleSort(col.key)) { 
            col.label + (currentSort == col.key ? (currentDir == "asc" ? " ↑" : " ↓") : "")
          }
        }
      }
    }
    Tbody {
      for (row in sortedData) {
        Tr { for (col in columns) { Td { row[col.key] } } }
      }
    }
  }
}
```

## Best Practices

1. **Keep computed pure** — No side effects
2. **Use variables for intermediate** — Readable and debuggable
3. **Memoize expensive ops** — `$` prefix
4. **Derive don't duplicate** — Single source of truth
5. **Avoid async in computed** — Use async functions instead

## Next Steps

- [Reactive Variables](/docs/state-management/reactive-variables)
- [bind & model](/docs/state-management/bind-model)
- [Memoization](/docs/state-management/memoization)