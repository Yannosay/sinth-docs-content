---
title: Interactive Components
description: Button, Link, Input, Checkbox, Select, etc.
---

Interactive components handle user input and events.

## Buttons

### Button

```sinth
Button { "Click me" }
Button(onClick: handler) { "Submit" }
Button(type: "submit") { "Submit Form" }
Button(type: "reset") { "Reset" }
Button(disabled: true) { "Disabled" }
```

**Attributes:**
- `type`: `"button"` | `"submit"` | `"reset"` (default: `"button"`)
- `onClick`: Event handler
- `disabled`: Boolean

### Link / NavLink

```sinth
Link(href: "/page") { "Go to page" }
NavLink(href: "/active", activeClass: "active") { "Active link" }
```

Renders: `<a>`

**Attributes:**
- `href`: URL string
- `target`: `"_blank"` | `"_self"` | etc.
- `rel`: `"noopener noreferrer"` (auto for external)

## Form Inputs

### Input

```sinth
Input(type: "text", placeholder: "Enter text")
Input(type: "email", model: email)
Input(type: "password", model: password)
Input(type: "number", model: age, step: 1)
Input(type: "tel", placeholder: "Phone")
Input(type: "url", placeholder: "Website")
Input(type: "search", placeholder: "Search...")
Input(type: "date", model: birthDate)
Input(type: "datetime-local", model: appointment)
Input(type: "color", model: themeColor)
Input(type: "range", min: 0, max: 100, model: volume)
Input(type: "file", onChange: handleFile)
Input(type: "hidden", value: csrfToken)
```

**Attributes:**
- `type`: Input type (default: `"text"`)
- `model`: Two-way binding variable
- `bind`: One-way binding variable
- `placeholder`: Placeholder text
- `value`: Initial value
- `disabled`: Boolean
- `required`: Boolean
- `readonly`: Boolean
- `min`, `max`, `step`: For number/date/range
- `onInput`, `onChange`, `onFocus`, `onBlur`: Events

### Textarea

```sinth
Textarea(model: description, placeholder: "Enter description", rows: 4)
```

**Attributes:**
- `model` / `bind`
- `placeholder`
- `rows`, `cols`
- `maxlength`
- `disabled`, `required`, `readonly`

### Select

```sinth
Select(model: country) {
  Option(value: "", disabled: true) { "Select country" }
  Option(value: "us") { "United States" }
  Option(value: "uk") { "United Kingdom" }
  Option(value: "de") { "Germany" }
}
```

**Attributes:**
- `model` / `bind`
- `multiple`: Boolean
- `disabled`, `required`

### Option

```sinth
Option(value: "value") { "Display Text" }
Option(value: "value", disabled: true) { "Disabled" }
Option(value: "value", selected: true) { "Pre-selected" }
```

### Optgroup

```sinth
Select(model: fruit) {
  Optgroup(label: "Citrus") {
    Option(value: "orange") { "Orange" }
    Option(value: "lemon") { "Lemon" }
  }
  Optgroup(label: "Berries") {
    Option(value: "strawberry") { "Strawberry" }
  }
}
```

### Checkbox

```sinth
Checkbox(model: agreed, label: "I agree to terms")
Checkbox(model: subscribed, label: "Newsletter")
Checkbox(checked: true, onChange: handler) { "Custom label" }
```

**Attributes:**
- `model` / `bind` / `checked`
- `label`: Inline label text
- `onChange`: Event handler

### Radio (via Input)

```sinth
var str payment = "card"

Input(type: "radio", name: "payment", value: "card", model: payment) { "Credit Card" }
Input(type: "radio", name: "payment", value: "paypal", model: payment) { "PayPal" }
Input(type: "radio", name: "payment", value: "bank", model: payment) { "Bank Transfer" }
```

### Datalist

```sinth
Input(list: "browsers", placeholder: "Browser")
Datalist(id: "browsers") {
  Option(value: "Chrome")
  Option(value: "Firefox")
  Option(value: "Safari")
  Option(value: "Edge")
}
```

## Form Structure

### Form

```sinth
Form(onSubmit: handleSubmit) {
  Input(type: "email", model: email, required)
  Input(type: "password", model: password, required)
  Button(type: "submit") { "Login" }
}
```

**Attributes:**
- `onSubmit`: Submit handler
- `action`: Form action URL
- `method`: `"GET"` | `"POST"`
- `enctype`: `"multipart/form-data"` for file uploads

### Fieldset

```sinth
Fieldset {
  Legend { "Personal Info" }
  Input(type: "text", model: name, placeholder: "Name")
  Input(type: "email", model: email, placeholder: "Email")
}
```

### Legend

```sinth
Legend { "Section Title" }
```

## Special Elements

### Details / Summary

```sinth
Details {
  Summary { "Click to expand" }
  Paragraph { "Hidden content revealed on click" }
}

Details(open: true) {
  Summary { "Always open" }
  Paragraph { "Content visible by default" }
}
```

### Dialog

```sinth
var bool showDialog = false

Button(onClick: showDialog = true) { "Open Dialog" }

Dialog(open: showDialog, onClose: showDialog = false) {
  Heading(level: 3) { "Confirm" }
  Paragraph { "Are you sure?" }
  Div(class: "actions") {
    Button(onClick: confirm(); showDialog = false) { "Yes" }
    Button(onClick: showDialog = false) { "No" }
  }
}
```

### Progress

```sinth
Progress(value: 75, max: 100) { "75%" }
Progress(max: 100) { "Indeterminate" } -- No value = indeterminate
```

### Meter

```sinth
Meter(value: 0.6, min: 0, max: 1, low: 0.3, high: 0.8, optimum: 0.9) { "60%" }
```

### Output

```sinth
var num a = 10
var num b = 5

Output(for: "a b") { a + b }

Input(id: "a", type: "number", model: a)
Input(id: "b", type: "number", model: b)
```

## Form Example

```sinth
page
var str name = ""
var str email = ""
var str password = ""
var bool remember = false
var str country = ""
var str bio = ""
var bool terms = false

Form(onSubmit: submitForm) {
  Fieldset {
    Legend { "Create Account" }
    
    Div(class: "field") {
      Label { "Name" }
      Input(type: "text", model: name, required, placeholder: "Your name")
    }
    
    Div(class: "field") {
      Label { "Email" }
      Input(type: "email", model: email, required, placeholder: "email@example.com")
    }
    
    Div(class: "field") {
      Label { "Password" }
      Input(type: "password", model: password, required, minlength: 8)
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
      Textarea(model: bio, rows: 4, placeholder: "Tell us about yourself")
    }
    
    Div(class: "field checkbox") {
      Checkbox(model: terms, label: "I agree to the Terms of Service", required)
    }
    
    Div(class: "field checkbox") {
      Checkbox(model: remember, label: "Remember me")
    }
    
    Button(type: "submit") { "Create Account" }
  }
}

script {
  function submitForm() {
    if (!terms) { alert("Please accept terms"); return }
    console.log("Submitting:", { name, email, password, country, bio, remember })
    // API call here
  }
}

style {
  .field { marginBottom: "1rem"; }
  .field Label { display: "block"; marginBottom: "0.25rem"; fontWeight: "500"; }
  .field Input, .field Select, .field Textarea { width: "100%; padding: "0.5rem"; border: "1px solid #ccc"; borderRadius: "0.25rem"; }
  .checkbox { display: "flex"; alignItems: "center"; gap: "0.5rem"; }
  .checkbox Label { fontWeight: "normal"; }
}
```

## Validation

### HTML5 Validation (Automatic)

```sinth
Input(type: "email", required) -- Browser validates format
Input(type: "text", minlength: 3, maxlength: 20)
Input(type: "number", min: 0, max: 100, step: 1)
Input(pattern: "[A-Za-z]{3}") -- Regex pattern
```

### Custom Validation

```sinth
var str error = ""

Input(
  type: "email", 
  model: email, 
  onInput: error = email.includes("@") ? "" : "Invalid email"
)

if (error) { Span(class: "error") { error } }
```

## Next Steps

- [Form Components](/docs/builtins/forms)
- [Event Handling](/docs/advanced/events)
- [bind & model](/docs/state-management/bind-model)