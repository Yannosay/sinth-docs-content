---
title: Date & Time
description: Date.now, Date.parse, Date.UTC.
---

Date and time utilities.

## Current Time

```sinth
Date.now()           -- Milliseconds since epoch (Unix timestamp)
Date.now() / 1000    -- Unix seconds
```

## Parsing

```sinth
Date.parse("2024-01-15")           -- 1705276800000
Date.parse("2024-01-15T10:30:00Z") -- With time
Date.parse("Jan 15, 2024")         -- Locale dependent
Date.parse("invalid")              -- NaN
```

## UTC Construction

```sinth
Date.UTC(2024, 0, 15)              -- Jan 15, 2024 00:00:00 UTC
Date.UTC(2024, 0, 15, 10, 30)      -- Jan 15, 2024 10:30:00 UTC
Date.UTC(2024, 11, 31, 23, 59, 59) -- Dec 31, 2024 23:59:59 UTC
```

Note: Months are 0-indexed (0 = January, 11 = December)

## Creating Date Objects

```sinth
script {
  var date = new Date()                    -- Now
  var date = new Date(1705276800000)       -- From timestamp
  var date = new Date("2024-01-15")        -- From string
  var date = new Date(2024, 0, 15, 10, 30) -- Local time
  var date = new Date(Date.UTC(2024, 0, 15, 10, 30)) -- UTC
}
```

## Formatting

```sinth
script {
  var date = new Date()
  
  date.toString()              -- "Mon Jan 15 2024 10:30:00 GMT+0000"
  date.toISOString()           -- "2024-01-15T10:30:00.000Z"
  date.toLocaleString()        -- "1/15/2024, 10:30:00 AM"
  date.toLocaleDateString()    -- "1/15/2024"
  date.toLocaleTimeString()    -- "10:30:00 AM"
  
  date.toLocaleString("de-DE") -- "15.1.2024, 10:30:00"
  date.toLocaleDateString(undefined, { 
    year: "numeric", month: "long", day: "numeric" 
  }) -- "January 15, 2024"
}
```

## Components

```sinth
script {
  var date = new Date("2024-01-15T10:30:00Z")
  
  date.getFullYear()     -- 2024
  date.getMonth()        -- 0 (0-11)
  date.getDate()         -- 15 (1-31)
  date.getDay()          -- 1 (0-6, Sun-Sat)
  date.getHours()        -- 10
  date.getMinutes()      -- 30
  date.getSeconds()      -- 0
  date.getMilliseconds() -- 0
  date.getTime()         -- 1705276800000 (ms since epoch)
  
  -- UTC versions
  date.getUTCFullYear()
  date.getUTCMonth()
  date.getUTCDay()
  date.getUTCHours()
}
```

## Setting Components

```sinth
script {
  var date = new Date()
  
  date.setFullYear(2025)
  date.setMonth(5)       -- June (0-indexed)
  date.setDate(1)
  date.setHours(12)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  
  date.setTime(1705276800000)
}
```

## Calculations

```sinth
script {
  var start = new Date("2024-01-01")
  var end = new Date("2024-12-31")
  
  var diffMs = end - start              -- Milliseconds
  var diffDays = diffMs / 86400000      -- Days
  var diffHours = diffMs / 3600000      -- Hours
  var diffMinutes = diffMs / 60000      -- Minutes
  
  -- Add time
  var future = new Date(Date.now() + 7 * 86400000)  -- 1 week
  var past = new Date(Date.now() - 24 * 3600000)    -- 1 day ago
}
```

## Timezone Handling

```sinth
script {
  var date = new Date("2024-01-15T10:30:00Z")
  
  -- Local timezone offset (minutes)
  var offset = date.getTimezoneOffset()  -- e.g., -60 for UTC+1
  
  -- Format in specific timezone
  date.toLocaleString("en-US", { timeZone: "America/New_York" })
  -- "1/15/2024, 5:30:00 AM"
  
  date.toLocaleString("en-US", { timeZone: "UTC" })
  -- "1/15/2024, 10:30:00 AM"
}
```

## Formatting Helpers

```sinth
script {
  function formatDate(date, options = {}) {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...options
    })
  }
  
  function formatTime(date, options = {}) {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      ...options
    })
  }
  
  function formatRelative(date) {
    var diff = Date.now() - date.getTime()
    var seconds = Math.floor(diff / 1000)
    var minutes = Math.floor(seconds / 60)
    var hours = Math.floor(minutes / 60)
    var days = Math.floor(hours / 24)
    
    if (days > 0) return days + "d ago"
    if (hours > 0) return hours + "h ago"
    if (minutes > 0) return minutes + "m ago"
    return "just now"
  }
  
  function formatDuration(num ms) -> str {
    var seconds = Math.floor(ms / 1000)
    var minutes = Math.floor(seconds / 60)
    var hours = Math.floor(minutes / 60)
    var days = Math.floor(hours / 24)
    
    if (days > 0) return days + "d " + (hours % 24) + "h"
    if (hours > 0) return hours + "h " + (minutes % 60) + "m"
    if (minutes > 0) return minutes + "m " + (seconds % 60) + "s"
    return seconds + "s"
  }
}
```

## Timestamps

```sinth
-- Unix timestamp (seconds)
var num unix = Math.floor(Date.now() / 1000)

-- Milliseconds
var num ms = Date.now()

-- Convert
var date = new Date(unix * 1000)
var unix = Math.floor(date.getTime() / 1000)
```

## Best Practices

1. **Use UTC for storage** — `toISOString()`, `Date.UTC()`
2. **Store timestamps** — Milliseconds since epoch
3. **Format on display** — Use `toLocaleString()` with user locale
4. **Handle timezones** — Be explicit about UTC vs local
5. **Use libraries for complex** — date-fns, dayjs for heavy lifting

## Next Steps

- [Timers](/docs/native-functions/timers)
- [Math Functions](/docs/native-functions/math)
- [Scheduling](/docs/guides/scheduling)