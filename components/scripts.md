---
title: "Script blocks"
description: "JavaScript blocks inside Sinth files."
---

Script blocks contain plain JavaScript that shares the page's (or component's) variables:

```sinth
var num ticks = 0

script {
  const timer = setInterval(() => {
    ticks += 1
    sinthRender()
  }, 1000)

  function formatDate(d) {
    return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(d)
  }
}

Paragraph { "Ticks: " + ticks + " · " + formatDate(new Date()) }
```

- Functions and variables declared in a script block can be used from Sinth code.
- Changes made from Sinth handlers update the UI automatically. Changes from timers, callbacks or third-party code need `sinthRender()` (or `sinth.update()`).
- Script syntax errors are reported with the correct `.sinth` line number (E0500).
- `import` statements belong at the top of the `.sinth` file, not inside component scripts.
