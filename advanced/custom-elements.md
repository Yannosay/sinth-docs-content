---
title: Custom Elements
description: Export Sinth components as Web Components.
---

Export Sinth components as standard Web Components for use in any framework.

## Basic Export

```sinth
custom-element MyButton {
  export <my-button/>

  component MyButton(label, variant = "primary") {
    Button(class: "btn btn-" + variant) { label }
    
    style {
      .btn { padding: "0.5rem 1rem"; borderRadius: "0.25rem"; }
      .btn-primary { background: #007bff; color: white; }
      .btn-secondary { background: #6c757d; color: white; }
    }
  }
}
```

## Declaration

```sinth
custom-element ComponentName {
  export <tag-name/>
  
  -- Optional: attribute definitions
  (attr1, attr2:type = default, ...)
  
  component ComponentName(...) { ... }
}
```

## Attributes

```sinth
custom-element UserCard {
  export <user-card/>
  
  (name, email, avatar = "default.png", admin:bool = false)
  
  component UserCard(name, email, avatar = "default.png", admin = false) {
    Div(class: "card") {
      Img(src: avatar, alt: name)
      Heading(level: 3) { name }
      Paragraph { email }
      if (admin) { Span(class: "badge") { "Admin" } }
    }
  }
}
```

## Usage in HTML

```html
<script type="module" src="/my-button.js"></script>

<my-button label="Click me" variant="primary"></my-button>

<user-card 
  name="Alice" 
  email="alice@example.com" 
  avatar="photo.jpg" 
  admin="true">
</user-card>
```

## Reactive Attributes

Attributes automatically sync to component props:

```html
<my-button label="Initial"></my-button>

<script>
  const btn = document.querySelector("my-button")
  btn.setAttribute("label", "Updated")  -- Triggers re-render
</script>
```

## Properties vs Attributes

```sinth
custom-element Counter {
  export <my-counter/>
  
  (count:num = 0, step:num = 1)
  
  component Counter(count = 0, step = 1) {
    Div {
      Span { count }
      Button(onClick: count += step) { "+" }
      Button(onClick: count -= step) { "-" }
    }
  }
}
```

```html
<my-counter count="5" step="2"></my-counter>

<script>
  const counter = document.querySelector("my-counter")
  counter.count = 10        -- Property (immediate)
  counter.setAttribute("count", "20")  -- Attribute (batched)
</script>
```

## Events

```sinth
custom-element TodoItem {
  export <todo-item/>
  
  (text, completed:bool = false)
  
  component TodoItem(text, completed = false) {
    Div(class: "todo") {
      Checkbox(model: completed)
      Span(class: completed ? "done" : "") { text }
      Button(onClick: remove()) { "×" }
    }
    
    script {
      function remove() {
        this.dispatchEvent(new CustomEvent("remove", { 
          detail: { text }, 
          bubbles: true 
        }))
      }
    }
  }
}
```

```html
<todo-item text="Learn Sinth" completed="false"></todo-item>

<script>
  document.addEventListener("remove", (e) => {
    console.log("Remove:", e.detail.text)
    e.target.remove()
  })
</script>
```

## Lifecycle

```sinth
custom-element LifecycleDemo {
  export <lifecycle-demo/>
  
  component LifecycleDemo() {
    Div { "Check console" }
    
    script {
      -- Runs when element is inserted
      function connectedCallback() {
        console.log("Connected!")
        this.startTimer()
      }
      
      -- Runs when element is removed
      function disconnectedCallback() {
        console.log("Disconnected!")
        this.stopTimer()
      }
      
      -- Runs when attributes change
      function attributeChangedCallback(name, oldVal, newVal) {
        console.log(name, ":", oldVal, "->", newVal)
      }
      
      function startTimer() { ... }
      function stopTimer() { ... }
    }
  }
}
```

## Shadow DOM

```sinth
custom-element StyledComponent {
  export <styled-component/>
  
  component StyledComponent() {
    Div(class: "wrapper") { "Styled!" }
    
    style {
      :host { display: block; }
      .wrapper { padding: "1rem"; background: var(--bg, white); }
    }
  }
}
```

## Integration with Frameworks

### React

```jsx
import "./my-button.js"

function App() {
  return (
    <my-button label="Click me" variant="primary" 
      onClick={() => console.log("Clicked!")} />
  )
}
```

### Vue

```vue
<script setup>
import "./user-card.js"
</script>

<template>
  <user-card name="Alice" email="alice@example.com" />
</template>
```

### Angular

```typescript
// In module
import "./my-button.js"
declare global {
  interface HTMLElementTagNameMap {
    "my-button": HTMLElement
  }
}
```

```html
<my-button [label]="label" (click)="handleClick()"></my-button>
```

## Build Configuration

```json
{
  "customElements": {
    "MyButton": { "export": "my-button" },
    "UserCard": { "export": "user-card" }
  }
}
```

Or in component file:

```sinth
custom-element MyButton {
  export <my-button/>
  ...
}
```

## Best Practices

1. **Use kebab-case** for tag names (`my-button`)
2. **Define all attributes** in declaration for type safety
3. **Use `bubbles: true`** for events to reach document
4. **Clean up in `disconnectedCallback`** — Timers, listeners
5. **Use `:host`** for component-level styles

## Limitations

1. **No slots in declaration** — Use `$slot` in component body
2. **Boolean attributes** — Use `attr:bool` syntax
3. **No complex objects** — Attributes are strings
4. **Shadow DOM isolation** — Global styles don't penetrate

## Next Steps

- [Slots & Composition](/docs/advanced/slots)
- [Event Handling](/docs/advanced/events)
- [Framework Integration](/docs/guides/frameworks)