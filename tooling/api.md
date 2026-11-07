---
title: "Programmatic API"
description: "Using the compiler from JavaScript."
---

```js
const { loadConfig, Project, buildProject, checkProject, parseSinth } = require("@yannosay/sinth");

const root = process.cwd();
const { config } = loadConfig(root, "production");
const project = new Project(root, config, false);

const result = await buildProject(project, { write: true });
console.log(result.pages.map(p => p.page.route));

const { errors, warnings } = checkProject(project);
const ast = parseSinth(source, "file.sinth");
```

Errors are `SinthError` instances with `code`, `loc` and `diagnostic`; `formatDiagnostic(diagnostic, color)` renders them like the CLI does.
