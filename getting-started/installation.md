---
title: "Getting started"
description: "Install Sinth, create a project and run the dev server."
---

Requirements: Node.js 18.17 or newer.

```bash
npx @yannosay/sinth create my-site
cd my-site
npm install
npm run dev
```

Or install the CLI globally:

```bash
npm install -g @yannosay/sinth
sinth create my-site
```

Open `http://localhost:3000`. Edit `pages/index.sinth` and save; the page updates instantly and keeps its state.

A complete page:

```sinth
title = "Counter"

var num count = 0

Main {
  Heading(level: 1) { "Count: " + count }
  Button(onClick: count += 1) { "Increment" }
}
```

When you are ready:

```bash
npm run build     # optimized production build in dist/
npm run preview   # serve dist/ locally with production headers
npm run deploy    # deploy to Cloudflare Pages
```
