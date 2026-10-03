---
title: JSON & Parsing
description: JSON.stringify, JSON.parse, parseInt, parseFloat.
---

JSON serialization and parsing utilities.

## JSON.stringify

```sinth
var obj user = { name: "Alice", age: 30, active: true }

JSON.stringify(user)                    -- '{"name":"Alice","age":30,"active":true}'
JSON.stringify(user, null, 2)           -- Pretty printed
JSON.stringify(user, ["name", "age"])   -- Only include name, age

-- Custom replacer
JSON.stringify(user, (key, value) => {
  if (key == "age") return value + " years"
  return value
})
```

## JSON.parse

```sinth
var str json = '{"name":"Bob","age":25}'

var obj parsed = JSON.parse(json)
parsed.name  -- "Bob"
parsed.age   -- 25

-- With reviver
JSON.parse(json, (key, value) => {
  if (key == "age") return value + 1
  return value
})
```

## Error Handling

```sinth
function safeParse(str json) -> obj? {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.error("Parse error:", e)
    return null
  }
}

var obj data = safeParse(userInput) ?? { default: true }
```

## parseInt

```sinth
parseInt("42")           -- 42
parseInt("  42  ")       -- 42
parseInt("42px")         -- 42
parseInt("3.14")         -- 42 (stops at decimal)

parseInt("1010", 2)      -- 10 (binary)
parseInt("FF", 16)       -- 255 (hex)
parseInt("10", 8)        -- 8 (octal)

parseInt("abc", 10)      -- NaN
```

## parseFloat

```sinth
parseFloat("3.14")       -- 3.14
parseFloat("3.14px")     -- 3.14
parseFloat("  3.14  ")   -- 3.14
parseFloat(".5")         -- 0.5
parseFloat("3.")         -- 3

parseFloat("abc")        -- NaN
```

## Number Conversion

```sinth
Number("42")       -- 42
Number("3.14")     -- 3.14
Number("42px")     -- NaN (strict)
Number(true)       -- 1
Number(false)      -- 0
Number(null)       -- 0
Number("")         -- 0
```

## isNaN & isFinite

```sinth
isNaN(NaN)         -- true
isNaN("hello")     -- true
isNaN(42)          -- false
isNaN("42")        -- false (coerced)

isFinite(42)       -- true
isFinite(Infinity) -- false
isFinite(NaN)      -- false
isFinite("42")     -- true (coerced)
```

## Type Conversion

```sinth
String(42)         -- "42"
String(true)       -- "true"
String(null)       -- "null"
String(undefined)  -- "undefined"

Boolean(1)         -- true
Boolean(0)         -- false
Boolean("")        -- false
Boolean("false")   -- true (non-empty string)
Boolean(null)      -- false
```

## Practical Examples

### Form Serialization

```sinth
function formToJSON(formData) -> str {
  var obj data = {}
  for (key in formData.keys()) {
    data[key] = formData.get(key)
  }
  return JSON.stringify(data)
}
```

### Deep Clone

```sinth
function deepClone(obj data) -> obj {
  return JSON.parse(JSON.stringify(data))
}

var obj original = { nested: { value: 42 } }
var obj copy = deepClone(original)
copy.nested.value = 100
original.nested.value  -- 42 (unchanged)
```

### Merge Objects

```sinth
function merge(obj target, obj source) -> obj {
  return JSON.parse(JSON.stringify({ ...target, ...source }))
}
```

### Date Handling

```sinth
var obj event = { 
  name: "Meeting", 
  date: new Date("2024-01-15T10:00:00") 
}

var str json = JSON.stringify(event)
// {"name":"Meeting","date":"2024-01-15T10:00:00.000Z"}

var obj parsed = JSON.parse(json)
parsed.date  -- String! Not Date object

-- Reviver for dates
var obj revived = JSON.parse(json, (key, value) => {
  if (key == "date" && typeof value == "string") {
    return new Date(value)
  }
  return value
})
```

## Best Practices

1. **Always handle parse errors** — User input is unreliable
2. **Use replacer for sensitive data** — Strip passwords, tokens
3. **Pretty print for debugging** — `JSON.stringify(obj, null, 2)`
4. **Revive dates** — JSON doesn't preserve Date objects

## Next Steps

- [Timers](/docs/native-functions/timers)
- [Storage](/docs/native-functions/storage)
- [Date & Time](/docs/native-functions/date)