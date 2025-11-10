# @svelte-safe-html/core

> 🔒 Detect unsafe `{@html}` usages in Svelte components — compatible with Svelte 3, 4, and 5 (legacy mode).

[![npm version](https://img.shields.io/npm/v/@svelte-safe-html/core.svg?color=33cd56)](https://www.npmjs.com/package/@svelte-safe-html/core)
[![License](https://img.shields.io/npm/l/@svelte-safe-html/core.svg)](LICENSE)
[![Tests](https://github.com/patel-vansh/svelte-safe-html-core/actions/workflows/tests.yml/badge.svg)](https://github.com/patel-vansh/svelte-safe-html-core/actions)

## ✨ Overview

Svelte allows rendering raw HTML via the `{@html ...}` tag, which can expose your app to **XSS attacks** if the content isn’t sanitized.

This package statically analyzes `.svelte` files and detects unsafe `{@html}` insertions that:
- Don’t use a sanitizer function (like `sanitize()` or `escapeHtml()`).
- Aren’t explicitly ignored with `<!-- svelte-ignore unsafe_html -->`.

Compatible with:
- ✅ Svelte 3  
- ✅ Svelte 4  
- ✅ Svelte 5 (legacy)  
- ⚙️ Runes mode support coming soon

## 🚀 Installation

```bash
npm install @svelte-safe-html/core --save-dev
```
Or
```pnpm
pnpm add -D @svelte-safe-html/core
```
---

Since Svelte is a peer dependency, make sure it’s installed in your project:
```bash
npm install svelte
```

## 🧠 Usage
```js
import { findUnsafeHtml } from '@svelte-safe-html/core';
import fs from 'fs';

const code = fs.readFileSync('src/App.svelte', 'utf8');

const result = findUnsafeHtml(code, 'App.svelte', ['sanitize', 'escape']);

console.log(result);
/*
{
  filename: 'App.svelte',
  parsed: true,
  error: null,
  warnings: [
    {
      filename: 'App.svelte',
      start: { line: 10, column: 8 },
      end: { line: 10, column: 40 },
      message: 'Unsafe raw HTML insertion without sanitizer'
    }
  ]
}
*/
```

## ⚙️ API
`findUnsafeHtml(code, filename, ignoreFunctions?, runes?)`
| Parameter | Type | Description |
|:---:|:---:|:---:|
| `code` | `string` | The Svelte source code to analyze. |
| `filename` | `string` | Used for warning messages. |
| `ignoreFunctions` | `string[]` (optional) | Array of sanitizer functions to treat as safe. |
| `runes` | `boolean` (optional, default = false) | Enables parsing in Svelte 5 runes mode. |

#### Returns:
```ts
{
    filename: string;
    parsed: boolean;
    error: Error | null;
    warnings: {
        filename: string;
        start: {
            line: number;
            column: number;
        };
        end: {
            line: number;
            column: number;
        };
        message: string;
    }[];
}
```

## 🧪 Testing
To run the full compatibility suite locally:
```bash
npm run test:all
```
This will:
- Install and test against Svelte 3, 4, and 5 (legacy)
- Run all fixture-based tests using Vitest

You can also run tests for one specific version (inside its folder):
```bash
cd tests/svelte4
npm test
```

## 🧩 Roadmap
- [ ] Svelte 5 runes mode support

## License
[MIT License](LICENSE)

## Contribute
If you have ideas, suggestions, or found issues — PRs are welcome!
Let’s make Svelte security simpler and safer for everyone 🚀