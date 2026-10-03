---
title: Reactive Variables
description: Variables that trigger re-renders.
---

All `var` declarations in Sinth are reactive by default. Changing them automatically updates the UI.

## Basic Reactivity

```sinth
page
var num count = 0
var str name = "World"

Main {
  Heading { "Hello, " + name }
  Paragraph { "Count: " + count }
  Button(onClick: count += 1) { "Increment" }
  Input(model: name, placeholder: "Your name")
}
```

## How It Works

1. **Declaration** — `var num count = 0` creates a reactive variable
2. **Mutation** — `count += 1` triggers reactivity
3. **Render** — `sinthRender()` called automatically
4. **Update** — DOM updates with new values

## Triggering Updates

### Direct Assignment

```sinth
var num x = 10
x = 20              -- Triggers update
x += 5              -- Triggers update
x -= 3              -- Triggers update
x *= 2              -- Triggers update
x /= 4              -- Triggers update
```

### Object/Array Mutation

```sinth
var obj user = { name: "Alice", age: 30 }
var str[] items = ["a", "b"]

-- These DO NOT trigger updates automatically:
user.name = "Bob"          -- ❌ No reactivity
items.push("c")            -- ❌ No reactivity

-- Use native functions or reassignment:
user = { ...user, name: "Bob" }    -- ✅ Triggers update
items = items.concat(["c"])        -- ✅ Triggers update
```

## Computed Values

Derived state that updates automatically:

```sinth
var num price = 100
var num quantity = 2
var num taxRate = 0.1

var num subtotal = price * quantity
var num tax = subtotal * taxRate
var num total = subtotal + tax

-- All update when price or quantity changes
Paragraph { "Subtotal: $" + subtotal }
Paragraph { "Tax: $" + tax }
Paragraph { "Total: $" + total }
```

## Reactive Functions

Functions that return reactive values:

```sinth
function getTotal() -> num {
  return price * quantity * (1 + taxRate)
}

Paragraph { "Total: $" + getTotal() }
```

## Reactivity in Components

### Component Props

```sinth
component Counter(initial = 0) {
  var num count = initial  -- Local reactive state
  
  Div {
    Span { count }
    Button(onClick: count += 1) { "+" }
    Button(onClick: count -= 1) { "-" }
  }
}
```

### Lifting State

```sinth
page
var num count = 0

component CounterDisplay() {
  Paragraph { "Count: " + count }
}

component CounterControls() {
  Button(onClick: count += 1) { "+" }
  Button(onClick: count -= 1) { "-" }
}

Main {
  CounterDisplay()
  CounterControls()
}
```

## Arrays and Reactivity

```sinth
var str[] todos = []

function addTodo(str text) {
  if (text.trim()) {
    todos = todos.concat([text.trim()])  -- Reassignment triggers update
  }
}

function removeTodo(num index) {
  var str[] newTodos = []
  for (todo, i in todos) {
    if (i != index) { newTodos = newTodos.concat([todo]) }
  }
  todos = newTodos
}

Main {
  Input(model: newTodo, placeholder: "Add todo")
  Button(onClick: addTodo(newTodo); newTodo = "") { "Add" }
  
  for (todo, index in todos) key (todo) {
    Div(class: "todo-item") {
      Span { todo }
      Button(onClick: removeTodo(index)) { "×" }
    }
  }
}
```

## Objects and Reactivity

```sinth
var obj form = { name: "", email: "" }

function updateField(str field, str value) {
  form = { ...form, [field]: value }  -- Spread creates new object
}

Input(model: form.name, onInput: updateField("name", e.target.value))
Input(model: form.email, onInput: updateField("email", e.target.value))

Paragraph { "Name: " + form.name }
Paragraph { "Email: " + form.email }
```

## Batched Updates

Multiple changes in one event handler batch into single render:

```sinth
Button(onClick: 
  count += 1;
  name = "Updated";
  flag = !flag;
  sinthRender()  -- Optional, automatic
) { "Batch Update" }
```

## $ Prefix (Memoization)

```sinth
function expensive(num n) -> num {
  -- Heavy computation
  var num result = 0
  for (i in range(10000)) { result += n * i }
  return result
}

-- Memoized: only computes once per unique argument
Paragraph { "Result: " + $expensive(42) }

-- In loops
for (item in items) {
  Paragraph { $processItem(item) }
}
```

## When Reactivity Doesn't Work

```sinth
-- ❌ Direct property mutation
var obj user = { name: "Alice" }
user.name = "Bob"  -- No update

-- ✅ Reassign object
user = { ...user, name: "Bob" }

-- ❌ Array methods
var str[] items = ["a"]
items.push("b")  -- No update

-- ✅ Create new array
items = items.concat(["b"])
```

## Debugging Reactivity

```sinth
script {
  -- Log all renders
  var originalRender = sinthRender
  sinthRender = function() {
    console.log("Render triggered")
    originalRender()
  }
}
```

## Best Practices

1. **Reassign for objects/arrays** — Use spread/concat
2. **Keep state flat** — Avoid deep nesting
3. **Use computed values** — Derive don't duplicate
4. **Batch related changes** — Single event = single render
5. **Memoize expensive computations** — Use `$` prefix

## Next Steps

- [bind & model](/docs/state-management/bind-model)
- [Computed Values](/docs/state-management/computed)
- [Memoization](/docs/state-management/memoization)