---
title: Console & Debugging
description: log, error, warn, table, time, trace, etc.
---

Console functions for debugging and logging.

## Basic Logging

```sinth
console.log("Hello", variable, object)
console.info("Information")
console.warn("Warning message")
console.error("Error:", errorObject)
console.debug("Debug info")
```

## Formatted Output

```sinth
console.log("User: %s, Age: %d", name, age)
console.log("Object:", { key: "value" })
```

## Tabular Data

```sinth
var obj[] users = [
  { name: "Alice", age: 30, role: "admin" },
  { name: "Bob", age: 25, role: "user" }
]

console.table(users)
console.table(users, ["name", "role"])  -- Specific columns
```

## Timing

```sinth
console.time("operation")
-- ... code to measure ...
console.timeEnd("operation")

-- Named timers
console.time("fetch")
await fetch("/api/data")
console.timeEnd("fetch")
```

## Stack Traces

```sinth
function deepFunction() {
  console.trace("Call stack")
}

function level1() { level2() }
function level2() { level3() }
function level3() { deepFunction() }

level1()
```

## Grouping

```sinth
console.group("User Login")
console.log("Username:", username)
console.log("Timestamp:", Date.now())
console.groupEnd()

console.groupCollapsed("Details")  -- Collapsed by default
console.log("More info")
console.groupEnd()
```

## Counting

```sinth
function handleClick() {
  console.count("clicks")
  console.count("clicks:button-a")
}

-- Reset counter
console.countReset("clicks")
```

## Assertions

```sinth
console.assert(condition, "Error message if false")
console.assert(user.age >= 18, "User must be 18+", user)
```

## Clearing

```sinth
console.clear()
```

## In Script Blocks

```sinth
script {
  function debugUser(obj user) {
    console.group("User: " + user.name)
    console.log("ID:", user.id)
    console.log("Email:", user.email)
    console.log("Roles:", user.roles)
    console.table(user.permissions)
    console.groupEnd()
  }
  
  function measurePerformance(fn) {
    console.time("performance")
    var result = fn()
    console.timeEnd("performance")
    return result
  }
}
```

## Production vs Development

```sinth
script {
  var isDev = location.hostname == "localhost"
  
  function log(...args) {
    if (isDev) console.log(...args)
  }
  
  function warn(...args) {
    if (isDev) console.warn(...args)
  }
}
```

## Next Steps

- [Math Functions](/docs/native-functions/math)
- [JSON & Parsing](/docs/native-functions/json)
- [Timers](/docs/native-functions/timers)