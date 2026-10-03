---
title: Expressions & Operators
description: Math, comparison, logical, and string operations.
---

Sinth expressions are familiar to JavaScript developers with a few syntax differences.

## Arithmetic Operators

```sinth
var num a = 10
var num b = 3

a + b -- 13 (addition)
a - b -- 7  (subtraction)
a * b -- 30 (multiplication)
a / b -- 3.333... (division)
a % b -- 1  (modulo/remainder)
```

### Compound Assignment

```sinth
var num x = 10
x += 5 -- 15
x -= 3 -- 12
x *= 2 -- 24
x /= 4 -- 6
x %= 5 -- 1
```

### Unary Operators

```sinth
var num x = 10
+x -- 10 (unary plus, no-op)
-x -- -10 (negation)

var bool flag = true
not flag -- false (logical NOT)
```

### Precedence

Same as JavaScript (highest to lowest):

1. `()` — Parentheses
2. `!` `not` `-` `+` — Unary
3. `*` `/` `%` — Multiplicative
4. `+` `-` — Additive
5. `<` `>` `<=` `>=` — Comparison
6. `==` `!=` — Equality
7. `and` — Logical AND
8. `or` — Logical OR
9. `? :` — Ternary
10. `=` `+=` `-=` — Assignment

```sinth
var num result = 2 + 3 * 4 -- 14 (not 20)
var num result = (2 + 3) * 4 -- 20
```

## Comparison Operators

```sinth
var num a = 10
var num b = 5

a == b -- false (equal)
a != b -- true  (not equal)
a > b -- true  (greater than)
a < b -- false (less than)
a >= b -- true  (greater or equal)
a <= b -- false (less or equal)
```

### Type-Safe Comparisons

Sinth enforces type compatibility:

```sinth
var num n = 5
var str s = "5"

n == 5 -- true
n == s -- ❌ Compile error: cannot compare num and str
```

## Logical Operators

```sinth
var bool a = true
var bool b = false

a and b -- false (AND)
a or b -- true  (OR)
not a -- false (NOT)
 -- Short-circuit evaluation
a and expensive() -- expensive() not called if a is false
a or cheap() -- cheap() not called if a is true
```

### Chaining

```sinth
var num age = 25
var bool hasLicense = true
var bool hasCar = false

var bool canDrive = age >= 18 and hasLicense and hasCar
```

## String Operations

### Concatenation

```sinth
var str first = "Hello"
var str last = "World"

first + " " + last -- "Hello World"
"User: " + first -- "User: Hello"
first + last + "!" -- "HelloWorld!"
```

### Template Strings (f-strings)

```sinth
var str name = "Sinth"
var str version = "5.0"

f"Welcome to {name} v{version}" -- "Welcome to Sinth v5.0"
 -- Expressions inside
f"2 + 2 = {2 + 2}" -- "2 + 2 = 4"
f"Items: {items.length}" -- "Items: 5"
```

### String Methods (via Native Functions)

```sinth
var str text = "  Hello World  "

text.trim() -- "Hello World"
text.toUpperCase() -- "  HELLO WORLD  "
text.toLowerCase() -- "  hello world  "
text.includes("World") -- true
text.startsWith("He") -- true
text.endsWith("ld") -- true
text.replace("World", "Sinth") -- "  Hello Sinth  "
text.split(" ") -- ["", "", "Hello", "World", "", ""]
```

## Ternary Operator

```sinth
var bool condition = true
var str result = condition ? "yes" : "no" -- "yes"
 -- Chained ternary
var num score = 85
var str grade = score >= 90 ? "A" :
                score >= 80 ? "B" :
                score >= 70 ? "C" : "F"
```

## Array Expressions

```sinth
var str[] items = ["a", "b", "c"]

items[0] -- "a" (access)
items.length -- 3 (length)
 -- Spread (via native)
var str[] more = ["d", "e"]
var str[] all = items.concat(more) -- ["a", "b", "c", "d", "e"]
```

## Object Expressions

```sinth
var obj user = {
  name: "Alice",
  age: 30
}

user.name -- "Alice" (dot notation)
user["name"] -- "Alice" (bracket notation)
user.age += 1 -- 31 (mutation)
```

## Nullish Coalescing

```sinth
var str? name = null
var str display = name ?? "Guest" -- "Guest"
 -- vs OR (which also catches empty string)
var str empty = ""
var str orResult = empty || "Guest" -- "Guest"
var str nullishResult = empty ?? "Guest" -- "" (empty string is not null/undefined)
```

## Optional Chaining

```sinth
var obj? user = null

user?.name -- undefined (not error)
user?.profile?.age -- undefined
user?.greet?.() -- undefined (safe call)
```

## Type Coercion

Explicit conversion:

```sinth
String(123) -- "123"
Number("456") -- 456
Boolean(1) -- true
Boolean("") -- false

parseInt("10px") -- 10
parseFloat("3.14") -- 3.14
```

## Expression Contexts

### In Attributes

```sinth
Input(value: name, placeholder: "Enter " + defaultName)
Button(disabled: !isValid || loading)
Div(class: "card " + (highlighted ? "active" : ""))
```

### In Children

```sinth
Paragraph { "Count: " + count }
Heading { user?.name ?? "Anonymous" }
```

### In Style Blocks

```sinth
style {
  .card {
    width: (300 + padding * 2) + "px"
    opacity: disabled ? 0.5 : 1
  }
}
```

## Native Function Calls

All native JS functions are available:

```sinth
Math.max(1, 5, 3) -- 5
Math.random() -- 0.0 - 1.0
JSON.stringify({a: 1}) -- '{"a":1}'
Date.now() -- timestamp
fetch("/api/data") -- Promise
```

See [Native Functions](/docs/native-functions/math) for complete list.

## Best Practices

1. **Use parentheses** for clarity: `(a + b) * c`
2. **Prefer `and`/`or`** over `&&`/`||` (Sinth keywords)
3. **Use ternary** for simple conditionals
4. **Avoid deep nesting** — extract to variables
5. **Type annotations** help catch errors early

```sinth -- Good
var num total = (price * quantity) * (1 + taxRate) -- Harder to read
var num total = price * quantity * 1 + taxRate
```

## Next Steps

- [Variables & Types](/docs/fundamentals/variables)
- [Control Flow](/docs/fundamentals/control-flow)
- [Native Functions Overview](/docs/native-functions/console)