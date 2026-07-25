# Archive Olive Validation Report

Date: 2026-07-25

Build: `0.1.2`

Runtime: Obsidian Desktop `1.12.7`, macOS

Vault: isolated repository fixture at `test-vault/`

## Outcome

Archive Olive passes the [`docs/specs/theme.md`](docs/specs/theme.md) definition of done for a first usable build. All P0 requirements pass locally. P1 core surfaces also pass on the local desktop runtime and Obsidian mobile emulation, but public `1.0.0` remains gated by real-device, cross-platform, minimum-version, release-tag, and community-directory checks.

The final implementation has no remote assets, `@import`, routine `!important`, or `:has()` selectors. Obsidian reported no captured runtime or console errors after the final verification cycle.

## P0 requirement matrix

| ID     | Status | Evidence                                                                                                                                                            |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AO-001 | Pass   | `manifest.json` and `theme.css` load as Archive Olive `0.1.2`; final developer error buffer is empty.                                                               |
| AO-002 | Pass   | Light and dark computed surface, text, active-tab, and active-file colors changed coherently; see workspace screenshots.                                            |
| AO-003 | Pass   | Ribbon, tab strip, sidebars, editor, status bar, title bar, and pane dividers form a continuous square grid.                                                        |
| AO-004 | Pass   | Active file uses an olive fill plus a carbon inset rule; active root tab uses cyan plus a heavy bottom rule; inactive root and side-dock tabs remain legible.       |
| AO-005 | Pass   | Fixture content was reviewed in Live Preview and Reading View with headings, lists, tasks, quotes, callouts, code, tables, tags, properties, and links.             |
| AO-006 | Pass   | Pure Source Mode exposes readable Markdown/YAML syntax, visible selection, and an oxblood caret.                                                                    |
| AO-007 | Pass   | Command palette, quick switcher, settings dialog, native file menu, notices, inputs, tooltips, and dropdown rules were exercised or inspected.                      |
| AO-008 | Pass   | Default, hover, active, selected, focus-visible, and disabled treatments use borders, offsets, or geometry as well as color.                                        |
| AO-009 | Pass   | Body line height computes to `1.65`; readable-line width maps to `80ch`; tables and media are not globally constrained.                                             |
| AO-010 | Pass   | All twenty normative normal-text, application-chrome, and table-header pairs exceed WCAG AA; ratios range from `4.57:1` to `15.36:1`; prompt focus remains visible. |
| AO-011 | Pass   | Static scan finds no remote CSS asset or import.                                                                                                                    |
| AO-012 | Pass   | Static scan finds no `!important`, `:has()`, or global Graph/Canvas texture.                                                                                        |
| AO-013 | Pass   | Theme uses Obsidian's interface/text/monospace variables and maintains layout under the local user accent/font preference pipeline.                                 |

## P1 local status

| ID     | Local status                                                                                                                                    | Remaining public-release gate                                                                                      |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| AO-101 | Pass in Obsidian mobile emulation; primary clickable controls compute to at least `44px`; mobile title size is `48px`.                          | Test real iOS and Android devices.                                                                                 |
| AO-102 | Pass in light and dark Graph views; nodes, labels, edges, controls, and click-through interaction remain readable.                              | Repeat on Windows/Linux and minimum supported version.                                                             |
| AO-103 | Pass in light and dark Canvas views; three fixture nodes, connections, embedded note, selection rule, and four control groups render correctly. | Repeat on Windows/Linux and minimum supported version.                                                             |
| AO-104 | Pass in light and dark Bases table views; four records, headers, tags, links, resize affordances, and cyan focus system render correctly.       | Broader keyboard and platform matrix.                                                                              |
| AO-105 | Pass locally for properties, backlinks, empty backlinks, dense tags, and collapsed sections.                                                    | Broader platform matrix.                                                                                           |
| AO-106 | Pass locally for three-pane, `1024px` narrow, maximized, frameless, and pop-out window variants.                                                | Test native/custom frames on Windows and Linux.                                                                    |
| AO-107 | Partial: README, MIT license, manifest, repository metadata, current screenshots, and a current official-index name check exist.                | Create a version tag, recheck name uniqueness immediately before submission, and run final community-theme checks. |

## BRAT Beta preparation

| Requirement                | Local status | Remaining gate                                                                                                                                                                                                    |
| -------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Manifest and compatibility | Pass         | `authorUrl` is present and `minAppVersion` now matches the tested `1.12.7` runtime.                                                                                                                               |
| BRAT documentation         | Pass         | Instructions were corrected against the BRAT `2.2.0` settings UI.                                                                                                                                                 |
| Repository validation      | Pass         | GitHub Actions passed on the pushed stylesheet commit `2122ee5`.                                                                                                                                                  |
| Issue intake               | Pass         | Both forms are public, parse as valid YAML, and render their expected fields, required markers, privacy check, and Create control in a signed-in GitHub session.                                                  |
| Release image              | Pass         | `assets/screenshots/archive-olive-512x288.png` is public-safe and has the required dimensions.                                                                                                                    |
| License                    | Pass         | The owner selected MIT and the root `LICENSE` matches README.                                                                                                                                                     |
| BRAT lifecycle smoke test  | Pass         | BRAT `2.2.0` installed the public theme in a new Obsidian `1.12.7` vault, then delivered the changed `theme.css` and updated manifest. Light/dark activation, unregistration, disabling, and removal also passed. |

## Automated checks

```sh
node scripts/validate.mjs
node scripts/validate.mjs --release
npx -y @google/design.md@0.3.0 lint DESIGN.md --format json
npx -y lightningcss-cli@1.33.0 theme.css --output-file /tmp/archive-olive-theme.css
npx -y prettier@3.9.6 --check theme.css manifest.json README.md CHANGELOG.md docs/specs/README.md docs/specs/brat-beta-release.md scripts/validate.mjs .github/workflows/validate.yml .github/ISSUE_TEMPLATE/bug.yml .github/ISSUE_TEMPLATE/platform-validation.yml .prettierrc.json
jq empty manifest.json "test-vault/Archive Olive.canvas"
git diff --check
```

`scripts/validate.mjs` verifies manifest shape, repository deliverables, BRAT channel metadata, Canvas JSON, Bases structure, Archive Olive token integrity, forbidden CSS patterns, remote dependency absence, and twenty WCAG contrast pairs. Release mode also verifies the MIT license and README link.

## 0.1.2 interaction-state regression

- User-provided `0.1.0` screenshots showed graphite foregrounds disappearing on the carbon root tab strip, signal-cyan side dock, and field-olive vault profile.
- Follow-up screenshots showed the repaired icons regressing after pane blur, active side-dock states losing selection identity, and table-header cells becoming unreadable in Obsidian's interactive editor state.
- The repair binds foreground and selected-state treatments to their actual chrome surfaces instead of window focus, and forces table-editor layers to inherit the carbon header surface.
- Pane-blurred side-dock controls, menu-open tab-list controls, active side-dock selection, and interactive Markdown table headers were rechecked in the real three-pane Obsidian workspace.
- New automated ratios cover light/dark title-bar controls and table headers in addition to the `0.1.1` chrome pairs.

## Visual evidence

- [Light workspace](validation/screenshots/light-workspace.png)
- [Light components](validation/screenshots/light-components.png)
- [Dark workspace](validation/screenshots/dark-workspace.png)
- [Dark components](validation/screenshots/dark-components.png)
- [Live Preview](validation/screenshots/dark-live-preview.png)
- [Source Mode](validation/screenshots/dark-source-mode.png)
- [Narrow workspace](validation/screenshots/dark-narrow-workspace.png)
- [Mobile emulation](validation/screenshots/dark-mobile.png)
- [Keyboard focus state](validation/screenshots/light-focus-state.png)
- [Light command palette](validation/screenshots/light-command-palette.png)
- [Dark quick switcher](validation/screenshots/dark-quick-switcher.png)
- [Dark settings](validation/screenshots/dark-settings.png)
- [Light Graph](validation/screenshots/light-graph.png)
- [Dark Graph](validation/screenshots/dark-graph.png)
- [Light Canvas](validation/screenshots/light-canvas.png)
- [Dark Canvas](validation/screenshots/dark-canvas.png)
- [Light Bases](validation/screenshots/light-bases.png)
- [Dark Bases](validation/screenshots/dark-bases.png)
- [Pop-out window](validation/screenshots/dark-popout.png)

## Issues found and corrected

- Reduced narrow/mobile display sizes and prevented mid-word H1 and inline-title breaks.
- Added explicit dark semantic callout tokens instead of reusing light values.
- Added cyan right-sidebar chrome and an olive vault footer to restore color rhythm.
- Fixed dark backlink result titles that inherited ink text on a dark surface.
- Added long-link and long-inline-code wrapping without changing fenced-code overflow.
- Increased prompt selector specificity so keyboard focus produces a stable cyan border and inset rule.

## Source Manifest

### Original sources

- User direction in this Codex thread: implement the selected fourth palette and validate it in a local vault.
- [`DESIGN.md`](DESIGN.md)
- [Theme specification](docs/specs/theme.md)
- [`design/concepts/01f-archive-olive.png`](design/concepts/01f-archive-olive.png)
- Obsidian application stylesheet extracted locally from Obsidian Desktop `1.12.7`.
- [Google DESIGN.md format specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)
- [Obsidian developer documentation](https://docs.obsidian.md/)

### Produced and verified artifacts

- `manifest.json`
- `theme.css`
- `README.md`
- `scripts/validate.mjs`
- `test-vault/`
- `validation/screenshots/`
- `VALIDATION.md`

### Known limitations

- The current beta floor is the tested Obsidian `1.12.7`; compatibility with older versions is not claimed.
- Real iOS, Android, Windows, and Linux validation is still pending.
- The project is licensed under MIT; official packaging requirements must still be rechecked before `1.0.0`.
- Optional P2 texture, Style Settings, curated plugin rules, and Publish support are intentionally not part of `0.1.0`.
