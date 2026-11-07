---
title: "Files, pages and components"
description: "Pages, modules and dynamic routes."
---

There are two kinds of `.sinth` files.

**Pages** are the files in `pages/`. They contain metadata, state, markup and styles, and are compiled to one HTML file each (or one per path, for dynamic routes).

**Modules** (files outside `pages/`, usually in `components/`) contain components, functions and shared variables that pages import.

> Sinth 4 required pages to start with the keyword `page`. That keyword has been removed: a file that still starts with it fails with E0104. Delete the line; where a file lives decides whether it is a page.

Order inside a page is flexible, but the usual layout is:

```sinth
import { Card } from "../components/Card.sinth"   -- 1. imports

title = "Home"                                    -- 2. metadata

var str name = "World"                            -- 3. state

function greet(str who) -> str {                  -- 4. functions
  return "Hello, " + who + "!"
}

Main {                                            -- 5. markup
  Heading(level: 1) { greet(name) }
}

style {                                           -- 6. styles
  main { padding: "2rem" }
}
```

## Dynamic routes

Put a parameter name in brackets in a file or folder name to generate many pages from one file. List the values in `paths`; the parameter is then available as a `str` constant:

```sinth
-- pages/blog/[slug].sinth
import posts from "../../content/posts.json"

paths = posts.map((p) => p.slug)
const post = posts.find((p) => p.slug == slug)

title = post.title + " | Blog"
descr = post.summary

Main {
  Heading(level: 1) { post.title }
  Paragraph { post.body }
}
```

With `content/posts.json` holding two posts, the build writes `blog/hello-world.html` and `blog/second-post.html`, each prerendered with its own title and description, and both listed in the sitemap.

Several parameters work too. Then `paths` lists objects:

```sinth
-- pages/[lang]/docs/[page].sinth
paths = [
  { lang: "en", page: "intro" }
  { lang: "de", page: "intro" }
]
```

Rules:

- `paths` is evaluated at build time from literals, constants, imported JSON and functions. Each value must be a non-empty string or number without `/`, `\`, `?` or `#`, and every combination must be unique.
- Interactive dynamic pages share one JavaScript bundle; the current params are embedded as JSON and read at startup, so `slug` works in event handlers too.
- In the dev server every generated page is served at its URL and updates on save.
