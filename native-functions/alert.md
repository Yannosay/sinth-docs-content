---
title: Alert, Confirm, Prompt
description: Browser dialog functions.
---

Simple browser dialogs for alerts, confirmations, and user input.

## alert

```sinth
alert("Hello, World!")
alert("Operation completed successfully")
alert("Error: " + errorMessage)

-- With variables
var str name = "Alice"
alert("Welcome, " + name + "!")
```

Shows a modal dialog with OK button. Blocks execution until dismissed.

## confirm

```sinth
var bool result = confirm("Are you sure?")

if (result) {
  console.log("User clicked OK")
  deleteItem()
} else {
  console.log("User clicked Cancel")
}
```

Returns `true` for OK, `false` for Cancel. Blocks execution.

## prompt

```sinth
var str name = prompt("What is your name?", "Anonymous")

if (name) {
  console.log("Hello, " + name)
} else {
  console.log("User cancelled or entered nothing")
}

-- With default
var str age = prompt("Age:", "25")
```

Returns string or `null` if cancelled. Default value is optional.

## Practical Examples

### Delete Confirmation

```sinth
function handleDelete(num id) {
  if (confirm("Delete item " + id + "? This cannot be undone.")) {
    api.delete(id).then(() => {
      items = items.filter(i => i.id != id)
      sinthRender()
    })
  }
}

Button(onClick: handleDelete(item.id)) { "Delete" }
```

### User Input

```sinth
function getUserName() {
  var str name = prompt("Enter your name:")
  if (name && name.trim()) {
    return name.trim()
  }
  return "Guest"
}

var str userName = getUserName()
Paragraph { "Welcome, " + userName }
```

### Settings Dialog

```sinth
function changeSetting(str key) {
  var str current = settings[key] ?? ""
  var str input = prompt("New value for " + key + ":", current)
  
  if (input !== null && input !== current) {
    settings[key] = input
    localStorage.setItem("settings", JSON.stringify(settings))
    sinthRender()
  }
}
```

## Limitations

1. **Blocking** — Execution pauses until dialog closes
2. **No styling** — Browser default appearance
3. **No async** — Can't use `await` with them
4. **Browser restrictions** — May be blocked by popup blockers

## Alternatives

### Custom Modal (Recommended)

```sinth
component ConfirmDialog(message, onConfirm, onCancel) {
  var bool open = true
  
  if (open) {
    Div(class: "modal-overlay", onClick: onCancel) {
      Div(class: "modal", onClick: (e) => e.stopPropagation()) {
        Paragraph { message }
        Div(class: "actions") {
          Button(onClick: open = false; onConfirm()) { "Confirm" }
          Button(onClick: open = false; onCancel()) { "Cancel" }
        }
      }
    }
  }
}

-- Usage
var bool showDelete = false

Button(onClick: showDelete = true) { "Delete" }

ConfirmDialog(
  message: "Are you sure?",
  onConfirm: () => { deleteItem(); showDelete = false },
  onCancel: () => showDelete = false
)
```

### Custom Prompt

```sinth
component PromptDialog(message, defaultValue, onSubmit, onCancel) {
  var str value = defaultValue
  
  Div(class: "modal") {
    Paragraph { message }
    Input(model: value, autoFocus: true)
    Div(class: "actions") {
      Button(onClick: onSubmit(value); onClose()) { "OK" }
      Button(onClick: onCancel()) { "Cancel" }
    }
  }
}
```

## Best Practices

1. **Use custom modals** for production apps
2. **Reserve native dialogs** for simple debugging
3. **Provide escape hatches** — Always have cancel option
4. **Don't overuse** — Modal fatigue hurts UX

## Next Steps

- [Custom Elements](/docs/advanced/custom-elements)
- [Modal Patterns](/docs/guides/modals)
- [Form Handling](/docs/builtins/forms)