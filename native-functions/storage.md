---
title: Local & Session Storage
description: Persist data in the browser.
---

Browser storage APIs for client-side persistence.

## localStorage

Persistent storage (survives browser restart):

```sinth
-- Save
localStorage.setItem("theme", "dark")
localStorage.setItem("user", JSON.stringify({ name: "Alice" }))

-- Load
var str theme = localStorage.getItem("theme") ?? "light"
var obj user = JSON.parse(localStorage.getItem("user") ?? "null")

-- Remove
localStorage.removeItem("theme")

-- Clear all
localStorage.clear()

-- Iterate
var str key = localStorage.key(0)  -- First key
var num length = localStorage.length
```

## sessionStorage

Session-only storage (cleared on tab close):

```sinth
sessionStorage.setItem("temp", "value")
var str temp = sessionStorage.getItem("temp")
sessionStorage.removeItem("temp")
sessionStorage.clear()
```

## Storage Wrapper

```sinth
script {
  var Storage = {
    get: (key, defaultValue = null) => {
      try {
        var val = localStorage.getItem(key)
        return val ? JSON.parse(val) : defaultValue
      } catch { return defaultValue }
    },
    
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (e) {
        console.error("Storage full:", e)
      }
    },
    
    remove: (key) => localStorage.removeItem(key),
    clear: () => localStorage.clear()
  }
  
  -- Session storage variant
  var SessionStorage = {
    get: (key, defaultValue = null) => {
      try {
        var val = sessionStorage.getItem(key)
        return val ? JSON.parse(val) : defaultValue
      } catch { return defaultValue }
    },
    set: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
    remove: (key) => sessionStorage.removeItem(key),
    clear: () => sessionStorage.clear()
  }
}

-- Usage
var obj settings = Storage.get("settings", { theme: "light" })
Storage.set("settings", { ...settings, theme: "dark" })
```

## Reactive Storage

```sinth
page
var str theme = localStorage.getItem("theme") ?? "light"

script {
  function setTheme(str t) {
    theme = t
    localStorage.setItem("theme", t)
    document.documentElement.setAttribute("data-theme", t)
    sinthRender()
  }
}

Button(onClick: setTheme("dark")) { "Dark" }
Button(onClick: setTheme("light")) { "Light" }
```

## Storage Events

```sinth
script {
  window.addEventListener("storage", (e) => {
    if (e.key == "theme") {
      theme = e.newValue ?? "light"
      sinthRender()
    }
  })
}
```

## Storage Quota

```sinth
script {
  function getStorageInfo() {
    if (navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then((estimate) => {
        console.log("Used:", estimate.usage)
        console.log("Quota:", estimate.quota)
      })
    }
  }
}
```

## Persistent Form State

```sinth
page
var obj formData = JSON.parse(localStorage.getItem("formDraft") ?? "{}")

script {
  function saveDraft() {
    localStorage.setItem("formDraft", JSON.stringify(formData))
  }
  
  function clearDraft() {
    localStorage.removeItem("formDraft")
    formData = {}
    sinthRender()
  }
}

Form(onInput: saveDraft) {
  Input(model: formData.name, placeholder: "Name")
  Input(type: "email", model: formData.email, placeholder: "Email")
  Textarea(model: formData.message, placeholder: "Message")
  
  Div(class: "actions") {
    Button(type: "submit") { "Submit" }
    Button(onClick: clearDraft) { "Clear Draft" }
  }
}
```

## IndexedDB (Advanced)

```sinth
script {
  function openDB() {
    return new Promise((resolve, reject) => {
      var request = indexedDB.open("MyDB", 1)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
      request.onupgradeneeded = (e) => {
        var db = e.target.result
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "id" })
        }
      }
    })
  }
  
  async function saveUser(obj user) {
    var db = await openDB()
    var tx = db.transaction("users", "readwrite")
    tx.objectStore("users").put(user)
    return new Promise((resolve, reject) => {
      tx.oncomplete = resolve
      tx.onerror = () => reject(tx.error)
    })
  }
  
  async function getUser(num id) {
    var db = await openDB()
    var tx = db.transaction("users", "readonly")
    var request = tx.objectStore("users").get(id)
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
}
```

## Best Practices

1. **JSON serialize objects** — Storage only stores strings
2. **Handle quota errors** — Catch `QuotaExceededError`
3. **Use sessionStorage** for temporary data
3. **Sync across tabs** — Listen to `storage` event
4. **Clear old data** — Implement expiration

## Next Steps

- [Date & Time](/docs/native-functions/date)
- [Fetch & Network](/docs/native-functions/fetch)
- [Offline Apps](/docs/guides/offline)