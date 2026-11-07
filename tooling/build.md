---
title: "Building and output"
description: "Production builds and output layout."
---

`sinth build` produces:

```
dist/
├─ index.html, about.html, blog/index.html, 404.html
├─ _sinth/
│  ├─ index-HASH.js       page entry (only for interactive pages)
│  ├─ index-HASH.css      page styles
│  ├─ chunks/…            shared code
│  └─ assets/…            images and fonts referenced from CSS
├─ elements/…             standalone custom elements
├─ _headers               security and caching headers
├─ sitemap.xml, robots.txt (when "site" is set)
└─ contents of public/ and static folders
```

The output is standard HTML, CSS and JavaScript with no server runtime, so it runs on Cloudflare Pages, Netlify, Vercel, GitHub Pages, S3, nginx or any static host. Pages are written as `about.html`; most hosts serve them at `/about` (on GitHub Pages and nginx, links to `/about.html` or a rewrite rule may be needed).

The build prints every page with its size and whether it ships JavaScript:

```
  /       index.html  2.3 kB  js 5.1 kB  css 8.3 kB
  /about  about.html  1.2 kB  no js      css 8.2 kB
```
