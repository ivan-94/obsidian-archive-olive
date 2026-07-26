# Archive Olive Colorways Specification

| Field                 | Value                                                  |
| --------------------- | ------------------------------------------------------ |
| Status                | Implemented; cross-platform review pending             |
| Specification version | 0.1.0                                                  |
| Created               | 2026-07-26                                             |
| Configuration surface | Optional Obsidian Style Settings community plugin      |
| Default behavior      | Existing Archive Olive light and dark palettes         |
| Runtime dependency    | None for the default theme; Style Settings is optional |

## 1. Purpose

Add user-selectable colorways without changing Archive Olive's geometry,
typography, interaction hierarchy, or plugin-free default experience.

Light and dark colorways are separate dimensions. A user may select any light
colorway and any dark colorway independently; switching Obsidian between light
and dark mode activates the saved choice for that mode.

## 2. Product decisions

1. The existing light and dark palettes remain the defaults.
2. The theme remains fully usable when Style Settings is absent or disabled.
3. Style Settings supplies configuration UI only; the theme does not ship
   JavaScript or a companion plugin.
4. Light and dark selections use independent `body` classes.
5. Every colorway maps the same semantic roles. Component selectors continue to
   consume semantic variables rather than colorway-specific values.
6. Colorways may change color only. Layout, type, borders, square geometry,
   spacing, and behavior remain shared.
7. Normal text, active navigation, tabs, feedback, menus, and mobile semantic
   surfaces must retain WCAG AA contrast in every colorway.

## 3. Settings contract

The `theme.css` file declares one Style Settings block named `Archive Olive`.

| Setting ID          | Type           | Default class            | Options |
| ------------------- | -------------- | ------------------------ | ------- |
| `ao-light-colorway` | `class-select` | `ao-light-archive-olive` | L1–L4   |
| `ao-dark-colorway`  | `class-select` | `ao-dark-archive-night`  | D1–D4   |

The two selectors use `allowEmpty: false`. Style Settings persists the selected
classes in the vault. When the plugin is missing, the base `body` token values
provide L1 and D1.

## 4. Colorway inventory

### 4.1 Light colorways

| ID  | Class                        | Name                         | Surface   | Recessed  | Layer     | Ink       | Accent    | Information | Critical  | Warning   |
| --- | ---------------------------- | ---------------------------- | --------- | --------- | --------- | --------- | --------- | ----------- | --------- | --------- |
| L1  | `ao-light-archive-olive`     | Archive Olive / 典藏橄榄     | `#F1E7CC` | `#D9CBA8` | `#C8B98F` | `#11110D` | `#59611C` | `#006F77`   | `#8D1B1B` | `#C69214` |
| L2  | `ao-light-blueprint-news`    | Blueprint News / 蓝图报刊    | `#F5F1E6` | `#D4DEDC` | `#B9C9C7` | `#14242A` | `#24566B` | `#057681`   | `#9A362B` | `#B47B12` |
| L3  | `ao-light-terracotta-ledger` | Terracotta Ledger / 赤陶账簿 | `#F4E7D3` | `#DFC2A3` | `#CAA883` | `#24150F` | `#923F24` | `#17686B`   | `#8A2930` | `#B37A16` |
| L4  | `ao-light-forestry-file`     | Forestry File / 林务档案     | `#EDF0E4` | `#C3CFBB` | `#AEBE9F` | `#142019` | `#285A3D` | `#196B73`   | `#9C3C26` | `#A77A16` |

### 4.2 Dark colorways

| ID  | Class                        | Name                          | Canvas    | Surface   | Recessed  | Ink       | Accent    | Information | Critical  | Warning   |
| --- | ---------------------------- | ----------------------------- | --------- | --------- | --------- | --------- | --------- | ----------- | --------- | --------- |
| D1  | `ao-dark-archive-night`      | Archive Night / 夜间橄榄      | `#15160F` | `#1D2014` | `#252919` | `#EEE4C8` | `#9AAA3A` | `#31C2C9`   | `#D4574F` | `#E0AC3F` |
| D2  | `ao-dark-carbon-teal`        | Carbon Teal / 碳黑青绿        | `#101718` | `#172224` | `#223033` | `#E4ECE5` | `#55B7A7` | `#6AB9D0`   | `#DD7167` | `#D7B553` |
| D3  | `ao-dark-oxblood-archive`    | Oxblood Archive / 酒红档案    | `#1A1011` | `#241719` | `#322124` | `#F0DFC9` | `#C86551` | `#58B4B0`   | `#EF8176` | `#D7AA4C` |
| D4  | `ao-dark-midnight-blueprint` | Midnight Blueprint / 午夜蓝图 | `#0F1521` | `#171F2F` | `#202B40` | `#E5E8DF` | `#79A9D4` | `#54C1C2`   | `#E0726C` | `#D6B854` |

The table records the primary visual roles approved in the conversation
preview. Supporting tonal ramps, hover colors, syntax colors, graph colors, and
RGB aliases are implementation details derived from the same roles and must not
introduce a fifth visual identity.

## 5. Dark note-body compatibility

All dark colorways use `#000000` for Markdown editing and reading surfaces,
preserving the accepted pure-black note body introduced in version `0.1.4`.
Their individual visual identities remain visible in the surrounding workspace
canvas, panels, recessed surfaces, chrome, accents, and semantic colors.

## 6. CSS architecture

1. Base values on `body` define L1 and D1 for plugin-free use.
2. Each Style Settings class overrides only `--ao-*` palette tokens.
3. `.theme-light` and `.theme-dark` map those tokens to Obsidian variables.
4. Components reference the mapped Obsidian variables or `--ao-*` semantic
   tokens; they do not test colorway class names.
5. Light selectors must not change dark tokens, and dark selectors must not
   change light tokens.
6. All existing `.is-mobile` semantic mappings remain palette-aware by
   referencing the shared light or dark token set.

## 7. Documentation requirements

- README installation instructions explain that Style Settings is optional.
- README lists every light and dark colorway and explains independent selection.
- The existing no-companion-plugin principle is clarified: no companion plugin
  is required for the default theme.
- The specification index links this document.
- The changelog records the new optional configuration.

## 8. Acceptance criteria

| ID      | Acceptance                                                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CLR-001 | Without Style Settings, the rendered L1 and D1 token values match the existing defaults.                                                               |
| CLR-002 | The Style Settings block parses and exposes exactly two independent `class-select` controls.                                                           |
| CLR-003 | Every declared option class exists in `theme.css`.                                                                                                     |
| CLR-004 | Selecting a light option does not alter dark palette tokens, and selecting a dark option does not alter light palette tokens.                          |
| CLR-005 | All eight colorways supply complete semantic surface, text, accent, information, critical, warning, chrome, syntax, graph, and mobile inputs.          |
| CLR-006 | Required normal-text and state pairs meet or exceed `4.5:1`.                                                                                           |
| CLR-007 | `node scripts/validate.mjs` validates metadata, option classes, token completeness, and contrast for all eight colorways.                              |
| CLR-008 | `theme.css` compiles with the pinned Lightning CSS check and passes Prettier.                                                                          |
| CLR-009 | Obsidian loads the working-tree theme through the existing `test-vault/` symlinks.                                                                     |
| CLR-010 | Runtime review in `test-vault/` confirms switching both selectors updates the intended light and dark surfaces without stale colors or console errors. |
| CLR-011 | Every dark colorway resolves `--ao-dark-content` to pure black `#000000`.                                                                              |

## 9. Non-goals

- Adding arbitrary user color pickers in this iteration.
- Letting colorways alter typography, spacing, borders, or component layout.
- Bundling Style Settings or silently installing a community plugin.
- Adding migration JavaScript.
- Replacing the existing light/dark appearance selector in Obsidian.
- Publishing a release, tag, or pull request as part of this implementation.

## Source Manifest

### Sources

- User direction in the current Codex task on 2026-07-26: retain all four
  approved light colorways and all four approved dark colorways, generate a
  specification, then implement them.
- User direction in the current Codex task: every dark colorway must use a
  pure-black primary content surface.
- In-conversation colorway comparison approved by the user: four independent
  light candidates and four independent dark candidates with the primary values
  recorded in section 4.
- [`DESIGN.md`](../../DESIGN.md)
- [Theme specification](theme.md)
- [`theme.css`](../../theme.css)
- [Style Settings configuration documentation](https://github.com/mgmeyers/obsidian-style-settings/blob/main/README.md)
- Repository acceptance rule in [`AGENTS.md`](../../AGENTS.md): use only the
  isolated `test-vault/` for Obsidian runtime acceptance.

### Produced artifacts

- `docs/specs/colorways.md`
- Implementation changes to `theme.css`, `scripts/validate.mjs`, `README.md`,
  `CHANGELOG.md`, `DESIGN.md`, `docs/specs/README.md`, and
  `.github/workflows/validate.yml`

### Key decisions

- Light and dark colorways are independently selectable.
- Style Settings remains optional and the existing palette remains the
  plugin-free default.
- Every dark colorway preserves the accepted pure-black Markdown body while its
  surrounding workspace surfaces remain colorway-specific.
- Colorway classes override semantic tokens rather than component selectors.

### Verification evidence

- `node scripts/validate.mjs` validates all eight colorways, including 72
  required contrast pairs. The lowest passing ratio is Forestry File's active
  tab at `4.55:1`.
- Lightning CSS compiles `theme.css` successfully.
- Prettier and `git diff --check` pass for the implementation files.
- The Design Lint report contains no errors or warnings.
- A Chromium cascade matrix exercises all 16 light/dark class combinations and
  confirms that both dimensions map independently.
- Obsidian Desktop `1.12.7` in the isolated `test-vault/` parses exactly two
  Style Settings selectors, lists all four options in each selector, and
  visibly applies Forestry File in light mode and Oxblood Archive in dark mode.
  Both selectors and the appearance mode were restored to their defaults after
  acceptance.
- The immutable
  [`0.1.5` pre-release](https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.5)
  publishes the approved implementation with four verified release assets.

### Open questions / risks

- New alternate colorways need desktop and mobile runtime review before a public
  release can claim full cross-platform visual acceptance. This implementation
  completed representative desktop switching rather than an exhaustive
  component-by-component review of every colorway.
