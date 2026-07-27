# Changelog

All notable changes to Archive Olive are documented here.

The project follows [Semantic Versioning](https://semver.org/). During beta, minor releases may contain material visual changes.

## [Unreleased]

No unreleased changes.

## [0.1.6] - 2026-07-27

### Added

- Added the file-explorer visual hierarchy specification, theme-only desktop,
  iPad, and iPhone design references, and isolated desktop runtime evidence.
- Added regression checks for generated root numbering, folder/file hierarchy,
  right-aligned disclosure controls, full-width rows, natural active-file
  geometry, and marker-free file states.

### Changed

- Reworked the native file explorer into an editorial hierarchy without
  changing folder names or Obsidian's tree behavior: top-level folders receive
  generated two-digit sequence markers, nested folders retain a folder glyph,
  and files remain visually lightweight.
- Moved folder disclosure state to a shared trailing `+`/`−` slot, reclaimed
  the former leading gutter, removed persistent guide rails, and allowed row
  surfaces to span the file-list container.
- Simplified the active file to its natural row height with only a paper or
  recessed surface and stronger text weight.

### Fixed

- Aligned same-depth file text with the first visible marker of sibling folders
  while preserving truncation, disclosure hit areas, and horizontal overflow
  safety.
- Removed the cyan active/hover marker and detached-card treatment from file
  rows.

## [0.1.5] - 2026-07-26

### Added

- Added optional Style Settings integration with four independently selectable
  light colorways and four independently selectable dark colorways.
- Added complete semantic ramps, syntax colors, graph colors, mobile inputs, and
  WCAG AA regression checks for all eight colorways.
- Added the canonical colorway contract under
  [`docs/specs/colorways.md`](docs/specs/colorways.md).

### Changed

- Unified the Markdown editing and reading surface to pure black across all four
  dark colorways while retaining their distinct surrounding workspace palettes.
- Removed persistent desktop and iPad titlebar, tab-strip, view-header, ribbon,
  pane, and tab-item divider lines while preserving resize affordances on hover
  and leaving iPhone chrome unchanged.

## [0.1.4] - 2026-07-26

### Fixed

- Separated the dark-mode Markdown body from the surrounding olive-black chrome with a pure-black editing and reading surface on desktop, iPhone, and iPad.
- Replaced offset shadows on mobile header and drawer controls with inset state rules so 44 px touch targets no longer cover pane dividers.
- Kept mobile metadata content inside its parent border by neutralizing the phone-only negative transform and oversized width.
- Removed remaining phone-specific rounding from the drawer selector, every visible layer of the editor action strip, prompts, search fields, and form controls.
- Flattened expanded iOS drawer menu padding to a single frame and matched the fixed active selector to one list row so it cannot cover the next option on iPhone or iPad.
- Vertically centered the mobile vault selector label and chevron.
- Removed redundant iOS drawer and iPhone view-header dividers while preserving component borders and active-state rules.
- Restored the light iPad safe-area and sidebar-control contrast, prevented paired drawers from overlapping, squared tablet selection states, and made light-mobile callout labels readable.
- Released the iPad drawer gutter when the ribbon is hidden and kept the drawer switcher at a stable 52 px height while expanded.
- Moved the absolute iPad drawer option list below its static active selector so the frame and the first “File explorer” option remain visible.

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
- User direction in this Codex task to retain all approved light and dark
  colorways, write their specification, and implement them.
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
- `0.1.4` follows the real-device iOS review with stable drawer geometry, visible navigation options, tablet-safe chrome, and a pure-black dark Markdown surface across desktop, iPhone, and iPad.
- `0.1.5` keeps Archive Olive and Archive Night as
  plugin-free defaults while exposing independent optional selectors through
  Style Settings, adds six alternate colorways, and standardizes every dark
  Markdown body on pure black.
- `0.1.6` keeps the native Obsidian file tree and introduces the approved
  CSS-only editorial hierarchy after isolated desktop validation; real-device
  iPhone/iPad and large-vault virtual-scroll review remain pending.

[Unreleased]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.6...HEAD
[0.1.6]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.5...0.1.6
[0.1.5]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.4...0.1.5
[0.1.4]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.3...0.1.4
[0.1.3]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.2...0.1.3
[0.1.2]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.1...0.1.2
[0.1.1]: https://github.com/ivan-94/obsidian-archive-olive/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.0
