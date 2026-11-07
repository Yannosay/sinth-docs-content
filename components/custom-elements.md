---
title: "Custom elements"
description: "Use Sinth components in any HTML page as web components."
---

Any component can be exported as a standard web component that works in any HTML page, framework or CMS:

```sinth
-- components/Counter.sinth
component Counter(num start = 0, str label = "Count") as <sinth-counter> {
  var num n = start
  Button(onClick: n += 1) { label + ": " + n }
}
```

`sinth build` writes `dist/elements/sinth-counter.js`, a standalone file with the runtime and the component's CSS:

```html
<script type="module" src="/elements/sinth-counter.js"></script>
<sinth-counter start="5" label="Clicks"></sinth-counter>
```

- Attributes are converted to the parameter types (`num`, `bool`, and `obj`/arrays as JSON).
- Changing an attribute or a property (`el.label = "x"`) updates the element.
- Children of the custom element become its default slot.
- Tag names must be lowercase and contain a dash.
- The Sinth 4 syntax `custom-element Counter(export: <sinth-counter/>) { ... }` still works.
