# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Added [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file to establish community guidelines.
- Added [CONTRIBUTING.md](CONTRIBUTING.md) file to provide contribution guidelines for the project.
- Added [SECURITY.md](SECURITY.md) file to outline security policies and procedures.
- Added [PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md) to standardize pull request submissions.
- Added [ISSUE_TEMPLATE](.github/ISSUE_TEMPLATE/) directory containing templates for bug reports and feature requests.
- Added GitHub Dependabot configuration file [.github/dependabot.yml](.github/dependabot.yml) to automate dependency updates.
- Added [.editorconfig](.editorconfig) file to maintain consistent coding styles across different editors and IDEs.
- Added [CODEOWNERS](.github/CODEOWNERS) file to define code ownership and review responsibilities.
- Added Unreleased section in [CHANGELOG.md](CHANGELOG.md) for upcoming changes.

### Changed
- 

### Deprecated
- 

### Removed
- 

### Fixed
- 

### Security
- 


## [1.0.5] (2026-01-09)
### Changed
- Relocated type definitions from `types/index.d.ts` to `src/index.d.ts` for better co-location with source files.
- Updated `package.json` to properly expose types via the `exports` field and adjusted the `files` whitelist.


## [1.0.4] (2025-11-11)
### Changed
- The version of @rollup dependencies to **4.53.2** in package-lock.json files of [svelte3/package-lock.json](tests/svelte3/package-lock.json), [svelte4/package-lock.json](tests/svelte4/package-lock.json) and [svelte5-legacy/package-lock.json](tests/svelte5-legacy/package-lock.json)
- In svelte5-legacy tests' [package-lock.json](tests/svelte5-legacy/package-lock.json), changed the svelte version to **5.43.6**


## [1.0.3] (2025-11-10)
### Changed
- Changed the [test.yml](.github/workflows/test.yml) file to only trigger on src, tests and self changes.


## [1.0.1] (2025-11-10)
### Added
- Added [CHANGELOG.md](CHANGELOG.md) file for better version maintainability.


## [1.0.0] (2025-11-10)
### Added
- Initial release with Svelte 3, 4, and 5-legacy support


[Unreleased]: https://github.com/patel-vansh/svelte-safe-html-core/compare/v1.0.5...HEAD
[1.0.5]: https://github.com/patel-vansh/svelte-safe-html-core/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/patel-vansh/svelte-safe-html-core/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/patel-vansh/svelte-safe-html-core/compare/v1.0.1...v1.0.3
[1.0.1]: https://github.com/patel-vansh/svelte-safe-html-core/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/patel-vansh/svelte-safe-html-core/releases/tag/v1.0.0