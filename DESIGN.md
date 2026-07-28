---
version: alpha
name: Archive Olive
description: A field-manual-inspired brutalist design system for an Obsidian theme.
colors:
  primary: '#59611C'
  secondary: '#8D1B1B'
  tertiary: '#00A6B2'
  neutral: '#D9CBA8'
  surface: '#F1E7CC'
  surface-muted: '#C8B98F'
  on-surface: '#11110D'
  text-muted: '#4B493F'
  warning: '#C69214'
  dark-neutral: '#15160F'
  dark-surface: '#1D2014'
  dark-surface-muted: '#252919'
  dark-on-surface: '#EEE4C8'
  dark-text-muted: '#B4AA8F'
  dark-primary: '#9AAA3A'
  dark-secondary: '#D4574F'
  dark-tertiary: '#31C2C9'
typography:
  headline-display:
    fontFamily: 'Arial Narrow, Roboto Condensed, PingFang SC, Microsoft YaHei, sans-serif'
    fontSize: 48px
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: 'Arial Narrow, Roboto Condensed, PingFang SC, Microsoft YaHei, sans-serif'
    fontSize: 36px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.02em
  headline-md:
    fontFamily: 'Arial Narrow, Roboto Condensed, PingFang SC, Microsoft YaHei, sans-serif'
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: 'Arial Narrow, Roboto Condensed, PingFang SC, Microsoft YaHei, sans-serif'
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.2
  body-md:
    fontFamily: 'IBM Plex Sans, Inter, PingFang SC, Microsoft YaHei, system-ui, sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: 'IBM Plex Sans, Inter, PingFang SC, Microsoft YaHei, system-ui, sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  label-md:
    fontFamily: 'IBM Plex Mono, SFMono-Regular, Consolas, Liberation Mono, monospace'
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.06em
  label-sm:
    fontFamily: 'IBM Plex Mono, SFMono-Regular, Consolas, Liberation Mono, monospace'
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.04em
  code:
    fontFamily: 'IBM Plex Mono, SFMono-Regular, Consolas, Liberation Mono, monospace'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
rounded:
  none: 0px
  control: 0px
  full: 9999px
spacing:
  none: 0px
  2xs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
components:
  app-light:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.none}'
    padding: '{spacing.none}'
  editor-light:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.none}'
    padding: '{spacing.xl}'
  panel-light:
    backgroundColor: '{colors.surface-muted}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.none}'
    padding: '{spacing.md}'
  active-item-light:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.surface}'
    typography: '{typography.label-md}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm}'
  danger-light:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.surface}'
    typography: '{typography.label-md}'
    rounded: '{rounded.none}'
    padding: '{spacing.md}'
  info-light:
    backgroundColor: '{colors.tertiary}'
    textColor: '{colors.on-surface}'
    typography: '{typography.label-md}'
    rounded: '{rounded.none}'
    padding: '{spacing.md}'
  muted-light:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.text-muted}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm}'
  warning-light:
    backgroundColor: '{colors.warning}'
    textColor: '{colors.on-surface}'
    typography: '{typography.label-md}'
    rounded: '{rounded.none}'
    padding: '{spacing.md}'
  app-dark:
    backgroundColor: '{colors.dark-neutral}'
    textColor: '{colors.dark-on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.none}'
    padding: '{spacing.none}'
  editor-dark:
    backgroundColor: '{colors.dark-surface}'
    textColor: '{colors.dark-on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.none}'
    padding: '{spacing.xl}'
  panel-dark:
    backgroundColor: '{colors.dark-surface-muted}'
    textColor: '{colors.dark-on-surface}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.none}'
    padding: '{spacing.md}'
  active-item-dark:
    backgroundColor: '{colors.dark-primary}'
    textColor: '{colors.on-surface}'
    typography: '{typography.label-md}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm}'
  danger-dark:
    backgroundColor: '{colors.dark-secondary}'
    textColor: '{colors.dark-neutral}'
    typography: '{typography.label-md}'
    rounded: '{rounded.none}'
    padding: '{spacing.md}'
  info-dark:
    backgroundColor: '{colors.dark-tertiary}'
    textColor: '{colors.on-surface}'
    typography: '{typography.label-md}'
    rounded: '{rounded.none}'
    padding: '{spacing.md}'
  muted-dark:
    backgroundColor: '{colors.dark-surface}'
    textColor: '{colors.dark-text-muted}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm}'
---

# Archive Olive Design System

## Overview

Archive Olive is a practical brutalist interface for serious note-taking. It should feel like a field manual, archive box, warehouse label, and editorial proof sheet translated into a modern knowledge tool. The result is dense, direct, tactile, and highly legible—not nostalgic military cosplay and not generic beige minimalism.

The canonical visual reference is [`design/concepts/01f-archive-olive.png`](design/concepts/01f-archive-olive.png). Preserve its hierarchy and color rhythm, but treat the mockup as intent rather than literal Obsidian DOM structure.

Three principles govern every decision:

1. **Information before decoration.** Color, borders, type, and texture must clarify hierarchy or state.
2. **Exposed structure.** Panels, tabs, tables, callouts, and selections show their boundaries instead of floating in soft cards.
3. **Controlled friction.** The theme should feel handmade and forceful without slowing reading, writing, navigation, or keyboard use.

Vercel's influence is behavioral rather than visual: align deliberately, design every state, show clear focus, preserve keyboard operation, and never rely on color alone. Archive Olive does not borrow Vercel's monochrome brand language.

## Colors

### Light mode

Light mode is canonical and should most closely match the approved concept.

| Role          | Token           | Value     | Usage                                                         |
| ------------- | --------------- | --------- | ------------------------------------------------------------- |
| Field olive   | `primary`       | `#59611C` | Active file, selected navigation, success, primary emphasis   |
| Oxblood       | `secondary`     | `#8D1B1B` | Errors, destructive emphasis, critical callouts, live status  |
| Signal cyan   | `tertiary`      | `#00A6B2` | Active tab, links, focus, informational callouts, code gutter |
| Archive khaki | `neutral`       | `#D9CBA8` | Workspace shell, sidebars, secondary surfaces                 |
| Parchment     | `surface`       | `#F1E7CC` | Editor and reading surfaces                                   |
| Worn folder   | `surface-muted` | `#C8B98F` | Hovered rows, recessed panels, secondary headers              |
| Carbon ink    | `on-surface`    | `#11110D` | Primary text, rules, toolbar, table headers                   |
| Graphite      | `text-muted`    | `#4B493F` | Metadata and secondary text                                   |
| Archive stamp | `warning`       | `#C69214` | Warning callouts and pending states                           |

Light-mode contrast pairs are normative:

- Carbon ink on khaki: `11.77:1`.
- Carbon ink on parchment: `15.36:1`.
- Parchment on field olive: `5.41:1`.
- Parchment on oxblood: `7.39:1`.
- Carbon ink on signal cyan: `6.40:1`.
- Graphite on khaki: `5.62:1`.

### Dark mode

Dark mode is an inversion of material, not a separate neon theme. Carbon and green-black surfaces replace paper; olive, oxblood, and cyan become lighter printing inks.

| Role           | Token                | Value     |
| -------------- | -------------------- | --------- |
| Canvas         | `dark-neutral`       | `#15160F` |
| Panel surface  | `dark-surface`       | `#1D2014` |
| Markdown body  | `dark-content`       | `#000000` |
| Recessed panel | `dark-surface-muted` | `#252919` |
| Primary text   | `dark-on-surface`    | `#EEE4C8` |
| Secondary text | `dark-text-muted`    | `#B4AA8F` |
| Active olive   | `dark-primary`       | `#9AAA3A` |
| Critical red   | `dark-secondary`     | `#D4574F` |
| Signal cyan    | `dark-tertiary`      | `#31C2C9` |

### Optional colorways

Archive Olive and Archive Night remain the canonical defaults. Optional
colorways may reinterpret material and ink while preserving the same semantic
roles, contrast thresholds, geometry, typography, and state hierarchy.

| Light colorway    | Material direction               |
| ----------------- | -------------------------------- |
| Archive Olive     | Paper, field manual, old archive |
| Blueprint News    | Engineering drawing, newsroom    |
| Terracotta Ledger | Warm publishing, bound ledger    |
| Forestry File     | Field research, natural tools    |
| Signal White      | White desk, yellow signal chrome |

| Dark colorway      | Material direction               |
| ------------------ | -------------------------------- |
| Archive Night      | Olive-black archive              |
| Carbon Teal        | Carbon, oxidized metal           |
| Oxblood Archive    | Wine-red binding, aged print     |
| Midnight Blueprint | Blueprint paper, technical night |

Light and dark selections are independent. Colorway classes replace semantic
tokens only; component-level selectors must not branch by colorway. Exact
values, class names, defaults, and acceptance criteria are defined in
[`docs/specs/colorways.md`](docs/specs/colorways.md).

### Color behavior

- Large color blocks communicate current context: active file, active tab, panel title, or status.
- Keep the editor body predominantly parchment in light mode and pure black in
  every dark colorway. Dark workspace chrome remains colorway-specific.
- Oxblood is scarce and meaningful. Do not use it as ambient decoration.
- Signal cyan identifies navigation, information, focus, and code—not warnings.
- Active and selected states must also use a border, weight, label, or icon change.
- Respect the user's Obsidian accent override where core variables expose it; do not make the layout depend on one exact accent value.

## Typography

Typography has three voices:

1. **Condensed display:** page titles and major headings are narrow, heavy, and spatially assertive.
2. **Readable body:** prose remains neutral and comfortable for long sessions.
3. **Monospaced utility:** tabs, file labels, metadata, code, counts, and status text feel like archive indexing.

Rules:

- H1 may use `headline-display` on wide editor panes; reduce to `headline-lg` on narrow panes and mobile.
- H2 uses `headline-md`; H3 uses `headline-sm`. H4–H6 progressively reduce weight and size instead of inventing new colors.
- Body copy uses `body-md` with a target line length of `60–80ch`.
- Interface labels use `label-md` or `label-sm`, generally uppercase only for short labels.
- Use tabular numerals for line numbers, counts, dates, tables, and status bars.
- Preserve user-configured Obsidian text, interface, and monospace font overrides. Theme stacks are fallbacks, not a reason to defeat user settings.
- Never load fonts from a remote URL. Any future bundled font must be local, licensed, subsetted, and documented.
- Chinese text must fall back to `PingFang SC` on macOS/iOS and `Microsoft YaHei` on Windows without forcing Latin display fonts onto unsupported glyphs.

## Layout

Archive Olive uses an exposed grid rather than floating cards.

- Base unit: `4px`.
- Standard control rhythm: `8px`, `12px`, and `16px`.
- Panel padding: `12px` on compact UI, `16px` on mobile, `24px` in editor content.
- Desktop editor maximum readable width: `80ch`; full-width tables, canvases, and media may escape this measure.
- Main workspace dividers are `2px` carbon rules. Internal separators are `1px`.
- The left ribbon, sidebars, tab strip, editor, and status bar must read as joined regions of one system.
- Desktop remains intentionally dense. Mobile increases touch targets to at least `44px` without scaling headings or borders into caricature.
- Every item aligns to a panel edge, grid line, text baseline, or optical center. One-pixel optical corrections are allowed.
- Avoid layout changes that reduce Obsidian's resize, collapse, split-pane, pop-out window, or mobile drawer behavior.

## Elevation & Depth

Depth is expressed with borders, offset, and tonal contrast—not blur.

- Default surfaces are flat.
- Focused or emphasized blocks may use a hard `4px 4px 0` carbon shadow in light mode.
- In dark mode, use a `4px 4px 0` shadow in `dark-primary` or `dark-tertiary` only when a carbon shadow would disappear.
- Menus and modals may use one hard shadow plus a `2px` border.
- Never use soft shadows, ambient glows, glass effects, translucency over text, or gradient depth.
- Paper grain must be subtle enough that it disappears during reading. If implemented, use a local or embedded asset, keep opacity at or below `0.04`, and disable it where it harms Canvas performance or text clarity.

## Shapes

- Rectangles are square: `0px` radius for tabs, panes, callouts, tables, inputs, buttons, tags, and menus.
- Use circles only where the control's semantics require them: radio buttons, toggle thumbs, graph nodes, and small status lights.
- Border thickness is part of hierarchy:
  - `1px`: internal data rows and quiet separators.
  - `2px`: panes, controls, tabs, code blocks, and callouts.
  - `4px`: selected editorial markers and major heading rules.
- Tags use clipped or slightly irregular ink edges only if implemented without harming text selection or layout.
- Do not fake physical torn paper with overlapping content, random rotations, or inaccessible masks.

## Components

### Workspace shell

- Ribbon: carbon background; parchment icons; selected tool receives a solid oxblood or olive block plus a visible inset border.
- Title and tab bars: flat surfaces separated by `2px` rules.
- Active tab: signal cyan with carbon text in light mode; dark signal cyan with carbon text in dark mode.
- Inactive tabs on the carbon title bar use full-opacity khaki in light mode and dark muted ink in dark mode; never place graphite on carbon. Hover uses a tonal change and underline.
- Side-dock icons on signal cyan use carbon. Vault-switcher icons on field olive use parchment in light mode and carbon in dark mode.
- Status bar: carbon with parchment utility text. Important transient status may switch to oxblood.

### File explorer and navigation lists

- Top-level folders form editorial chapter breaks: strong monospaced labels,
  restrained section spacing, a generated two-digit olive sequence marker, and
  a quiet rule that extends only from expanded chapter labels. The sequence is
  presentation generated from current visual order; it never becomes part of
  the folder name or path. Underscore-prefixed utility folders stay unnumbered.
- Nested folders remain in the native tree but use a medium label weight;
  expanded folders may receive a recessed tonal wash and short olive rule.
- Default files remain lightweight and flat, without persistent frames or
  shadows.
- At the same tree depth, file text begins on the sibling folder's first visible
  marker edge: the generated sequence badge at root depth and the folder glyph
  at nested depths. Folder names sit after those markers by design.
- Disclosure hit areas and active-row surfaces do not define the text alignment
  edge.
- Active file: the natural file row with a paper or recessed surface and
  stronger text weight. Do not add a cyan marker, height, external margin,
  outline, folded corner, hard shadow, rounding, or a full-olive highlight.
- Hovered file: a quiet tonal or text-color change without an added marker or
  layout displacement.
- Folder names and utility counts use monospaced labels.
- Indentation is expressed through native nesting and folder glyphs; persistent
  vertical guide rails are removed.
- Icons never carry state alone; pair color changes with background, weight, or rule changes.
- Preserve native disclosure, truncation, drag, rename, multi-select, focus, and
  keyboard behavior. Render disclosure in a shared trailing fixed-width slot
  using `+` for collapsed and `−` for expanded instead of rotating chevrons.
  This creates a right-side state axis while the left side remains dedicated to
  hierarchy markers and text. Reclaim the obsolete leading disclosure gutter
  for content, and let row surfaces span the full file-list container; each row
  keeps its own inline padding for safe text and disclosure spacing. Mobile rows
  remain at least `44px` high and active files use surface emphasis without
  external shift, marker, or shadow.

### Editor and reading view

- Live Preview and Reading View must be visually equivalent for all Markdown primitives.
- H1 receives the strongest display type and a `4px` bottom rule.
- H2/H3 receive a narrow oxblood marker or a short rule; do not prepend generated heading numbers by default.
- Links use signal cyan plus underline on hover/focus. Broken links use oxblood plus a distinct underline style.
- Selection uses field olive with parchment text in light mode; dark olive with carbon text in dark mode.
- Blockquotes use a `4px` left rule and no italicization by default.
- Inline code uses a bordered khaki/dark-recessed patch; fenced code uses a signal-cyan gutter and carbon table-like frame.
- Tables use carbon headers, square grid lines, and tabular numerals. Zebra striping remains subtle.
- Tasks use square controls. Checked tasks remain readable and must not disappear through excessive opacity.

### Callouts

- Every callout has a text label, icon, and border; color is redundant.
- Informational callouts use signal cyan.
- Warnings use archive stamp.
- Errors and danger use oxblood.
- Success uses field olive.
- Custom callout colors should inherit the same geometry and contrast rules.

### Tags and properties

- Tags are compact rectangular labels with `2px` borders and monospaced text.
- Do not use pill shapes.
- Properties retain native edit affordances; dense styling must not make inputs look like static text.
- Focus and validation states remain visible in both themes.

### Inputs, menus, and dialogs

- Inputs: `2px` border, square corners, clear placeholder contrast, and a signal-cyan `:focus-visible` treatment.
- Buttons: solid blocks or bordered rectangles. Hover changes fill; pressed state offsets by `2px` and removes the hard shadow.
- Menus and dialogs: parchment/dark surface, `2px` border, one hard shadow, and no blurred backdrop dependency.
- Toggle tracks may remain pill-shaped because the moving circular thumb communicates state.
- Tooltip content remains concise and must not be the only way to discover essential information.

### Graph, Canvas, and data views

- Graph and Canvas must preserve spatial performance. Avoid global texture overlays and expensive selectors.
- Graph nodes use semantic ink colors; selected nodes also change outline and size.
- Canvas cards use `2px` borders, square corners, and minimal hard shadows.
- Bases and tabular data views use the table system, with clear selected cells, resize handles, and keyboard focus.

### Interaction states

Every interactive component defines:

- Default.
- Hover.
- Active or pressed.
- Selected or current.
- Keyboard focus.
- Disabled.
- Loading where applicable.
- Empty, sparse, dense, and error content states where applicable.

Use `:focus-visible` for keyboard focus. Do not remove native focus until the replacement is visible against every component color.

## Do's and Don'ts

### Do

- Use Obsidian CSS variables before targeting internal DOM selectors.
- Preserve keyboard navigation and visible focus.
- Use color in large, purposeful blocks tied to state or hierarchy.
- Match Live Preview and Reading View.
- Keep long-form text calm even when the application chrome is loud.
- Use square geometry, hard rules, and hard shadows consistently.
- Test short, long, multilingual, and code-heavy notes.
- Test empty, sparse, and dense sidebars and views.
- Keep assets local and performance measurable.
- Maintain WCAG AA contrast of at least `4.5:1` for normal text.

### Don't

- Don't add rounded cards, glassmorphism, soft shadows, glow, or smooth gradients.
- Don't turn every surface olive; contrast needs parchment and carbon.
- Don't use oxblood or cyan as arbitrary decoration.
- Don't encode status with color alone.
- Don't hide native affordances, resize handles, scrollbars, focus rings, or selection.
- Don't use `!important` as a normal styling strategy.
- Don't use `:has()` unless a documented requirement cannot be met otherwise.
- Don't change vertical margins inside Live Preview lines; prefer padding.
- Don't load fonts, images, analytics, or styles from the network.
- Don't require a companion plugin for the core visual identity.

## Source Manifest

### Sources

- User direction in this Codex thread: proceed with the fourth palette, Archive Olive.
- User screenshots from BRAT-installed `0.1.0`: active navigation and dropdown icons disappeared against dark/olive chrome, while inactive root and side-dock tabs lacked contrast.
- Approved concept: [`design/concepts/01f-archive-olive.png`](design/concepts/01f-archive-olive.png).
- [Google DESIGN.md format specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md).
- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines).
- [Vercel Geist design system](https://vercel.com/geist/stack).
- [Obsidian: About styling and CSS variables](https://docs.obsidian.md/Reference/CSS%20variables/About%20styling).
- [Obsidian theme self-critique checklist](https://docs.obsidian.md/oo/theme).

### Produced artifacts

- `DESIGN.md`
- `docs/specs/theme.md`
- `theme.css`
- `manifest.json`
- `test-vault/`
- `VALIDATION.md`

### Key decisions

- Archive Olive is the selected direction.
- Light mode is canonical; dark mode is a material inversion using the same semantic palette.
- Vercel is used as a quality and interaction reference, not as a visual palette.
- The core theme must work without remote assets or companion plugins.
- Application-chrome foregrounds are semantic tokens tied to their actual surface, not generic muted body text.

### Verification evidence

- Palette contrast pairs were calculated locally using the WCAG relative luminance formula.
- `npx -y @google/design.md lint DESIGN.md --format json` completed with `0` errors and `0` warnings on 2026-07-25.
- Light and dark implementations were reviewed in an isolated vault on Obsidian Desktop `1.12.7`; evidence is recorded in `VALIDATION.md`.
- The `0.1.1` contrast repair was reviewed in the real three-pane Obsidian workspace in both light and dark appearances.

### Open questions / risks

- The final public theme name must be checked for uniqueness before submission.
- Font stacks may render differently across platforms; visual QA is required on macOS, Windows, iOS, and Android.
- The BRAT Beta compatibility floor is the locally validated Obsidian `1.12.7`; lowering it requires additional runtime evidence or a documented CSS-surface audit.
