---
title: Variables & Types
description: Declare and use typed variables.
---

Sinth has a static type system with type inference. All variables are reactive by default — changing them triggers a UI update.

## Variable Declaration

```sinth
var str name = "Sinth" -- String
var num age = 5 -- Number (int or float)
var int count = 10 -- Integer (deprecated, use num)
var bool isActive = true -- Boolean
var str[] tags = ["web", "ui"] -- String array
var obj config = { -- Object
  theme: "dark",
  lang: "en"
}
var obj user = null -- Nullable (no initial value)
```

::: warning
`var int` is deprecated. Use `var num` instead. `int` will be removed in the next major version.
:::

## Type Inference

Types can be inferred from the initial value:

```sinth
var name = "Sinth" -- infers str
var age = 25 -- infers num
var isActive = true -- infers bool
var items = ["a", "b"] -- infers str[]
var config = { key: "val" } -- infers obj
```

Explicit types are required when:
- No initial value: `var str name;`
- Initial value is ambiguous: `var num x = 0` (could be int/num)

## Type System

| Type | Description | Values |
|------|-------------|--------|
| `str` | Text | `"hello"`, `'world'`, `` `template` `` |
| `num` | Number (float or int) | `42`, `3.14`, `-10`, `1e5` |
| `int` | Integer only (deprecated) | `42`, `-10` |
| `bool` | Boolean | `true`, `false` |
| `str[]` | Array of strings | `["a", "b"]` |
| `obj` | Object/Record | `{ key: "val" }`, `null` |
| `ui` | Component return type | Used in function signatures |

## Mutability

All `var` declarations are mutable:

```sinth
var num count = 0
count = 5 -- Reassignment
count += 1 -- Increment
count -= 2 -- Decrement
count *= 3 -- Multiply
count /= 2 -- Divide
```

## Reactive Updates

Changing a `var` automatically triggers `sinthRender()`:

```sinth
var num count = 0
var str message = "Start"

Button(onClick: count += 1; message = "Count: " + count) {
  message
} -- Clicking the button updates the paragraph text automatically
```

## Scoping

Variables declared at the top level are **page-scoped**:

```sinth
page
var num global = 1 -- Available everywhere in this page

component MyComp {
  var num local = 2 -- Only available inside this component
  Button { global } -- Can access page variables
}

Main { MyComp }
```

Variables inside functions are **function-scoped**:

```sinth
function calculate(num x) -> num {
  var num temp = x * 2 -- Local to this function
  return temp
}
```

## Arrays

```sinth
var str[] fruits = ["apple", "banana"]
var num[] numbers = [1, 2, 3] -- Note: only str[] is a distinct type
 -- Access
fruits[0] -- "apple"
fruits.length -- 2 (num)
 -- Array methods (via native functions)
fruits.push("orange") -- Via script block
fruits.pop()
```

## Objects

```sinth
var obj user = {
  name: "John",
  age: 30,
  active: true
} -- Access
user.name -- "John"
user["name"] -- "John" (bracket notation)
user.age += 1 -- 31
```

## Null Safety

Variables can be nullable:

```sinth
var str? name = null -- Explicit nullable (optional)
var str name -- Same - uninitialized vars are null
var obj user = null -- Safe access
user?.name -- undefined if user is null
```

## Constants

Use `const` in script blocks for true constants:

```sinth
script {
  const API_URL = "https://api.example.com"
  const MAX_RETRIES = 3
}
```

In Sinth code, use `var` with a convention:

```sinth
var str API_URL = "https://api.example.com" -- Treat as constant by convention
```

## Type Checking

The compiler validates types at build time:

```sinth
var num x = 10
x = "hello" -- ❌ Error: Cannot assign str to num

var bool flag = true
flag = 1 -- ❌ Error: Cannot assign num to bool

var str[] items = ["a"]
items = "not array" -- ❌ Error
```

## Function Parameter Types

```sinth
function greet(str name, num age = 18, bool formal = false) -> str {
  var str prefix = formal ? "Hello, " : "Hi, "
  return prefix + name + " (" + age + ")"
} -- Call with named or positional args
greet("Alice", 25, true)
greet(name: "Bob", formal: true)
```

## Return Types

```sinth
function add(num a, num b) -> num {
  return a + b
}

function log(str message) -> ui { -- Returns UI (component)
  return Paragraph { message }
}

function nothing() -> void { -- No return
  console.log("Done")
}
```

## Best Practices

1. **Use explicit types** for public APIs and component props
2. **Prefer `num` over `int`** — `int` is deprecated
3. **Initialize variables** when possible to enable inference
4. **Use descriptive names** — `userCount` not `uc`
5. **Group related variables** in objects:
   ```sinth
   var obj theme = { primary: "#007bff", secondary: "#6c757d" }
   ```

## Common Patterns

### Toggle Boolean

```sinth
var bool open = false
Button(onClick: open = !open) { open ? "Close" : "Open" }
```

### Counter

```sinth
var num count = 0
Button(onClick: count += 1) { "Count: " + count }
Button(onClick: count -= 1) { "-" }
Button(onClick: count = 0) { "Reset" }
```

### Form Binding

```sinth
var str email = ""
var str password = ""

Input(type: "email", model: email, placeholder: "Email")
Input(type: "password", model: password, placeholder: "Password")
Button(onClick: submit(email, password)) { "Login" }
```

### Computed Values

```sinth
var num price = 100
var num qty = 2
var num total = price * qty -- Reactive! Updates when price or qty changes
```

## Next Steps

- [Components](/docs/fundamentals/components)
- [Expressions & Operators](/docs/fundamentals/expressions)
- [Control Flow](/docs/fundamentals/control-flow)