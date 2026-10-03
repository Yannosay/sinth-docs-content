---
title: Conditional Rendering
description: if blocks, persist, replace, delay, hide.
---

Control what renders with powerful conditional directives.

## Basic If

```sinth
var bool show = true

if (show) {
  Paragraph { "Visible!" }
}

if (user) {
  UserProfile(user: user)
} else {
  LoginForm()
}
```

## Else If Chain

```sinth
var num status = 2  -- 0: loading, 1: success, 2: error

if (status == 0) {
  Spinner()
} else if (status == 1) {
  Content(data: data)
} else if (status == 2) {
  ErrorMessage()
} else {
  Paragraph { "Unknown state" }
}
```

## Inline Ternary

```sinth
Paragraph { loggedIn ? "Welcome back!" : "Please log in" }
Button { loading ? "Saving..." : "Save" }
```

## Persist

Keep DOM nodes alive when hidden (preserves state, focus, scroll):

```sinth
var bool showDetails = false

if (showDetails) persist {
  Div(class: "details") {
    Input(model: search)  -- Keeps input value & focus
    List { ... }          -- Keeps scroll position
  }
}

Button(onClick: showDetails = !showDetails) { 
  showDetails ? "Hide" : "Show" 
}
```

## Replace

Replace DOM node instead of hiding (for animations):

```sinth
if (show) replace {
  Div(id: "panel", class: "slide-in") { "Content" }
} else {
  Div(id: "panel", class: "slide-out") { "Hidden" }
}
```

## Delay

Delay hiding for exit animations:

```sinth
if (show) delay(300) {
  Div(class: "fade-in") { "Content" }
} else {
  Div(class: "fade-out") { "Exiting" }
}

-- CSS
.fade-in { animation: fadeIn 300ms; }
.fade-out { animation: fadeOut 300ms; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
```

## Hide

Simple hide without removing from DOM:

```sinth
var bool hidden = false

Div(hide: hidden) { "Toggle me" }
Button(onClick: hidden = !hidden) { "Toggle" }
```

## Combined

```sinth
if (show) persist replace delay(300) hide(false) {
  Div(id: "modal", class: "modal-enter") {
    Paragraph { "Animated modal" }
  }
} else {
  Div(id: "modal", class: "modal-exit") { "Exiting" }
}
```

## In Components

```sinth
component Modal(open, onClose) {
  if (open) persist replace delay(200) {
    Div(class: "modal-overlay", onClick: onClose) {
      Div(class: "modal", onClick: (e) => e.stopPropagation()) {
        $slot
        Button(onClick: onClose) { "Close" }
      }
    }
  }
}

Modal(open: showModal, onClose: showModal = false) {
  Heading { "Title" }
  Paragraph { "Content" }
}
```

## In Loops

```sinth
for (item in items) {
  if (item.visible) persist {
    ItemComponent(item: item)
  }
}
```

## Performance

| Directive | DOM Behavior | Use Case |
|-----------|-------------|----------|
| `if` | Remove/insert | Simple toggles |
| `persist` | Keep DOM | Form inputs, scroll |
| `replace` | Swap nodes | Animations |
| `delay` | Timed remove | Exit animations |
| `hide` | `display: none` | Frequent toggles |

## CSS Classes for Animation

```sinth
style {
  .modal-enter { animation: slideIn 300ms ease; }
  .modal-exit { animation: slideOut 300ms ease forwards; }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }
}
```

## Best Practices

1. **Use `persist`** for form inputs, scroll positions
2. **Use `replace` + `delay`** for enter/exit animations
3. **Use `hide`** for frequent, simple toggles
4. **Combine** for complex transitions
5. **Test on mobile** — Performance varies

## Next Steps

- [Loops](/docs/advanced/loops)
- [Event Handling](/docs/advanced/events)
- [Animations](/docs/guides/animations)