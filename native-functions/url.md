---
title: URL & Encoding
description: URL, URLSearchParams, encode/decode URI.
---

URL manipulation and encoding utilities.

## URL Class

```sinth
var obj url = new URL("https://example.com/path?name=value#hash")

url.href           -- Full URL
url.origin         -- "https://example.com"
url.protocol       -- "https:"
url.host           -- "example.com"
url.hostname       -- "example.com"
url.port           -- ""
url.pathname       -- "/path"
url.search         -- "?name=value"
url.hash           -- "#hash"
url.username       -- ""
url.password       -- ""
```

## URLSearchParams

```sinth
var obj params = new URLSearchParams("name=Alice&age=30")
params.get("name")        -- "Alice"
params.getAll("name")     -- ["Alice"]
params.has("age")         -- true
params.set("city", "NYC")
params.append("tag", "dev")
params.delete("age")
params.toString()         -- "name=Alice&city=NYC&tag=dev"

-- Iterate
for (pair in params) { console.log(pair) }
for (key of params.keys()) { }
for (value of params.values()) { }
```

## Building URLs

```sinth
var obj url = new URL("/api/users", "https://example.com")
url.searchParams.set("page", "2")
url.searchParams.set("limit", "20")

fetch(url.toString())
```

## Relative URLs

```sinth
var obj base = new URL("https://example.com/base/")
var obj relative = new URL("../other/page", base)
relative.href  -- "https://example.com/other/page"
```

## Encoding

```sinth
-- Full URI
encodeURI("https://example.com/path with spaces")
-- "https://example.com/path%20with%20spaces"

decodeURI("https://example.com/path%20with%20spaces")
-- "https://example.com/path with spaces"

-- URI Component (more aggressive)
encodeURIComponent("name=value&other=1")
-- "name%3Dvalue%26other%3D1"

decodeURIComponent("name%3Dvalue%26other%3D1")
-- "name=value&other=1"
```

## When to Use Which

| Function | Use Case |
|----------|----------|
| `encodeURI` | Full URLs (preserves : / ? # & =) |
| `encodeURIComponent` | Query values, path segments |
| `URLSearchParams` | Building query strings |
| `URL` | Parsing/manipulating full URLs |

## Practical Examples

### Query String Builder

```sinth
function buildQuery(obj params) -> str {
  var obj search = new URLSearchParams()
  for (key in Object.keys(params)) {
    if (params[key] != null) {
      search.set(key, String(params[key]))
    }
  }
  return search.toString()
}

buildQuery({ page: 2, limit: 20, sort: "name" })
-- "page=2&limit=20&sort=name"
```

### Parse Query String

```sinth
function parseQuery(str query) -> obj {
  var obj params = new URLSearchParams(query)
  var obj result = {}
  for (key of params.keys()) {
    var values = params.getAll(key)
    result[key] = values.length == 1 ? values[0] : values
  }
  return result
}

parseQuery("?page=2&tags=web&tags=dev")
-- { page: "2", tags: ["web", "dev"] }
```

### Modify Current URL

```sinth
function updateURL(obj params) {
  var obj url = new URL(window.location.href)
  for (key in Object.keys(params)) {
    if (params[key] == null) {
      url.searchParams.delete(key)
    } else {
      url.searchParams.set(key, String(params[key]))
    }
  }
  window.history.pushState({}, "", url)
}

updateURL({ page: 3, filter: "active" })
```

### Validate URL

```sinth
function isValidURL(str url) -> bool {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

isValidURL("https://example.com")  -- true
isValidURL("not a url")            -- false
```

### Extract Domain

```sinth
function getDomain(str url) -> str {
  return new URL(url).hostname
}

getDomain("https://sub.example.com/path")  -- "sub.example.com"
```

## Encoding Best Practices

1. **User input in URLs** — Always `encodeURIComponent`
2. **Query parameters** — Use `URLSearchParams`
3. **Full URLs** — Use `URL` class
4. **Double encoding** — Avoid by using proper tools

```sinth
-- Wrong
var str url = "/search?q=" + userInput

-- Right
var str url = "/search?q=" + encodeURIComponent(userInput)

-- Better
var obj search = new URLSearchParams()
search.set("q", userInput)
var str url = "/search?" + search.toString()
```

## Next Steps

- [Fetch & Network](/docs/native-functions/fetch)
- [Date & Time](/docs/native-functions/date)
- [URL Routing](/docs/guides/routing)