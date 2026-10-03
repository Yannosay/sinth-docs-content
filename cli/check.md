---
title: sinth check
description: Lint without emitting files.
---

Type-check and lint your Sinth project without generating output files.

## Basic Usage

```bash
sinth check              # Check all pages
sinth check pages/index.sinth  # Check specific file
```

## What It Checks

- **Type errors** — Variable types, function signatures
- **Missing imports** — Unresolved component imports
- **Unused variables** — Declared but never used
- **Syntax errors** — Invalid Sinth syntax
- **Native function calls** — Argument count, types
- **Component props** — Required parameters provided

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--out <dir>` | Output directory (for resolving imports) | `./dist` |

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | All checks passed |
| 1 | Errors found |

## Usage

```bash
# Check entire project
sinth check

# Check specific file
sinth check pages/dashboard.sinth

# In CI
sinth check || exit 1
```

## Example Output

```bash
$ sinth check
  ✓ pages/index.sinth
  ✓ pages/about.sinth
  ✗ pages/dashboard.sinth
    Error: Variable 'user' is used but never declared.
      at: pages/dashboard.sinth (line 15, col 10)
```

## CI Integration

### GitHub Actions

```yaml
- name: Type Check
  run: npx sinth check
```

### GitLab CI

```yaml
typecheck:
  stage: test
  script:
    - npx sinth check
```

### Pre-commit Hook

```bash
# .husky/pre-commit
npx sinth check
```

## Watch Mode

```bash
# Watch for changes and re-check
npx chokidar "**/*.sinth" -c "npx sinth check"
```

## What It Doesn't Check

- Runtime errors (API calls, user input)
- CSS syntax (use stylelint)
- JavaScript syntax in script blocks (use eslint)
- Accessibility (use axe-core)

## Performance

- Fast: No file I/O for output
- Incremental: Only re-checks changed files (with watch)
- Parallel: Checks pages in parallel

## Next Steps

- [sinth build](/docs/cli/build)
- [sinth dev](/docs/cli/dev)
- [Type Safety](/docs/guides/typescript)