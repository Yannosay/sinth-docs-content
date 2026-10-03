---
title: Functions
description: Write reusable logic with functions.
---

Functions in Sinth are pure logic units that can return any type. They're defined with `function` (lowercase) and can be called from anywhere.

## Basic Function

```sinth
function add(num a, num b) -> num {
  return a + b
} -- Usage
var num result = add(5, 3) -- 8
```

## Function Syntax

```sinth
function name(param1: type, param2: type = default) -> returnType { -- body
  return value
}
```

### Parameters

```sinth
function greet(
  str name, -- Required
  num age = 18, -- Optional with default
  bool formal = false -- Optional with default
) -> str {
  var str prefix = formal ? "Hello, " : "Hi, "
  return prefix + name + " (age " + age + ")"
}

greet("Alice") -- "Hi, Alice (age 18)"
greet("Bob", 25) -- "Hi, Bob (age 25)"
greet("Carol", 30, true) -- "Hello, Carol (age 30)"
```

### Return Types

```sinth
function getName() -> str { return "Sinth" }
function getAge() -> num { return 5 }
function isActive() -> bool { return true }
function getUser() -> obj { return { name: "Sinth" } }
function getTags() -> str[] { return ["web", "ui"] }
function nothing() -> void { console.log("done") }
function render() -> ui { return Div { "UI" } }
```

## Function Body

Functions can contain variables, conditionals, loops, and returns:

```sinth
function factorial(num n) -> num {
  if (n <= 1) {
    return 1
  }
  var num result = n * factorial(n - 1)
  return result
}

function fibonacci(num n) -> num {
  var num a = 0
  var num b = 1
  for (i in range(n)) { -- range is a native function
    var num temp = a
    a = b
    b = temp + b
  }
  return a
}
```

## Arrow Functions (Inline)

For simple functions, use arrow syntax:

```sinth
var fn = (num x) -> num { return x * 2 }
var result = fn(5) -- 10
```

## Recursion

Functions can call themselves:

```sinth
function fib(num n) -> num {
  if (n <= 1) return n
  return fib(n - 1) + fib(n - 2)
}

function sumArray(num[] arr, num index = 0) -> num {
  if (index >= arr.length) return 0
  return arr[index] + sumArray(arr, index + 1)
}
```

::: tip
Recursion depth is limited by JavaScript's call stack (~10,000). For deep recursion, use iterative approaches.
:::

## Closures

Functions capture their surrounding scope:

```sinth
function createCounter() -> (() -> num) {
  var num count = 0
  return () -> num {
    count += 1
    return count
  }
}

var counter = createCounter()
counter() -- 1
counter() -- 2
counter() -- 3
```

## Higher-Order Functions

Functions can accept and return functions:

```sinth
function map(str[] arr, (str) -> str fn) -> str[] {
  var str[] result = []
  for (item in arr) {
    result.push(fn(item))
  }
  return result
}

function upper(str s) -> str { return s.toUpperCase() }
var str[] names = ["alice", "bob"]
var str[] upperNames = map(names, upper) -- ["ALICE", "BOB"]
```

## Function vs Component

| Aspect | Function | Component |
|--------|----------|-----------|
| Keyword | `function` | `component` |
| Returns | Any type | UI only |
| Children | No | Yes (`$slot`) |
| Styles | No | Yes (`style { }`) |
| Scripts | No | Yes (`script { }`) |
| Naming | camelCase | PascalCase |

## Calling Functions

### From Expressions

```sinth
var num x = 10
var num y = add(x, 5) -- 15
 -- In templates
Paragraph { "Result: " + add(3, 4) }
```

### From Event Handlers

```sinth
function handleClick(num id) -> void {
  console.log("Button " + id + " clicked")
  analytics.track("click", { id })
}

Button(onClick: handleClick(42)) { "Click me" }
```

### From Script Blocks

```sinth
script {
  function formatPrice(num cents) -> str {
    return "$" + (cents / 100).toFixed(2)
  }
  
  var str price = formatPrice(1999) -- "$19.99"
}
```

## Async Functions

Sinth functions are synchronous. For async operations, use native JS in script blocks:

```sinth
script {
  async function fetchUser(num id) -> obj {
    var response = await fetch("/api/users/" + id)
    return await response.json()
  }
  
  function loadUser(num id) {
    fetchUser(id).then(user => {
      currentUser = user
      sinthRender()
    })
  }
}

var obj currentUser = null
Button(onClick: loadUser(1)) { "Load User" }
```

## Memoization

Memoize expensive function calls with `$` prefix:

```sinth
function expensive(num n) -> num { -- Simulate heavy computation
  var num result = 0
  for (i in range(1000000)) { result += n * i }
  return result
} -- Memoized call - only computes once per unique argument
var num cached = $expensive(42) -- In templates
Paragraph { "Result: " + $expensive(42) }
```

::: note
`$` prefix only works on direct function calls, not dotted calls like `$Math.max(a, b)`.
:::

## Type Safety

The compiler validates function calls:

```sinth
function divide(num a, num b) -> num {
  return a / b
}

divide(10, 2) -- OK
divide(10, "2") -- ❌ Error: expects num, got str
divide(10) -- ❌ Error: missing required parameter 'b'
```

## Function Overloading

Not directly supported. Use optional params or union types:

```sinth
function format(num value, str? format = null) -> str {
  if (format == "currency") return "$" + value.toFixed(2)
  if (format == "percent") return (value * 100) + "%"
  return String(value)
}
```

## Best Practices

1. **Pure functions** — No side effects, same input = same output
2. **Single responsibility** — One function, one job
3. **Descriptive names** — `calculateTax` not `calc`
4. **Type everything** — Parameters and return types
5. **Keep small** — < 20 lines ideal
6. **Document complex logic** — Comments for non-obvious algorithms

## Common Patterns

### Validation

```sinth
function validateEmail(str email) -> bool {
  return email.includes("@") && email.includes(".")
}

function validateRequired(str value, str fieldName) -> str? {
  if (!value || value.trim() == "") {
    return fieldName + " is required"
  }
  return null -- Valid
}
```

### Transformation

```sinth
function toCamelCase(str s) -> str {
  var str[] parts = s.split(/[-_\s]+/)
  var str result = parts[0].toLowerCase()
  for (i in range(1, parts.length)) {
    result += parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase()
  }
  return result
}
```

### Factory Functions

```sinth
function createValidator(str pattern) -> (str) -> bool {
  var reg = new RegExp(pattern)
  return (str value) -> bool { return reg.test(value) }
}

var validator = createValidator("^[a-z]+$")
validator("hello") -- true
validator("Hello") -- false
```

## Next Steps

- [Components](/docs/fundamentals/components)
- [Control Flow](/docs/fundamentals/control-flow)
- [Native Functions](/docs/native-functions/math)