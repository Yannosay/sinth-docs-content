---
title: Timers & Animation
description: setTimeout, setInterval, requestAnimationFrame.
---

Timer and animation functions for scheduling and animation loops.

## setTimeout

```sinth
-- Execute once after delay (ms)
var num timerId = setTimeout(() => {
  console.log("Executed after 1 second")
}, 1000)

-- With arguments
setTimeout((name, age) => {
  console.log(name + " is " + age)
}, 2000, "Alice", 30)

-- Clear timeout
clearTimeout(timerId)
```

## setInterval

```sinth
-- Execute repeatedly
var num intervalId = setInterval(() => {
  console.log("Every second")
}, 1000)

-- With arguments
setInterval((label) => {
  console.log(label + ": " + Date.now())
}, 5000, "Tick")

-- Clear interval
clearInterval(intervalId)
```

## Common Patterns

### Debounce

```sinth
function debounce(fn, num ms) {
  var num timer = 0
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

var debouncedSearch = debounce((query) => {
  console.log("Search:", query)
}, 300)

Input(onInput: debouncedSearch(e.target.value))
```

### Throttle

```sinth
function throttle(fn, num ms) {
  var bool waiting = false
  return (...args) => {
    if (!waiting) {
      fn(...args)
      waiting = true
      setTimeout(() => { waiting = false }, ms)
    }
  }
}

var throttledScroll = throttle(() => {
  console.log("Scroll:", window.scrollY)
}, 100)

window.addEventListener("scroll", throttledScroll)
```

### Delayed Execution

```sinth
function delay(num ms) -> obj {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sequence() {
  console.log("Start")
  await delay(1000)
  console.log("After 1s")
  await delay(500)
  console.log("After 1.5s total")
}
```

## requestAnimationFrame

```sinth
-- Smooth animations (60fps)
var num frameId = 0

function animate() {
  console.log("Frame")
  frameId = requestAnimationFrame(animate)
}

animate()  -- Start
cancelAnimationFrame(frameId)  -- Stop
```

### Animation Loop

```sinth
var num startTime = 0
var num duration = 1000

function animate(timestamp) {
  if (!startTime) startTime = timestamp
  var num progress = Math.min((timestamp - startTime) / duration, 1)
  
  var num eased = progress < 0.5 
    ? 2 * progress * progress 
    : -1 + (4 - 2 * progress) * progress
  
  element.style.transform = "translateX(" + (eased * 300) + "px)"
  
  if (progress < 1) {
    requestAnimationFrame(animate)
  }
}

requestAnimationFrame(animate)
```

## Countdown Timer

```sinth
page
var num seconds = 60
var num intervalId = 0

function start() {
  intervalId = setInterval(() => {
    seconds -= 1
    if (seconds <= 0) {
      clearInterval(intervalId)
      alert("Time's up!")
    }
    sinthRender()
  }, 1000)
}

function reset() {
  clearInterval(intervalId)
  seconds = 60
}

Main {
  Heading { seconds + "s" }
  Button(onClick: start) { "Start" }
  Button(onClick: reset) { "Reset" }
}
```

## Animation Frame vs Interval

| Aspect | `setInterval` | `requestAnimationFrame` |
|--------|---------------|-------------------------|
| Timing | Fixed interval | Browser paint cycle |
| Battery | Runs in background | Pauses in background tab |
| Smoothness | May stutter | Sync with refresh rate |
| Use case | Logic, polling | Visual animations |

## Cleanup

```sinth
component TimerComponent() {
  var num intervalId = 0
  
  script {
    function cleanup() {
      if (intervalId) clearInterval(intervalId)
      if (frameId) cancelAnimationFrame(frameId)
    }
    
    -- Call cleanup on unmount
    window.addEventListener("beforeunload", cleanup)
  }
}
```

## Best Practices

1. **Always clear timers** — Prevent memory leaks
2. **Use `requestAnimationFrame`** for visual animations
3. **Debounce/throttle** events (scroll, resize, input)
4. **Store timer IDs** — Need them for cleanup
5. **Use `Promise` wrappers** for async/await patterns

## Next Steps

- [Storage](/docs/native-functions/storage)
- [Date & Time](/docs/native-functions/date)
- [Animation](/docs/guides/animations)