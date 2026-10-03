---
title: bind & model Attributes
description: Two-way binding for form inputs.
---

The `bind` and `model` attributes provide two-way data binding between form inputs and variables.

## model Attribute

Two-way binding with automatic type conversion:

```sinth
var str name = ""
var num age = 0
var bool active = true

Input(type: "text", model: name, placeholder: "Name")
Input(type: "number", model: age, placeholder: "Age")
Checkbox(model: active, label: "Active")
```

**Behavior:**
- Input → Variable: Automatic on `input` event
- Variable → Input: Automatic on render
- Type conversion: Strings ↔ Numbers ↔ Booleans

## bind Attribute

One-way binding (variable → input only):

```sinth
var str displayValue = "Read only"

Input(bind: displayValue)  -- Shows value, ignores user input
```

**Use cases:**
- Display calculated values
- Read-only fields
- Synced displays

## Type-Specific Handling

### String Inputs

```sinth
var str text = ""
Input(type: "text", model: text)
Input(type: "email", model: email)
Input(type: "password", model: password)
Textarea(model: description)
```

### Number Inputs

```sinth
var num count = 0
var num price = 0.0

Input(type: "number", model: count, step: 1)
Input(type: "range", model: volume, min: 0, max: 100)
Input(type: "number", model: price, step: 0.01)
```

Automatic conversion:
- Input "42" → Variable `42` (num)
- Variable `3.14` → Input "3.14"

### Boolean Inputs

```sinth
var bool agreed = false
var bool subscribed = true

Checkbox(model: agreed, label: "I agree")
Checkbox(model: subscribed, label: "Subscribe")
Switch(model: darkMode)  -- Custom component
```

### Select Binding

```sinth
var str country = ""
var str[] tags = []

Select(model: country) {
  Option(value: "us") { "US" }
  Option(value: "uk") { "UK" }
}

Select(multiple: true, model: tags) {
  Option(value: "web") { "Web" }
  Option(value: "mobile") { "Mobile" }
}
```

## Form Example

```sinth
page
var str name = ""
var str email = ""
var num age = 0
var bool newsletter = false
var str country = ""
var str bio = ""

function submit() {
  console.log({ name, email, age, newsletter, country, bio })
  alert("Submitted!")
}

Form(onSubmit: submit) {
  Fieldset {
    Legend { "Personal Info" }
    
    Div(class: "field") {
      Label { "Name" }
      Input(model: name, required, placeholder: "Your name")
    }
    
    Div(class: "field") {
      Label { "Email" }
      Input(type: "email", model: email, required)
    }
    
    Div(class: "field") {
      Label { "Age" }
      Input(type: "number", model: age, min: 0, max: 150)
    }
  }
  
  Fieldset {
    Legend { "Preferences" }
    
    Div(class: "field checkbox") {
      Checkbox(model: newsletter, label: "Subscribe to newsletter")
    }
    
    Div(class: "field") {
      Label { "Country" }
      Select(model: country) {
        Option(value: "") { "Select..." }
        Option(value: "us") { "United States" }
        Option(value: "ca") { "Canada" }
      }
    }
    
    Div(class: "field") {
      Label { "Bio" }
      Textarea(model: bio, rows: 4)
    }
  }
  
  Button(type: "submit") { "Save" }
}

style {
  .field { marginBottom: "1rem"; }
  .field Label { display: "block"; marginBottom: "0.25rem"; }
  .field Input, .field Select, .field Textarea { width: "100%"; padding: "0.5rem"; }
  .checkbox { display: "flex"; alignItems: "center"; gap: "0.5rem"; }
}
```

## Custom Input Components

```sinth
component ColorPicker(model, label) {
  Label { label }
  Input(type: "color", model: model)
  Span { model }
}

component Rating(model, max = 5) {
  Div(class: "rating") {
    for (i in range(1, max + 1)) {
      Span(
        class: i <= model ? "filled" : "",
        onClick: model = i
      ) { "★" }
    }
  }
}

-- Usage:
var str color = "#007bff"
var num rating = 0

ColorPicker(model: color, label: "Theme Color")
Rating(model: rating)
```

## Validation with Binding

```sinth
var str email = ""
var str emailError = ""

Input(
  type: "email",
  model: email,
  onInput: emailError = email && !email.includes("@") ? "Invalid email" : ""
)

if (emailError) { Span(class: "error") { emailError } }
```

## Debounced Binding

```sinth
component DebouncedInput(model, delay = 300) {
  var str localValue = ""
  
  Input(
    model: localValue,
    onInput: localValue = e.target.value; debounce(delay, () => model = localValue)
  )
  
  script {
    function debounce(num ms, fn) {
      var num timer = 0
      return () => {
        clearTimeout(timer)
        timer = setTimeout(fn, ms)
      }
    }
  }
}

-- Usage:
var str searchQuery = ""
DebouncedInput(model: searchQuery, delay: 500)
Paragraph { "Searching: " + searchQuery }
```

## Array Binding

```sinth
var str[] tags = []

function addTag(str tag) {
  if (tag && !tags.includes(tag)) {
    tags = tags.concat([tag])
  }
}

function removeTag(str tag) {
  tags = tags.filter(t => t != tag)
}

Div {
  Input(model: newTag, placeholder: "Add tag", onKeyDown: e.key == "Enter" && addTag(newTag); newTag = "")
  Div(class: "tags") {
    for (tag in tags) {
      Span(class: "tag") { tag + Button(onClick: removeTag(tag), size: "sm") { "×" } }
    }
  }
}
```

## Best Practices

1. **Use `model` for forms** — Two-way sync
2. **Use `bind` for display** — One-way, read-only
3. **Match types** — Number inputs with num variables
4. **Validate on input** — Real-time feedback
5. **Debounce expensive operations** — Search, API calls

## Next Steps

- [Reactive Variables](/docs/state-management/reactive-variables)
- [Form Components](/docs/builtins/forms)
- [Computed Values](/docs/state-management/computed)