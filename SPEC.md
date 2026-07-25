# Archive Olive Theme Specification

| Field | Value |
| --- | --- |
| Status | Draft for implementation |
| Design direction | Approved — Archive Olive |
| Specification version | 0.1.0 |
| Last updated | 2026-07-25 |
| Primary design source | [`DESIGN.md`](DESIGN.md) |
| Canonical visual reference | [`design/concepts/01f-archive-olive.png`](design/concepts/01f-archive-olive.png) |

## 1. Purpose

Build a practical brutalist theme for Obsidian that combines field-manual utility, archival materials, and editorial typography. The theme must be visually distinctive while remaining comfortable for daily writing, reading, search, navigation, and data-heavy notes.

`DESIGN.md` is the normative source for visual tokens and design intent. This document defines implementation scope, behavior, compatibility, and acceptance criteria.

## 2. Product principles

1. **Writing remains calm.** Application chrome may be forceful; long-form text must stay readable.
2. **Structure stays visible.** Panels, tabs, tables, code, and callouts expose their boundaries.
3. **State is redundant.** Color is always paired with border, weight, icon, label, or position.
4. **Native behavior wins.** Styling must not break Obsidian navigation, editing, resizing, plugins, or accessibility.
5. **No hidden dependencies.** The core theme works without a companion plugin, network asset, or external service.

## 3. Goals

- Implement the Archive Olive visual language in both Obsidian light and dark modes.
- Cover the full desktop shell and the Markdown surfaces used in daily note-taking.
- Keep Live Preview, Source Mode, and Reading View visually consistent.
- Provide complete default, hover, pressed, selected, focus, disabled, empty, and error states where Obsidian exposes them.
- Use Obsidian CSS variables as the primary integration surface.
- Preserve user-configured interface, text, monospace, and accent preferences where possible.
- Meet WCAG AA contrast for normal text.
- Remain usable with long file names, nested folders, multilingual text, dense tables, and large vaults.
- Produce a repository that can later satisfy Obsidian community-theme packaging requirements.

## 4. Non-goals

- Rebuilding Obsidian's layout or adding new application behavior.
- Shipping JavaScript or an Obsidian plugin.
- Requiring the Style Settings plugin for the core experience.
- Supporting every community plugin in the first release.
- Loading remote fonts, images, analytics, or update mechanisms.
- Reproducing the generated mockup pixel-for-pixel where it conflicts with real Obsidian behavior.
- Adding decorative military symbols, camouflage, distressed overlays, or randomized collage effects.
- Building an Obsidian Publish theme in the initial release.

## 5. Target users and scenarios

### Primary users

- Writers and researchers who spend long sessions in Markdown notes.
- Developers who use code blocks, tables, properties, backlinks, and search.
- Users who prefer dense, explicit interfaces over soft minimalism.

### Primary scenarios

1. Navigate a deep vault using ribbon, file explorer, tabs, quick switcher, and search.
2. Write a long note in Live Preview with headings, links, tasks, callouts, tables, and code.
3. Read the same note in Reading View without a visual hierarchy shift.
4. Compare metadata, backlinks, properties, and outlines in side panels.
5. Work in light or dark mode without losing the Archive Olive identity.
6. Use keyboard navigation and immediately see focus and selection.
7. Open settings, menus, dialogs, and command palette without falling back to unthemed generic surfaces.

## 6. Deliverables

### Required for the first usable build

- `theme.css` — the installable theme stylesheet.
- `manifest.json` — theme metadata with semantic version and minimum supported Obsidian version.
- `README.md` — installation, screenshots, compatibility, limitations, and credits.
- `DESIGN.md` — normative visual design system.
- `SPEC.md` — implementation and acceptance specification.
- Test-vault fixtures or documented fixture notes for visual validation.

### Required before public submission

- `LICENSE`.
- Current light and dark screenshots.
- A `512 × 288` directory thumbnail or equivalent current Obsidian recommendation.
- Release tagged to match `manifest.json`.
- Verified unique public name.
- Documented compatibility floor.

### Proposed repository layout

```text
.
├── DESIGN.md
├── SPEC.md
├── README.md
├── LICENSE
├── manifest.json
├── theme.css
├── design/
│   └── concepts/
│       └── 01f-archive-olive.png
├── screenshots/
│   ├── light.png
│   └── dark.png
└── test-vault/
    ├── Markdown primitives.md
    ├── Dense workspace.md
    ├── Multilingual.md
    └── States and callouts.md
```

The initial implementation may keep authored CSS directly in `theme.css`. Introduce a build pipeline only if the stylesheet becomes difficult to maintain; the distributable artifact must remain a single `theme.css`.

## 7. Compatibility

### Runtime targets

- Primary validation target: latest stable Obsidian Desktop available during implementation; `1.12.7` is the research baseline as of 2026-07-25.
- Desktop platforms: macOS, Windows, and Linux.
- Mobile platforms: iOS and Android before a public `1.0.0` release.
- Light and dark color schemes are both required.

### Compatibility floor

- Provisional `minAppVersion`: `1.8.0`.
- This value is not final until the implementation is tested against that version or its CSS-variable surface is audited.
- If a required variable or selector is newer, raise `minAppVersion` with a documented reason rather than adding fragile compatibility hacks.

### Obsidian behavior that must remain intact

- Pane split, resize, collapse, pop-out, and reorder.
- Ribbon and tab interactions.
- File explorer nesting and drag-and-drop.
- Search and quick switcher.
- Live Preview, Source Mode, and Reading View.
- Command palette, menus, modals, settings, notices, and tooltips.
- Keyboard navigation and native text selection.
- User font and accent overrides.
- Zoom and UI scaling.

## 8. Theme architecture

### Styling strategy

1. Override stable Obsidian CSS variables first.
2. Add narrow component selectors only where variables cannot express the design.
3. Scope custom tokens with an `--ao-` prefix.
4. Keep light and dark values under `.theme-light` and `.theme-dark`.
5. Avoid styling based on volatile DOM depth.
6. Do not use `!important` as a normal strategy.
7. Do not use `:has()` unless a documented requirement has no stable alternative.
8. Do not change vertical margins on CodeMirror/Live Preview line classes; use padding.
9. Do not load remote assets or use `@import` with network URLs.

### Recommended stylesheet sections

```css
/* 01. Metadata and custom properties */
/* 02. Obsidian variable mapping */
/* 03. Workspace shell */
/* 04. Navigation and tabs */
/* 05. Editor and reading view */
/* 06. Markdown primitives */
/* 07. Menus, dialogs, settings, and notices */
/* 08. Core views: search, graph, canvas, bases */
/* 09. Mobile and narrow layouts */
/* 10. Accessibility and reduced effects */
```

CSS cascade layers may be used if they remain compatible with the selected `minAppVersion`. Do not introduce tooling solely to support layers.

## 9. Token-to-Obsidian mapping

The exact list must be verified against the current Obsidian CSS variable reference during implementation. The following mapping defines intent.

### Light mode

| Archive Olive role | Obsidian variable intent | Value |
| --- | --- | --- |
| Editor parchment | `--background-primary` | `#F1E7CC` |
| Workspace khaki | `--background-secondary` | `#D9CBA8` |
| Recessed folder | `--background-secondary-alt` | `#C8B98F` |
| Carbon ink | `--text-normal`, strong borders | `#11110D` |
| Graphite | `--text-muted`, `--text-faint` with derived opacity | `#4B493F` |
| Field olive | `--interactive-accent`, selected navigation | `#59611C` |
| Oxblood | error/destructive variables | `#8D1B1B` |
| Signal cyan | `--text-accent`, focus, informational state | `#00A6B2` |
| Archive stamp | warning variables | `#C69214` |

### Dark mode

| Archive Olive role | Obsidian variable intent | Value |
| --- | --- | --- |
| Canvas | `--background-secondary` | `#15160F` |
| Editor | `--background-primary` | `#1D2014` |
| Recessed panel | `--background-secondary-alt` | `#252919` |
| Primary text | `--text-normal` | `#EEE4C8` |
| Secondary text | `--text-muted` | `#B4AA8F` |
| Active olive | `--interactive-accent` | `#9AAA3A` |
| Critical red | error/destructive variables | `#D4574F` |
| Signal cyan | `--text-accent`, focus, informational state | `#31C2C9` |

### Custom variables

At minimum, define:

```css
--ao-border-thin: 1px;
--ao-border-default: 2px;
--ao-border-heavy: 4px;
--ao-shadow-offset: 4px 4px 0;
--ao-grid: 4px;
--ao-content-width: 80ch;
--ao-texture-opacity: 0.04;
```

Do not duplicate colors in component selectors; reference mapped variables or `--ao-*` tokens.

## 10. Functional requirements

### P0 — first usable desktop build

| ID | Requirement | Acceptance |
| --- | --- | --- |
| AO-001 | Valid theme package | Obsidian loads `manifest.json` and `theme.css` without console errors. |
| AO-002 | Light and dark foundations | Switching Obsidian color scheme updates all primary surfaces and text without stale light/dark regions. |
| AO-003 | Workspace shell | Ribbon, tab strip, sidebars, editor, status bar, title bar, and pane dividers form a coherent exposed grid. |
| AO-004 | Active navigation | Active file and active tab use full color blocks plus non-color state cues. |
| AO-005 | Editor parity | Headings, body, links, lists, tasks, blockquotes, code, tables, tags, embeds, and callouts have equivalent hierarchy in Live Preview and Reading View. |
| AO-006 | Source Mode | Markdown syntax remains readable and cursor/selection states remain obvious. |
| AO-007 | Inputs and overlays | Command palette, quick switcher, menus, dialogs, settings, notices, inputs, tooltips, and dropdowns use theme surfaces and visible focus. |
| AO-008 | Interaction states | Default, hover, pressed, selected, focus, and disabled states are distinguishable without color alone. |
| AO-009 | Long-form readability | Body text maintains at least `1.55` line height and a target maximum width of `80ch` without constraining tables/media incorrectly. |
| AO-010 | Accessibility | Normal text pairs meet WCAG AA; keyboard focus is visible; native keyboard navigation is preserved. |
| AO-011 | No network dependency | Theme works offline and contains no remote font, image, analytics, or CSS request. |
| AO-012 | Performance baseline | No routine `!important`; no undocumented `:has()`; no global texture on Graph or Canvas. |
| AO-013 | User preferences | Changing Obsidian interface, text, monospace fonts, and accent does not break layout or contrast. |

### P1 — public-release completeness

| ID | Requirement | Acceptance |
| --- | --- | --- |
| AO-101 | Mobile layouts | Ribbon/navigation drawers, tabs, editor, menus, and settings work at mobile widths with at least `44px` touch targets for primary controls. |
| AO-102 | Graph view | Nodes, edges, selected nodes, groups, controls, and labels are readable in both schemes. |
| AO-103 | Canvas | Cards, groups, connections, selections, and controls use square geometry without performance regressions. |
| AO-104 | Bases and data views | Headers, rows, selected cells, filters, and resize handles follow the table system and preserve keyboard use. |
| AO-105 | Properties and backlinks | Editing affordances, collapsed states, empty states, and dense data remain obvious. |
| AO-106 | Window variants | Native-frame and custom-frame desktop modes, pop-out windows, and multiple panes are visually coherent. |
| AO-107 | Community packaging | README, license, screenshots, manifest metadata, version tag, and community-theme checks are complete. |

### P2 — optional refinement

| ID | Requirement | Acceptance |
| --- | --- | --- |
| AO-201 | Paper texture | Optional subtle local/embedded texture remains below `0.04` opacity and can be removed without hierarchy loss. |
| AO-202 | Style Settings integration | Optional customization exposes documented tokens but is not required for core styling. |
| AO-203 | Curated plugin support | Add narrow compatibility rules only for plugins selected from actual user demand. |
| AO-204 | Obsidian Publish variant | A separately tested Publish stylesheet may reuse the design tokens. |

## 11. Component specifications

### Workspace and ribbon

- Ribbon background is carbon in both schemes.
- Icon buttons have a visible `24px` minimum hit area on desktop and `44px` on mobile.
- Selected ribbon actions use a solid block, `2px` inset rule, and accessible label.
- Pane separators are `2px`; splitter hit areas must remain usable.

### Tabs

- Active tab uses signal cyan and carbon text.
- Inactive tabs use the surrounding paper/carbon surface.
- Hover adds a tonal fill or underline.
- Keyboard focus adds an external or inset focus rule that remains visible on cyan.
- Dirty, pinned, stacked, and close-button states must remain recognizable.
- Long titles truncate without moving the close target.

### File explorer

- Active file is a full-width olive block with parchment text.
- Hover is a worn-folder fill plus left rule.
- Folder collapse icons, indentation guides, drag targets, and file rename inputs remain visible.
- Deep nesting and long paths must not create horizontal page overflow outside the panel.

### Editor headings

- H1: condensed heavy display, `4px` bottom rule.
- H2: condensed heavy display with a short oxblood marker.
- H3: smaller condensed heading with `2px` rule or marker.
- H4–H6: body-family hierarchy using weight, case, and spacing.
- Do not inject visible section numbers through CSS.
- Anchor targets include sufficient scroll margin beneath the tab/header region.

### Links

- Internal and external links use signal cyan as the default emphasis.
- Hover and focus add underline or rule changes.
- Unresolved links use oxblood and a distinct underline style.
- Link states must remain legible when the user changes the accent color.

### Lists and tasks

- Bullets are square or rule-based.
- Ordered-list numerals use tabular monospaced labels.
- Checkboxes are square with `2px` borders.
- Checked tasks remain readable; strike-through and opacity must not reduce text below accessible contrast.
- Nested list guides remain visible but secondary.

### Blockquotes and callouts

- Blockquote: parchment/dark surface, `4px` left border, no automatic italic.
- Callout: `2px` full border, labeled title, icon, and semantic color.
- Info: signal cyan.
- Warning: archive stamp.
- Error/danger: oxblood.
- Success: field olive.
- Fold controls and nested Markdown remain functional.

### Code

- Inline code uses monospaced type, square border, and no pill background.
- Fenced code uses a signal-cyan gutter or top label, `2px` carbon frame, and readable syntax colors.
- Line numbers, copy buttons, and language labels remain visible if supplied by core or plugins.
- Never apply paper grain directly over code glyphs.

### Tables

- Header is carbon with parchment text.
- Grid lines are `1px` carbon/dark muted rules.
- Body rows use subtle tonal alternation, not translucency.
- Numeric columns use tabular numerals.
- Wide tables scroll within their content region rather than widening the entire workspace.

### Tags

- Rectangular, `0px` radius, `2px` border, compact monospaced text.
- Default tag is olive or neutral; semantic tag colors must meet contrast requirements.
- Hover, focus, and active states remain distinct.

### Inputs and buttons

- Inputs use square corners and `2px` borders.
- Placeholder text remains distinguishable but accessible.
- `:focus-visible` uses signal cyan plus a carbon contrast edge when necessary.
- Primary buttons use olive; destructive buttons use oxblood.
- Pressed buttons move by `2px` and reduce/remove the hard offset shadow.
- Disabled controls remain readable and visibly disabled without vanishing.

### Menus, dialogs, settings, and notices

- Use parchment/dark surfaces, `2px` borders, and one hard shadow.
- Modal focus trapping and return behavior are owned by Obsidian and must not be disrupted.
- Selected menu items use full-width blocks.
- Notices use semantic color plus text/icon labels.
- Scrollbars remain visible where the operating system exposes them.

## 12. Responsive behavior

### Narrow desktop panes

- Reduce H1 from display to large heading size.
- Preserve `24px` minimum interactive targets.
- Allow utility labels to truncate before icons disappear.
- Do not let hard shadows cause pane-level horizontal scroll.

### Mobile

- Primary touch targets are at least `44px`.
- Editor side padding reduces to `16px`.
- H1 uses a maximum of `36px`.
- Sidebars and drawers preserve selected-state blocks without consuming excessive width.
- Status-bar density may reduce, but critical state cannot disappear.
- Respect platform safe areas and the on-screen keyboard.

## 13. Accessibility requirements

- WCAG AA minimum contrast: `4.5:1` normal text, `3:1` large text and essential non-text boundaries.
- Keyboard focus uses `:focus-visible` and is never removed without replacement.
- Selected state does not rely on color alone.
- Do not hide accessible labels or native semantic controls.
- Preserve text zoom and UI scale at `200%` without clipped essential controls.
- Respect `prefers-reduced-motion`; the theme should not require motion to communicate state.
- Respect `prefers-contrast` where practical by removing texture and strengthening secondary borders.
- Test Latin, Simplified Chinese, punctuation, emoji, long unbroken URLs, and code tokens.

## 14. Performance requirements

- No network requests.
- No continuously animated texture.
- No full-workspace filter, blend-mode, or backdrop-filter.
- Avoid selectors that scan large subtrees.
- Avoid `:has()` in Graph and Canvas.
- Keep inline texture assets small; target less than `4 KB` if included.
- Theme switching and pane resizing must not show obvious repaint stalls on a representative large vault.
- CSS should not emit warnings or errors in the Obsidian developer console.

## 15. Validation plan

### Static checks

- Validate `manifest.json` syntax and required fields.
- Search for remote URLs, `@import`, `!important`, and `:has()`.
- Check token references against `DESIGN.md`.
- Run a CSS parser/linter.
- Calculate contrast for all normative foreground/background pairs.

### Visual fixture notes

1. **Markdown primitives:** H1–H6, paragraphs, emphasis, links, lists, tasks, quotes, callouts, code, tables, tags, images, embeds, footnotes, and math.
2. **Dense workspace:** deep file tree, many tabs, outline, backlinks, properties, search results, status bar, and long names.
3. **Multilingual:** Simplified Chinese, Latin, numbers, punctuation, emoji, and mixed inline code.
4. **States and callouts:** every semantic callout, inputs, buttons, focus, disabled, empty, error, loading, and selected states.
5. **Data views:** Graph, Canvas, Bases, tables, properties, and metadata.

### Manual matrix

| Surface | Light | Dark | Narrow | Keyboard | Mobile |
| --- | --- | --- | --- | --- | --- |
| Workspace shell | Required | Required | Required | Required | P1 |
| Live Preview | Required | Required | Required | Required | P1 |
| Reading View | Required | Required | Required | Required | P1 |
| Menus/dialogs/settings | Required | Required | Required | Required | P1 |
| Graph/Canvas/Bases | P1 | P1 | P1 | P1 | P1 |

## 16. Definition of done

The first usable build is done when all P0 requirements pass and:

- The theme can be copied into a vault theme directory and enabled.
- Light and dark screenshots demonstrate the same visual identity.
- A representative fixture note is usable in Live Preview and Reading View.
- No essential interaction loses hover, selection, focus, disabled, or error feedback.
- No remote request occurs.
- The developer console shows no theme-caused errors.
- Known limitations are recorded in `README.md`.

Public `1.0.0` additionally requires P1, licensing, release packaging, platform testing, current screenshots, and a final theme-name uniqueness check.

## 17. Risks and open decisions

| Item | Current decision | Remaining work |
| --- | --- | --- |
| Public name | `Archive Olive` working name; preliminary search found no obvious conflict | Verify against the current community theme index before submission |
| Dark-mode visual | Implemented and reviewed locally in Obsidian `1.12.7` | Repeat cross-platform visual QA |
| Minimum version | Provisional `1.8.0` | Test or audit variables/selectors |
| License | Not selected | User chooses before public release |
| Author metadata | `Ivan` in `manifest.json` | Add repository URL before public release |
| Font strategy | System/local fallback stacks | Cross-platform visual QA |
| Texture | Optional P2 enhancement | Prototype and measure before inclusion |
| Plugin support | Demand-driven | Collect actual target plugins |

## Source Manifest

### Sources

- User direction in this Codex thread: select the fourth palette and create `DESIGN.md`, then a specification.
- [`DESIGN.md`](DESIGN.md).
- [`design/concepts/01f-archive-olive.png`](design/concepts/01f-archive-olive.png).
- [Google DESIGN.md format specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md).
- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines).
- [Vercel Geist design system](https://vercel.com/geist/stack).
- [Obsidian developer documentation: About styling](https://docs.obsidian.md/Reference/CSS%20variables/About%20styling).
- [Obsidian developer documentation: Colors](https://docs.obsidian.md/Reference/CSS%20variables/Foundations/Colors).
- [Obsidian developer documentation: Manifest](https://docs.obsidian.md/Reference/Manifest).
- [Obsidian theme self-critique checklist](https://docs.obsidian.md/oo/theme).
- [Obsidian community releases repository](https://github.com/obsidianmd/obsidian-releases).

### Produced artifacts

- `DESIGN.md`
- `SPEC.md`
- `manifest.json`
- `theme.css`
- `README.md`
- `scripts/validate.mjs`
- `test-vault/`
- `validation/screenshots/`
- `VALIDATION.md`

### Key decisions

- Archive Olive is the selected visual direction.
- Light and dark modes are both required; light mode is canonical.
- The first usable build targets the desktop shell and daily Markdown surfaces.
- Mobile, Graph, Canvas, Bases, and public packaging are P1 requirements.
- Implementation begins with a maintainable single `theme.css`; no build pipeline is required initially.
- Vercel guidance informs interaction quality and accessibility, not the visual palette.

### Verification evidence

- The selected palette's normative contrast pairs were checked locally using the WCAG relative luminance formula.
- `npx -y @google/design.md lint DESIGN.md --format json` completed with `0` errors and `0` warnings on 2026-07-25.
- Official Obsidian documentation was checked for CSS-variable-first styling, manifest requirements, local asset policy, and theme performance guidance.
- A preliminary web search found no obvious existing Obsidian theme named `Archive Olive`; the community index must still be checked immediately before submission.
- The runtime theme was loaded from the repository into an isolated local vault on Obsidian Desktop `1.12.7` for macOS.
- Light, dark, narrow-window, source-mode, Graph, Canvas, Bases, settings, prompt, pop-out-window, and mobile-emulation evidence is recorded in `VALIDATION.md`.
- Obsidian's developer error and console buffers reported no theme-caused errors after the final local test cycle.

### Open questions / risks

- Repository URL, license, and final public theme name are not yet supplied.
- The provisional `minAppVersion` requires evidence before release.
- Real iOS, Android, Windows, and Linux testing remains required before public `1.0.0`.
- Cross-platform fallback typography may shift metrics and must be tested.
