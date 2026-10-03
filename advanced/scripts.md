---
title: Script Blocks
description: Write inline JavaScript for complex logic.
---

Script blocks let you write JavaScript for complex logic that can't be expressed in Sinth expressions.

## Basic Script Block

```sinth
page
var num count = 0

Main {
  Paragraph { "Count: " + count }
  Button(onClick: count += 1) { "Increment" }
}

script {
  console.log("Page loaded")
  
  function increment() {
    count += 1
    sinthRender()
  }
}
```

## Script Scope

Scripts run in the global scope (or component scope):

```sinth
component Counter() {
  var num count = 0
  
  Div {
    Paragraph { count }
    Button(onClick: count += 1) { "+" }
  }
  
  script {
    -- Component scope
    function reset() {
      count = 0
      sinthRender()
    }
  }
}

-- Page script: global scope
script {
  function globalHelper() { ... }
}
```

## Common Patterns

### API Calls

```sinth
script {
  async function fetchUsers() {
    loading = true
    sinthRender()
    
    try {
      var response = await fetch("/api/users")
      users = await response.json()
    } catch (e) {
      error = e.message
    }
    
    loading = false
    sinthRender()
  }
  
  fetchUsers()
}
```

### Event Handlers

```sinth
script {
  function handleResize() {
    windowWidth = window.innerWidth
    isMobile = windowWidth < 768
    sinthRender()
  }
  
  window.addEventListener("resize", handleResize)
  
  -- Cleanup
  window.removeEventListener("resize", handleResize)
}
```

### Timers

```sinth
script {
  function startPolling() {
    intervalId = setInterval(() => {
      checkNotifications()
      sinthRender()
    }, 30000)
  }
  
  function stopPolling() {
    clearInterval(intervalId)
  }
}
```

### Third-party Libraries

```sinth
script {
  -- Initialize chart
  var chart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: { responsive: true }
  })
  
  function updateChart(newData) {
    chart.data = newData
    chart.update()
  }
}
```

## Script Attributes

```sinth
script defer { ... }          -- Defer execution
script async { ... }          -- Async execution
script module { ... }         -- ES module
script nomodule { ... }       -- Fallback for older browsers
```

## Interop with Sinth

### Access Variables

```sinth
page
var num count = 0

script {
  function getCount() { return count }
  function setCount(n) { count = n; sinthRender() }
}
```

### Call Functions

```sinth
function sinthHandler() {
  count += 1
  sinthRender()
}

Button(onClick: sinthHandler) { "Click" }
```

### DOM Access

```sinth
script {
  function focusInput() {
    document.getElementById("myInput").focus()
  }
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}
```

## Best Practices

1. **Keep logic in Sinth when possible** — Use expressions, functions
2. **Use scripts for** — API calls, timers, third-party libs, DOM APIs
3. **Call `sinthRender()`** after mutating variables
4. **Clean up** — Remove listeners, clear timers
5. **Use `defer`** for non-critical scripts

## Script Execution Order

1. Component scripts (in definition order)
2. Page script
3. All scripts wrapped in IIFE for isolation

## Security

Scripts run in page context with full DOM access. Only trust your own scripts.

```sinth
-- Safe: Your own code
script { console.log("Safe") }

-- Unsafe: User input (don't do this)
script { eval(userInput) }  -- NEVER!
```

## Next Steps

- [Event Handling](/docs/advanced/events)
- [API Integration](/docs/guides/api-integration)
- [Third-party Libraries](/docs/guides/third-party-libs)