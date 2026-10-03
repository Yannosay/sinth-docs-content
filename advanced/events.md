---
title: Event Handling
description: onClick, onInput, onChange, and event modifiers.
---

Handle user interactions with event attributes and modifiers.

## Basic Events

```sinth
Button(onClick: handler) { "Click" }
Input(onInput: value = e.target.value)
Select(onChange: handleChange)
Form(onSubmit: handleSubmit)
```

## Event Object

```sinth
function handleClick(e) {
  e.target          -- Element that triggered
  e.currentTarget   -- Element with handler
  e.clientX, e.clientY  -- Mouse position
  e.key             -- Key pressed
  e.preventDefault()    -- Stop default
  e.stopPropagation()   -- Stop bubbling
}

Button(onClick: handleClick)
```

## Common Events

| Event | Elements | Description |
|-------|----------|-------------|
| `onClick` | All | Mouse click |
| `onDoubleClick` | All | Double click |
| `onMouseDown` | All | Mouse button down |
| `onMouseUp` | All | Mouse button up |
| `onMouseEnter` | All | Mouse enters |
| `onMouseLeave` | All | Mouse leaves |
| `onMouseMove` | All | Mouse moves |
| `onKeyDown` | Focusable | Key pressed |
| `onKeyUp` | Focusable | Key released |
| `onFocus` | Focusable | Element focused |
| `onBlur` | Focusable | Element blurred |
| `onInput` | Input, Textarea | Value changed |
| `onChange` | Input, Select | Value committed |
| `onSubmit` | Form | Form submitted |
| `onReset` | Form | Form reset |
| `onScroll` | Scrollable | Scrolled |

## Form Events

```sinth
Form(onSubmit: submit) {
  Input(model: email, onInput: validateEmail)
  Button(type: "submit") { "Submit" }
}

function submit(e) {
  e.preventDefault()
  console.log("Submit:", formData)
}

function validateEmail(e) {
  emailError = e.target.value.includes("@") ? "" : "Invalid email"
}
```

## Event Modifiers

```sinth
-- Prevent default
Button(onClick.prevent: handler) { "Link-like" }

-- Stop propagation
Div(onClick: parentHandler) {
  Button(onClick.stop: childHandler) { "Child" }
}

-- Once (remove after first)
Button(onClick.once: handler) { "One time" }

-- Passive (scroll performance)
Div(onScroll.passive: handler) { ... }

-- Capture phase
Div(onClick.capture: handler) { ... }

-- Self only
Div(onClick.self: handler) { ... }

-- Combined
Button(onClick.prevent.stop: handler) { ... }
```

## Keyboard Events

```sinth
Input(
  onKeyDown: e.key == "Enter" && submit()
  onKeyDown: e.key == "Escape" && cancel()
)

Div(onKeyDown: handleKeys) { ... }

function handleKeys(e) {
  if (e.ctrlKey && e.key == "s") {
    e.preventDefault()
    save()
  }
  if (e.key == "ArrowUp") { navigate(-1) }
  if (e.key == "ArrowDown") { navigate(1) }
}
```

## Mouse Events

```sinth
Div(
  onMouseEnter: hovering = true
  onMouseLeave: hovering = false
  onMouseMove: (e) => { mouseX = e.clientX; mouseY = e.clientY }
) { "Hover me" }

-- Drag and drop
Div(
  onDragOver.prevent: () => {}
  onDrop: (e) => {
    e.preventDefault()
    var file = e.dataTransfer.files[0]
    handleFile(file)
  }
) { "Drop files here" }
```

## Touch Events

```sinth
Div(
  onTouchStart: (e) => { startX = e.touches[0].clientX }
  onTouchEnd: (e) => {
    var diff = e.changedTouches[0].clientX - startX
    if (diff > 50) next()
    if (diff < -50) prev()
  }
) { "Swipe me" }
```

## Form Validation Events

```sinth
Input(
  model: email,
  onBlur: validateEmail,
  onInput: emailError = ""
)

function validateEmail(e) {
  if (e.target.value && !e.target.value.includes("@")) {
    emailError = "Invalid email"
  }
}
```

## Custom Events

```sinth
component CustomSelect(options, model) {
  Div(class: "select") {
    Button(onClick: open = !open) { model ?? "Select..." }
    if (open) {
      Ul {
        for (opt in options) {
          Li(onClick: model = opt.value; open = false) { opt.label }
        }
      }
    }
  }
}

script {
  function dispatchChange() {
    this.dispatchEvent(new CustomEvent("change", { 
      detail: { value: this.model },
      bubbles: true 
    }))
  }
}
```

## Event Delegation

```sinth
-- Parent handles all clicks
Ul(onClick: (e) => {
  if (e.target.tagName == "LI") {
    console.log("Item:", e.target.textContent)
  }
}) {
  for (item in items) {
    Li { item }
  }
}
```

## Event Modifiers Summary

| Modifier | Description |
|----------|-------------|
| `.prevent` | `e.preventDefault()` |
| `.stop` | `e.stopPropagation()` |
| `.once` | Remove after first call |
| `.passive` | `{ passive: true }` |
| `.capture` | Capture phase |
| `.self` | Only if target is element |

## Best Practices

1. **Use `prevent`** for links/forms that shouldn't navigate
2. **Use `stop`** for nested click handlers
3. **Prefer `onInput`** over `onChange` for live validation
4. **Use `once`** for one-time handlers
5. **Delegate** for large lists

## Next Steps

- [Form Components](/docs/builtins/forms)
- [bind & model](/docs/state-management/bind-model)
- [Custom Elements](/docs/advanced/custom-elements)