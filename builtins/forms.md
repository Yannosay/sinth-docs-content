---
title: Form Components
description: Form, Fieldset, Label, Textarea, etc.
---

Form components for building accessible, validated forms with two-way binding.

## Form

```sinth
Form(onSubmit: handleSubmit) {
  -- Form fields
  Button(type: "submit") { "Submit" }
}
```

**Attributes:**
- `onSubmit`: Submit handler function
- `action`: Form action URL (default: current page)
- `method`: `"GET"` | `"POST"` (default: `"POST"`)
- `enctype`: `"multipart/form-data"` for file uploads
- `noValidate`: Disable browser validation

## Fieldset & Legend

```sinth
Fieldset {
  Legend { "Personal Information" }
  -- Fields
}

Fieldset(disabled: true) {
  Legend { "Disabled Section" }
  -- All inputs disabled
}
```

## Label

```sinth
Label { "Email Address" }
Label(for: "email") { "Email" }
```

Use `for` to associate with input ID:
```sinth
Label(for: "email") { "Email" }
Input(id: "email", type: "email", model: email)
```

## Input Types

See [Interactive Components](/docs/builtins/interactive) for full list.

## Textarea

```sinth
Textarea(
  model: description,
  placeholder: "Enter description",
  rows: 4,
  maxlength: 500
)
```

**Attributes:**
- `model` / `bind`
- `placeholder`
- `rows`, `cols`
- `maxlength`, `minlength`
- `disabled`, `required`, `readonly`
- `resize`: `"none"` | `"vertical"` | `"horizontal"` | `"both"`

## Select & Options

```sinth
Select(model: country, placeholder: "Select country") {
  Option(value: "", disabled: true) { "Choose..." }
  Option(value: "us") { "United States" }
  Option(value: "ca") { "Canada" }
}

Select(multiple: true, model: tags) {
  Option(value: "web") { "Web" }
  Option(value: "mobile") { "Mobile" }
  Option(value: "desktop") { "Desktop" }
}
```

## Checkbox & Radio

```sinth
Checkbox(model: agreed, label: "I agree to terms")
Checkbox(checked: true, onChange: handler) { "Custom label" }

-- Radio group
var str payment = "card"
Input(type: "radio", name: "payment", value: "card", model: payment) { "Card" }
Input(type: "radio", name: "payment", value: "paypal", model: payment) { "PayPal" }
```

## Datalist

```sinth
Input(list: "browsers", placeholder: "Browser")
Datalist(id: "browsers") {
  Option(value: "Chrome")
  Option(value: "Firefox")
  Option(value: "Safari")
}
```

## Form Validation

### Built-in Validation

```sinth
Input(type: "email", required)
Input(type: "text", minlength: 3, maxlength: 50)
Input(type: "number", min: 0, max: 100, step: 1)
Input(pattern: "[A-Za-z]{3}", title: "Three letters only")
Textarea(required, maxlength: 1000)
```

### Custom Validation

```sinth
var str error = ""

Input(
  type: "password",
  model: password,
  onInput: error = password.length >= 8 ? "" : "Min 8 characters"
)

if (error) { Span(class: "error") { error } }
```

### Validation on Submit

```sinth
function validate() -> bool {
  if (!email || !email.includes("@")) {
    emailError = "Valid email required"
    return false
  }
  if (password.length < 8) {
    passwordError = "Min 8 characters"
    return false
  }
  return true
}

Form(onSubmit: validate() && submit()) { ... }
```

## Complete Form Example

```sinth
page
var str firstName = ""
var str lastName = ""
var str email = ""
var str password = ""
var str confirmPassword = ""
var str country = ""
var bool terms = false
var str firstNameError = ""
var str emailError = ""
var str passwordError = ""
var str confirmError = ""

function validate() -> bool {
  var bool valid = true
  firstNameError = firstName.trim() ? "" : "First name required"
  if (firstNameError) valid = false
  
  emailError = email.includes("@") ? "" : "Valid email required"
  if (emailError) valid = false
  
  passwordError = password.length >= 8 ? "" : "Min 8 characters"
  if (passwordError) valid = false
  
  confirmError = password == confirmPassword ? "" : "Passwords must match"
  if (confirmError) valid = false
  
  return valid
}

Form(onSubmit: validate() && submitForm()) {
  Fieldset {
    Legend { "Create Account" }
    
    Div(class: "field") {
      Label(for: "firstName") { "First Name" }
      Input(id: "firstName", type: "text", model: firstName, required)
      if (firstNameError) { Span(class: "error") { firstNameError } }
    }
    
    Div(class: "field") {
      Label(for: "lastName") { "Last Name" }
      Input(id: "lastName", type: "text", model: lastName)
    }
    
    Div(class: "field") {
      Label(for: "email") { "Email" }
      Input(id: "email", type: "email", model: email, required)
      if (emailError) { Span(class: "error") { emailError } }
    }
    
    Div(class: "field") {
      Label(for: "password") { "Password" }
      Input(id: "password", type: "password", model: password, required, minlength: 8)
      if (passwordError) { Span(class: "error") { passwordError } }
    }
    
    Div(class: "field") {
      Label(for: "confirm") { "Confirm Password" }
      Input(id: "confirm", type: "password", model: confirmPassword, required)
      if (confirmError) { Span(class: "error") { confirmError } }
    }
    
    Div(class: "field") {
      Label(for: "country") { "Country" }
      Select(id: "country", model: country) {
        Option(value: "") { "Select..." }
        Option(value: "us") { "United States" }
        Option(value: "uk") { "United Kingdom" }
      }
    }
    
    Div(class: "field checkbox") {
      Checkbox(model: terms, label: "I agree to Terms & Privacy", required)
    }
    
    Button(type: "submit") { "Create Account" }
  }
}

script {
  function submitForm() {
    console.log("Submit:", { firstName, lastName, email, country })
    alert("Account created!")
  }
}

style {
  .field { marginBottom: "1rem"; }
  .field Label { display: "block"; marginBottom: "0.25rem"; fontWeight: "500"; }
  .field Input, .field Select, .field Textarea { 
    width: "100%"; padding: "0.5rem"; border: "1px solid #ccc"; borderRadius: "0.25rem"; 
  }
  .field Input:invalid { borderColor: "#dc3545"; }
  .error { color: "#dc3545"; fontSize: "0.875rem"; marginTop: "0.25rem"; display: "block"; }
  .checkbox { display: "flex"; alignItems: "center"; gap: "0.5rem"; }
  .checkbox Label { fontWeight: "normal"; cursor: "pointer"; }
  button[type="submit"] { width: "100%"; padding: "0.75rem"; fontSize: "1rem"; }
}
```

## File Upload

```sinth
Form(enctype: "multipart/form-data", onSubmit: upload) {
  Input(type: "file", onChange: handleFile, accept: "image/*", multiple: true)
  Button(type: "submit") { "Upload" }
}

script {
  var obj[] files = []
  
  function handleFile(e) {
    files = Array.from(e.target.files)
    sinthRender()
  }
  
  async function upload() {
    var formData = new FormData()
    for (file in files) { formData.append("files", file) }
    var response = await fetch("/api/upload", { method: "POST", body: formData })
    // handle response
  }
}
```

## Next Steps

- [Interactive Components](/docs/builtins/interactive)
- [bind & model](/docs/state-management/bind-model)
- [Event Handling](/docs/advanced/events)