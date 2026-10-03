---
title: Memoization
description: Optimize expensive computations with $ prefix.
---

Memoization caches function results to avoid recomputation on every render.

## The $ Prefix

```sinth
function fibonacci(num n) -> num {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

-- Without memoization: exponential time
Paragraph { "fib(30): " + fibonacci(30) }

-- With memoization: linear time
Paragraph { "fib(30): " + $fibonacci(30) }
```

## How It Works

1. First call with argument `x` computes and caches result
2. Subsequent calls with same `x` return cached value
3. Cache keyed by function name + arguments

## Supported Functions

```sinth
-- Pure functions (recommended)
$fibonacci(30)
$expensiveTransform(data)

-- Functions with multiple args
$calculateTotal(price, qty, tax)

-- Methods not supported
$obj.method()  -- ❌ No memoization for dotted calls
```

## When to Use

### Expensive Computations

```sinth
function renderChart(data) -> ui {
  -- Heavy D3.js/Canvas rendering
  return Canvas { ... }
}

-- Only re-renders when data changes
$renderChart(largeDataset)
```

### Recursive Functions

```sinth
function factorial(num n) -> num {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

$factorial(100)  -- Instant after first call
```

### Data Transformations

```sinth
function processLargeArray(num[] arr) -> obj[] {
  return arr
    .filter(x => x > 0)
    .map(x => ({ value: x, squared: x * x }))
    .sort((a, b) => b.squared - a.squared)
}

$processLargeArray(hugeArray)
```

## In Templates

```sinth
for (item in items) {
  Paragraph { $formatItem(item) }
}

function formatItem(obj item) -> str {
  return item.name.toUpperCase() + " - $" + item.price.toFixed(2)
}
```

## Limitations

### No Memoization For

```sinth
-- Dotted calls
$Math.max(a, b)  -- ❌
$obj.method()    -- ❌

-- Anonymous functions
var fn = (num x) -> num { return x * 2 }
$fn(5)  -- ❌

-- Functions with side effects
function logAndReturn(num x) -> num {
  console.log(x)
  return x
}
$logAndReturn(5)  -- ❌ Breaks memoization
```

### Cache Invalidation

Cache clears when:
- Page reloads
- Function definition changes
- Arguments change (new cache entry)

## Manual Cache Control

```sinth
script {
  -- Clear specific memo
  delete window._memo_fibonacci
  delete window._memo_fibonacci_done
  
  -- Clear all memos
  for (key in Object.keys(window)) {
    if (key.startsWith("_memo_")) delete window[key]
  }
}
```

## Best Practices

1. **Pure functions only** — Same input = same output
2. **Primitive arguments** — Objects/arrays compared by reference
3. **Avoid side effects** — Logging, DOM manipulation breaks memo
4. **Profile first** — Only memoize proven bottlenecks
5. **Document memoized functions** — Comment with `// @memoized`

## Performance Tips

```sinth
-- Good: Primitive args
$calculate(num, num, bool)

-- Avoid: Object args (reference comparison)
$process({ id: 1, name: "test" })

-- Better: Extract primitives
$process(item.id, item.name)
```

## Debugging Memoization

```sinth
script {
  -- Log memo hits/misses
  var originalMemo = window._memo_fibonacci
  window._memo_fibonacci = function(n) {
    var result = originalMemo(n)
    console.log("fib(" + n + ") = " + result + " (cached: " + (n in window._memo_fibonacci_cache) + ")")
    return result
  }
}
```

## Next Steps

- [Computed Values](/docs/state-management/computed)
- [Reactive Variables](/docs/state-management/reactive-variables)
- [Performance Tips](/docs/guides/performance)