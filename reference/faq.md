---
title: "FAQ"
description: "Frequently asked questions."
---

**Does Sinth need a framework or runtime on the server?**
No. The output is HTML, CSS and JavaScript that any web host can serve.

**Can I use npm packages?**
Yes. Install them and import them. They are bundled and tree-shaken.

**Can I use TypeScript?**
Import `.ts` files directly; they are compiled during bundling. Sinth itself has its own type annotations.

**How do I fetch data?**
In `onMount`, an event handler or an `async function`. The UI updates when the promise settles.

**How do I share layouts?**
Make a `Layout` component with `$slot` and wrap each page in it. The starter template does this.

**Why is my page shipping JavaScript?**
It has an event, binding, script, watcher, lifecycle hook, persisted variable, JS import, or a value that can only be computed in the browser. Pages without these ship none.

**Can I host under a subfolder?**
Set `"base": "/docs/"`.

**Where do I report bugs?**
[github.com/Yannosay/sinth/issues](https://github.com/Yannosay/sinth/issues). Include the output of `sinth info`.
