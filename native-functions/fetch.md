---
title: Fetch & Network
description: Make HTTP requests with fetch.
---

Modern HTTP requests with the Fetch API.

## Basic Requests

```sinth
-- GET
var obj response = await fetch("/api/users")
var obj data = await response.json()

-- POST
var obj response = await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice" })
})
var obj created = await response.json()
```

## Request Options

```sinth
fetch(url, {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  },
  body: JSON.stringify(data),  -- or FormData, Blob, string
  mode: "cors" | "no-cors" | "same-origin",
  credentials: "omit" | "same-origin" | "include",
  cache: "default" | "no-store" | "reload" | "force-cache",
  redirect: "follow" | "error" | "manual",
  referrer: "client" | "no-referrer",
  integrity: "sha256-...",
  keepalive: false,
  signal: abortSignal
})
```

## Response Handling

```sinth
var obj response = await fetch("/api/data")

-- Status
response.ok          -- true if 200-299
response.status      -- 200, 404, 500...
response.statusText  -- "OK", "Not Found"

-- Headers
response.headers.get("Content-Type")
response.headers.get("X-Custom-Header")

-- Body (use once!)
var obj json = await response.json()
var str text = await response.text()
var obj blob = await response.blob()
var obj formData = await response.formData()
var obj arrayBuffer = await response.arrayBuffer()
```

## Error Handling

```sinth
async function fetchWithErrorHandling(url) {
  var obj response = await fetch(url)
  
  if (!response.ok) {
    if (response.status == 404) throw "Not found"
    if (response.status == 401) throw "Unauthorized"
    if (response.status >= 500) throw "Server error"
    throw "HTTP " + response.status
  }
  
  return await response.json()
}

try {
  var obj data = await fetchWithErrorHandling("/api/users")
} catch (e) {
  console.error("Fetch failed:", e)
  showError(e)
}
```

## Timeout

```sinth
function fetchWithTimeout(url, options = {}, ms = 5000) {
  var controller = new AbortController()
  var timeout = setTimeout(() => controller.abort(), ms)
  
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeout))
}
```

## Retry Logic

```sinth
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (var i = 0; i <= retries; i++) {
    try {
      return await fetch(url, options)
    } catch (e) {
      if (i == retries) throw e
      await delay(1000 * (i + 1))  -- Exponential backoff
    }
  }
}
```

## File Upload

```sinth
async function uploadFiles(files) {
  var formData = new FormData()
  for (file in files) {
    formData.append("files", file)
  }
  
  var response = await fetch("/api/upload", {
    method: "POST",
    body: formData  -- Don't set Content-Type!
  })
  
  return await response.json()
}
```

## Download File

```sinth
async function downloadFile(url, filename) {
  var response = await fetch(url)
  var blob = await response.blob()
  
  var obj link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  
  URL.revokeObjectURL(link.href)
}
```

## Progress Tracking

```sinth
async function fetchWithProgress(url, onProgress) {
  var response = await fetch(url)
  var reader = response.body.getReader()
  var contentLength = +response.headers.get("Content-Length")
  
  var received = 0
  var chunks = []
  
  while (true) {
    var { done, value } = await reader.read()
    if (done) break
    
    chunks.push(value)
    received += value.length
    onProgress(received / contentLength)
  }
  
  var allChunks = new Uint8Array(received)
  var offset = 0
  for (chunk in chunks) {
    allChunks.set(chunk, offset)
    offset += chunk.length
  }
  
  return new Blob([allChunks])
}
```

## WebSocket Alternative

```sinth
-- For real-time, use WebSocket
var obj ws = new WebSocket("wss://api.example.com/ws")

ws.onopen = () => console.log("Connected")
ws.onmessage = (e) => console.log("Message:", e.data)
ws.onclose = () => console.log("Disconnected")
ws.onerror = (e) => console.error("Error:", e)

ws.send(JSON.stringify({ type: "ping" }))
ws.close()
```

## Best Practices

1. **Always check `response.ok`** — 4xx/5xx don't throw
2. **Read body once** — Streams are single-use
3. **Use `AbortController`** — For cancellation
4. **Handle network errors** — Offline, CORS, timeout
5. **Set appropriate headers** — Content-Type, Authorization

## Next Steps

- [URL & Encoding](/docs/native-functions/url)
- [WebSocket](/docs/guides/websockets)
- [Offline Support](/docs/guides/offline)