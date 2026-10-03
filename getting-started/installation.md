---
title: Installation
description: Install the Sinth CLI globally via NPM.
---

Install the CLI once with npm:

```bash
npm install -g @yannosay/sinth
```

::: tip
Why globally? Sinth Compiler (Sinth 5) is a CLI tool, meaning you should have access to it from everywhere on your PC for easier usage! (Sinth 4 and Sinth 5 will probably not work at all if installed not globally.)
:::

Nice! Already done!
You should see something like this:

```bash
sinth version
# Sinth Compiler v5.0.0
```

### Requirements

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ (comes with Node.js)

::: warning
Sinth 5 requires Node.js 18 or higher. Older versions will fail with cryptic errors.
:::

### Verify Installation

```bash
sinth --version
# Sinth Compiler v5.0.0
```

If you see the version, you're ready to go!

### Alternative: npx (No Global Install)

For quick trials without a global install:

```bash
npx @yannosay/sinth@latest init my-project
cd my-project
npx @yannosay/sinth dev
```

### Updating Sinth

```bash
sinth update
# or
npm install -g @yannosay/sinth@latest
```

The `sinth update` command checks the npm registry and updates globally if a newer version exists.

### Shell Completions (Optional)

Generate shell completions for faster CLI usage:

```bash
# Bash
sinth completion bash >> ~/.bashrc

# Zsh
sinth completion zsh >> ~/.zshrc

# Fish
sinth completion fish >> ~/.config/fish/completions/sinth.fish
```

::: note
Shell completions require Sinth 5.1+. If the command doesn't exist, update first.
:::