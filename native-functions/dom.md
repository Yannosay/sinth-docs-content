---
title: DOM & Window APIs
description: querySelector, createElement, location, scroll.
---

Safe DOM and Window APIs for direct browser interaction.

## Element Selection

```sinth
-- Single element
var obj element = document.getElementById("myId")
var obj element = document.querySelector(".myClass")
var obj element = document.querySelector("#id .class")

-- Multiple elements
var obj elements = document.querySelectorAll(".items")
-- Convert to array: Array.from(elements)
```

## Element Creation

```sinth
var obj div = document.createElement("div")
div.textContent = "Hello"
div.className = "my-class"
div.setAttribute("data-id", "123")

document.body.appendChild(div)
```

## Text Nodes

```sinth
var obj text = document.createTextNode("Plain text")
element.appendChild(text)
```

## Window Location

```sinth
-- Current URL
var str url = window.location.href
var str pathname = window.location.pathname
var str search = window.location.search
var str hash = window.location.hash

-- Navigate
window.location.href = "/new-page"
window.location.assign("/page")      -- Adds to history
window.location.replace("/page")     -- Replaces current
window.location.reload()             -- Reload page
```

## Scrolling

```sinth
-- Scroll to position
window.scrollTo(0, 0)                    -- Top
window.scrollTo({ top: 100, behavior: "smooth" })
window.scrollBy(0, 100)                  -- Relative

-- Element scroll
element.scrollIntoView({ behavior: "smooth", block: "center" })
element.scrollTop = 100
```

## Window Events

```sinth
script {
  window.addEventListener("resize", () => {
    console.log("Size:", window.innerWidth, window.innerHeight)
  })
  
  window.addEventListener("scroll", () => {
    console.log("Scroll:", window.scrollY)
  })
  
  window.addEventListener("beforeunload", (e) => {
    if (hasUnsavedChanges) {
      e.preventDefault()
      e.returnValue = ""
    }
  })
  
  window.addEventListener("online", () => { console.log("Online") })
  window.addEventListener("offline", () => { console.log("Offline") })
}
```

## Element Manipulation

```sinth
-- Classes
element.classList.add("active")
element.classList.remove("hidden")
element.classList.toggle("open")
element.classList.contains("active")

-- Attributes
element.setAttribute("data-id", "123")
element.getAttribute("data-id")
element.removeAttribute("data-id")
element.hasAttribute("disabled")

-- Styles
element.style.color = "red"
element.style.setProperty("--color", "blue")
element.style.cssText = "color: red; font-size: 14px;"

-- Content
element.textContent = "Safe text"
element.innerHTML = "<b>HTML</b>"  -- Use with caution!

-- Children
element.appendChild(child)
element.insertBefore(new, reference)
element.replaceChild(new, old)
element.removeChild(child)
parent.remove()  -- Self remove
```

## Event Handling

```sinth
script {
  function handleClick(e) {
    console.log("Clicked:", e.target)
    console.log("Position:", e.clientX, e.clientY)
    e.preventDefault()  -- Stop default
    e.stopPropagation() -- Stop bubbling
  }
  
  element.addEventListener("click", handleClick)
  element.removeEventListener("click", handleClick)
  
  -- Event delegation
  parent.addEventListener("click", (e) => {
    if (e.target.matches(".btn")) {
      console.log("Button clicked:", e.target)
    }
  })
}
```

## Form Elements

```sinth
var obj input = document.querySelector("input")
input.value = "New value"
input.checked = true
input.disabled = true
input.focus()
input.blur()
input.select()
input.setSelectionRange(0, 5)
```

## Custom Elements

```sinth
script {
  class MyElement extends HTMLElement {
    connectedCallback() {
      this.innerHTML = "<p>Custom!</p>"
    }
  }
  
  customElements.define("my-element", MyElement)
}
```

## Best Practices

1. **Use Sinth bindings** — Prefer `model`, `onClick` over direct DOM
2. **Escape hatches** — Use DOM APIs when Sinth can't express it
3. **Cleanup listeners** — Remove in `beforeunload` or component cleanup
4. **TypeScript** — Use `HTMLElement` types in script blocks

## Next Steps

- [Fetch & Network](/docs/native-functions/fetch)
- [URL & Encoding](/docs/native-functions/url)
- [Custom Elements](/docs/advanced/custom-elements)