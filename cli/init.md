---
title: sinth init
description: Scaffold a new project.
---

Create a new Sinth project with interactive scaffolding.

## Basic Usage

```bash
sinth init                    # Interactive
sinth init my-app            # With name
sinth init my-app --preset full  # Skip prompts
```

## Presets

| Preset | Description |
|--------|-------------|
| `basic` | Single page + component |
| `full` | Multi-page, components, SCSS demo |
| `blank` | Folders + config only |

## Interactive Mode

```bash
$ sinth init

✨ Welcome to Sinth project setup!

 Project name: my-app
 Select preset: ▸ basic
                  full
                  blank

✨ Success!

  Project name:  my-app
  Preset:        basic
✓ my-app scaffolded at my-app/ in 0.42s

 Get started:
   sinth dev
```

## Generated Structure

### Basic Preset

```
my-app/
├── pages/
│   └── index.sinth
├── components/
│   └── Navbar.sinth
├── styles/
│   └── reset.css
├── libraries/
├── assets/
├── sinth.config.json
├── package.json
└── .gitignore
```

### Full Preset

```
my-app/
├── pages/
│   ├── index.sinth
│   └── about.sinth
├── components/
│   ├── Navbar.sinth
│   ├── Card.sinth
│   └── Hero.sinth
├── styles/
│   ├── reset.css
│   ├── variables.scss
│   └── theme.scss
├── libraries/
│   └── ui/
├── assets/
├── sinth.config.json
├── package.json
└── .gitignore
```

## Options

| Flag | Description |
|------|-------------|
| `--preset <name>` | Skip prompt: `basic`, `full`, `blank` |
| `--no-install` | Skip npm install |

## Non-Interactive

```bash
sinth init my-app --preset full
sinth init my-app --preset basic --no-install
```

## Custom Presets

Create `~/.sinth/presets/custom.json`:

```json
{
  "name": "custom",
  "description": "My custom preset",
  "files": {
    "pages/index.sinth": "custom-index.sinth",
    "components/Layout.sinth": "layout.sinth"
  }
}
```

Then use: `sinth init my-app --preset custom`

## Post-Init

```bash
cd my-app
npm install          # If --no-install used
sinth dev            # Start development
```

## Template Variables

Templates support variables:

```sinth
-- {{projectName}} component
component {{componentName}} {
  {{content}}
}
```

Variables:
- `{{projectName}}` — Project name
- `{{componentName}}` — Component name
- `{{year}}` — Current year

## Next Steps

- [sinth dev](/docs/cli/dev)
- [Project Structure](/docs/getting-started/project-structure)
- [Configuration](/docs/cli/config)