# Contributing to @svelte-safe-html/core

First off, thank you for considering contributing to `@svelte-safe-html/core`! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat everyone with respect and kindness.

## 🐞 Bug Reports & Feature Requests

**Found a bug?**
Please open a **Bug Report** using the issue template. Be sure to include:
- The version of `@svelte-safe-html/core` you are using.
- The version of Svelte (3, 4, or 5) you are using.
- A minimal reproduction of the issue (e.g., a code snippet or a REPL link).

**Have an idea?**
We welcome new features! Please open a **Feature Request** issue to discuss your idea before writing any code. This ensures your work aligns with the project's roadmap and prevents wasted effort.

## 🛠️ Development Workflow

To start hacking on the code, follow these steps:

### 1. Fork and Clone
Fork the repository to your GitHub account, then clone it locally:

```bash
git clone https://github.com/patel-vansh/svelte-safe-html-core.git
cd svelte-safe-html-core
```

### 2. Install Dependencies
Make sure you have Node.js (>=18) installed. Then, install the project dependencies:

```bash
npm install
```

### 3. Create a New Branch
Create a new branch for your feature or bug fix. We generally follow the pattern `type/short-description`:

```bash
# Examples:
git checkout -b fix/xss-detection-bug
git checkout -b feat/support-new-attribute
git checkout -b chore/update-docs
```

### 4. Make Your Changes
- **Source Code:** The source code is located in the src directory.
- **Types:** TypeScript definitions are located in types/index.d.ts. If you change the API, please update the types.
- **Formatting:** Ensure your code is formatted correctly (we use Prettier/standard formatting).

### 5. Write Tests
We use Vitest for testing. Please add tests for any new features or bug fixes you implement. Tests are located in the [tests](tests/) directory.

Run all tests with:
```bash
npm run test:all
```

### 6. Commit Conventions
We follow the Conventional Commits specification.

Format: `<type>(<scope>): <subject>`

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

Examples:
```
feat(parser): add support for new HTML attribute
fix(sanitizer): resolve XSS vulnerability in input handling
docs: update contributing guidelines
```

### 7. Push and Create a Pull Request
1. Push your changes to your forked repository:
    ```bash
    git push origin your-branch-name
    ```

2. Then, open a Pull Request (PR) against the respective branch of the original repository. Please provide a clear description of your changes and reference any related issues.

3. Ensure all checks pass and address any feedback from maintainers. We try to review PRs promptly, but please be patient.

### LICENSE
By contributing, you agree that your contributions will be licensed under the project's [License](LICENSE).

## 🎉 Thank You!