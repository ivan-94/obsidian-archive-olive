# Changelog

All notable changes to Archive Olive are documented here.

The project follows [Semantic Versioning](https://semver.org/). During beta, minor releases may contain material visual changes.

## [Unreleased]

No unreleased changes.

## [0.1.0] - 2026-07-25

### Added

- Initial Archive Olive theme implementation.
- Light and dark brutalist visual systems.
- Styling for the workspace shell, Markdown editor, reading view, properties, callouts, tables, code, Graph, Canvas, and Bases.
- Isolated fixture vault, automated policy checks, and macOS visual-validation evidence.
- MIT-licensed source and BRAT installation, update, removal, troubleshooting, and issue-reporting documentation.
- Automated repository and release-readiness validation.
- Structured bug and cross-platform acceptance forms.
- A canonical BRAT Beta release specification under `docs/specs/`.
- A public-safe `512 × 288` beta release image derived from the validated fixture vault.
- A clean-vault BRAT `2.2.0` lifecycle smoke test covering installation, changed stylesheet and manifest delivery, light/dark activation, unregistration, disabling, and removal.
- A reproducible cross-platform HAT guide and post-release human-acceptance report.

### Changed

- Set the beta compatibility floor to the tested Obsidian version `1.12.7`.
- Added the project author URL to `manifest.json`.
- Pinned repository-local Prettier settings so local and GitHub Actions formatting checks agree.
- Marked `main/theme.css` as the active BRAT channel.

### Known limitations

- Real Windows, Linux, iOS, and Android validation is pending.
- Owner-led BRAT visual acceptance remains scheduled after pre-release publication.
- The theme is not yet listed in the official Obsidian community theme directory.
- Community-plugin-specific styling is intentionally limited during the first beta.

## Source Manifest

### Sources

- User direction in this Codex thread: begin implementing the BRAT Beta release specification.
- User confirmation in this Codex thread: use the MIT license.
- [`docs/specs/brat-beta-release.md`](docs/specs/brat-beta-release.md).
- Existing Git history and [`VALIDATION.md`](VALIDATION.md).

### Produced artifacts

- `CHANGELOG.md`
- `LICENSE`

### Key decisions

- `0.1.0` records the initial locally validated theme.
- `0.1.0` is an opt-in GitHub pre-release; pilot acceptance remains required before broader announcement or official-directory submission.

[Unreleased]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.0...HEAD
[0.1.0]: https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.0
