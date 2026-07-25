# Changelog

All notable changes to Archive Olive are documented here.

The project follows [Semantic Versioning](https://semver.org/). During beta, minor releases may contain material visual changes.

## [Unreleased]

No unreleased changes.

## [0.1.3] - 2026-07-25

### Fixed

- Restored high-contrast tooltip and notice foregrounds in both light and dark modes while preserving the theme's hard borders and offset shadows.
- Replaced Obsidian's low-contrast dark-mobile interactive remapping with mobile-scoped semantic surfaces for menus, drawer tabs, search prompts, settings navigation, and form fields.
- Made mobile search surfaces opaque and added explicit, readable `.mobile-tap`, selected, active, label, and disabled states.
- Removed non-semantic mobile pill geometry while preserving 44 px touch targets and iOS safe-area behavior.

### Changed

- Required Obsidian runtime and visual acceptance to use the isolated repository `test-vault/` instead of personal vaults.

## [0.1.2] - 2026-07-25

### Fixed

- Kept active side-dock controls visually selected after pane or window focus changes by restoring their olive surface and cyan state rule.
- Preserved readable title-bar navigation and tab-list controls across hover, active, menu-open, and blurred states.
- Kept Markdown table headers readable while Obsidian activates column handles or its inline table editor.
- Added regression policy and light/dark contrast checks for focused chrome and interactive table headers.

## [0.1.1] - 2026-07-25

### Fixed

- Restored high-contrast navigation and tab-list icons on carbon application chrome.
- Raised inactive root-tab and side-dock-tab labels and icons to surface-appropriate AA contrast.
- Made the vault-switcher chevron inherit the foreground of its olive profile block.
- Added semantic chrome foreground tokens and six regression contrast pairs covering light and dark application chrome.

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
- User screenshots from BRAT-installed `0.1.0` showing low-contrast navigation, tab-list, inactive-tab, and vault-switcher states.
- User screenshot in this Codex thread showing low-contrast tooltips and notices.
- User direction in this Codex thread to perform Obsidian acceptance only in the repository `test-vault/`.
- User direction and iPhone audit evidence in [`docs/specs/mobile-ios-visual-hardening.md`](docs/specs/mobile-ios-visual-hardening.md).
- [`docs/specs/brat-beta-release.md`](docs/specs/brat-beta-release.md).
- Existing Git history and [`VALIDATION.md`](VALIDATION.md).

### Produced artifacts

- `CHANGELOG.md`
- `LICENSE`

### Key decisions

- `0.1.0` records the initial locally validated theme.
- `0.1.0` is an opt-in GitHub pre-release; pilot acceptance remains required before broader announcement or official-directory submission.
- `0.1.1` is a focused accessibility patch; it does not change the palette, layout, or compatibility floor.
- `0.1.2` completes the interaction-state repair without changing the palette, layout, compatibility floor, or BRAT channel.
- `0.1.3` ships mobile-scoped visual hardening for owner-led iPhone acceptance while preserving the accepted desktop baseline.

[Unreleased]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.3...HEAD
[0.1.3]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.2...0.1.3
[0.1.2]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.1...0.1.2
[0.1.1]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.0
