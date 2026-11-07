---
title: "Functions"
description: "Typed functions, defaults and named arguments."
---

```sinth
function add(num a, num b) -> num {
  return a + b
}

function greet(str name, str greeting = "Hello") -> str {
  return greeting + ", " + name + "!"
}

async function loadUser(num id) -> obj {
  const res = await fetch("/api/users/" + id)
  return await res.json()
}
```

- Parameters may have types and defaults. Parameter syntax `name: type` also works.
- `-> type` declares the return type; returning the wrong type is an error.
- Calling with missing or too many arguments is a compile error (E0315 / E0314).
- Arguments can be named and given in any order: `greet(greeting: "Hi", name: "Ada")`.
- Function bodies support `var`, `const`, `if`/`elif`/`else`, `for ... in`, `while`, `return`, `break`, `continue`, and single-line `if cond return x`.

Functions can change page state:

```sinth
function addTodo() {
  if draft.trim() == "" { return }
  todos.push({ text: draft.trim(), done: false })
  draft = ""
}
```

## UI functions

A function returning `ui` renders markup and can be called inside markup:

```sinth
function badge(str label, str tone = "info") -> ui {
  Span(class: "badge " + tone) { label }
}

Main {
  badge("New")
  badge("Sale", tone: "danger")
}
```
