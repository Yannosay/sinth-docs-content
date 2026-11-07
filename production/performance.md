---
title: "Rendering model and performance"
description: "How Sinth renders pages and keeps them fast."
---

- **Prerendering**: every page is rendered to static HTML at build time, so content is visible immediately and indexable by search engines.
- **No JavaScript when none is needed**: if a page has no events, bindings, scripts, watchers or values that can only be known in the browser, Sinth ships no JavaScript at all for it.
- **Fine-grained updates**: interactive pages mount a ~5 kB runtime. Each binding is updated only when its value actually changes. Text, attributes and keyed lists are patched in place; nothing is re-rendered with `innerHTML`.
- **Code splitting**: shared code across pages is split into cached chunks, and `<link rel="modulepreload">` tags are added automatically.
- **Static subtrees**: purely static markup inside interactive pages is created from cached templates.
- **Hashed assets**: files in `dist/_sinth/` have content hashes and are served with long-lived caching headers.

The browser runtime is exposed for interop as `window.sinth` (`sinth.update()`, `sinth.schedule()`) and `window.sinthRender()`.
