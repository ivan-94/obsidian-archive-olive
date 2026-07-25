# Archive Olive BRAT Beta Cross-Platform HAT

<!-- HAT:BEGIN metadata -->

## Metadata

| Field              | Value                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source             | [BRAT Beta release specification](../../docs/specs/brat-beta-release.md)                                                                                        |
| Baseline commit    | [`d73be74`](https://github.com/ivan-94/obsidian-archive-olive/commit/d73be74c12fcfe6785ed8af1c1fab6727863e59d)                                                  |
| Created / updated  | 2026-07-25                                                                                                                                                      |
| Repository root    | `obsidian-brutalism-theme`                                                                                                                                      |
| Environment mode   | `blank`                                                                                                                                                         |
| Mode reason        | A theme does not depend on historical application data. New vaults with public, non-sensitive fixtures give the safest and most reproducible platform evidence. |
| Preparation status | `0.1.1` published; human BRAT retest pending                                                                                                                    |
| Target             | Archive Olive `0.1.1` navigation-contrast acceptance                                                                                                            |

<!-- HAT:END metadata -->

## Preparation status

- Implementation: ready for private pilot on `main`.
- Automated validation: passing locally and in GitHub Actions.
- macOS reference path: BRAT install, changed stylesheet delivery, activation, disable, removal, and cache-delay retry already pass on Obsidian `1.12.7`.
- This HAT does not create accounts, modify shared data, start a server, or connect to a database.

## Environment

| Item                  | Value                                                            |
| --------------------- | ---------------------------------------------------------------- |
| Execution environment | One clean Obsidian vault per assigned desktop or mobile platform |
| Repository            | `https://github.com/ivan-94/obsidian-archive-olive`              |
| Candidate             | Commit `d73be74` or a later explicitly assigned commit           |
| Database / schema     | Not applicable                                                   |
| Migrations            | Not applicable                                                   |
| Environment variables | None                                                             |
| App URL               | Not applicable; launch the native Obsidian application           |
| Start command         | Not applicable                                                   |
| Preparation command   | `bash hats/20260725-brat-beta-cross-platform/prepare.sh prepare` |
| Cleanup command       | `bash hats/20260725-brat-beta-cross-platform/prepare.sh cleanup` |

Desktop testers may use the prepared manual-install bundle for diagnosis, but the primary acceptance path is installation from the GitHub repository through BRAT.

## Blockers and external boundaries

- A signed-in GitHub session is required to render and optionally submit the Issue Forms.
- Windows, Linux, iOS, and Android require real environments supplied by the owner or pilot testers.
- A BRAT update scenario requires a tester to retain an installed baseline until a later assigned commit changes `theme.css`.
- The owner authorized an opt-in `0.1.0` pre-release before human acceptance; broader announcement and official-directory submission remain blocked.

## Acceptance accounts

| Role             | Account                                                        | Source | Permission / tenant                                     | Purpose                                   | Status                                         |
| ---------------- | -------------------------------------------------------------- | ------ | ------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------- |
| Repository owner | GitHub account with access to `ivan-94/obsidian-archive-olive` | Owner  | Repository administration                               | Final go/no-go, release, issue triage     | Available; signed-in Chrome rendering verified |
| Pilot tester     | TODO: owner assigns 3–5 testers                                | Owner  | Public repository read; GitHub issue write if reporting | Independent install and visual acceptance | Pending                                        |
| Mobile tester    | TODO: owner assigns iOS and Android devices                    | Owner  | Public repository read                                  | Touch and mobile-layout acceptance        | Pending                                        |

Never record passwords, access tokens, private email addresses, or personal vault paths in this guide or an issue.

## Acceptance data

- Create a new vault whose name contains no personal or customer information.
- Use Obsidian's default welcome note or copy public fixtures from `test-vault/`.
- Cover English, Chinese, long file names, nested folders, Markdown tables, tasks, code, callouts, tags, properties, Graph, Canvas, and Bases.
- Use only local fixture data. External service sandboxes and historical data are not required.
- Before sharing screenshots, remove vault names, account menus, notifications, paths, and unrelated notes.
- Cleanup consists of switching to another theme, unregistering Archive Olive from BRAT, and deleting the disposable vault or theme folder through the platform's recoverable trash flow.

## Data migration check

| Item              | Result                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Current schema    | Not applicable                                                                                                    |
| Target schema     | Not applicable                                                                                                    |
| Old-data sample   | Not required                                                                                                      |
| Migration command | None                                                                                                              |
| Rollback concern  | BRAT follows `main`; a repository rollback must still change `theme.css` and may be delayed by GitHub Raw caching |

<!-- HAT:BEGIN checklist -->

## Acceptance checklist

### P0-01 — Prepare and identify the candidate

**Preconditions**

- A checkout of the repository is available on a desktop environment with Bash and Node.js.

**Steps**

1. Run `bash hats/20260725-brat-beta-cross-platform/prepare.sh prepare`.
2. Record the reported commit, manifest version, and SHA-256 checksums.
3. Confirm the prepared bundle contains `Archive Olive/theme.css`, `Archive Olive/manifest.json`, and `Archive Olive/LICENSE`.

**Expected**

- Strict repository validation passes.
- The candidate is `0.1.0`.
- The prepared files match the checked-out repository.

**Evidence**

- Copy the `HAT_PREPARE_SUMMARY` block and `SHA256SUMS` into the execution record.

**Notes**

- Mobile-only testers may receive the commit and expected hashes from the coordinator instead.

### P0-02 — Install through BRAT in a blank vault

**Preconditions**

- Latest supported BRAT is enabled.
- The vault contains no private notes, CSS snippets, or unrelated community plugins.

**Steps**

1. In BRAT, choose **Add Beta Theme**.
2. Enter `https://github.com/ivan-94/obsidian-archive-olive`.
3. Select **Archive Olive** under **Settings → Appearance → Themes**.
4. Restart or reload Obsidian once.

**Expected**

- BRAT completes without an error.
- Archive Olive appears in the theme selector and remains active after reload.
- The installed manifest reports version `0.1.0` and the assigned compatibility floor.

**Evidence**

- Screenshot the selected theme and record Obsidian, installer, BRAT, OS, and device versions.

**Notes**

- If GitHub Raw caching delays installation, wait several minutes and retry before removing and re-adding the repository.

### P0-03 — Core visual and interaction acceptance

**Preconditions**

- Archive Olive is active in the blank vault.
- Representative public fixtures are open.

**Steps**

1. Check light and dark appearances.
2. Inspect file explorer, tabs, editor, Reading View, properties, backlinks, status bar, command palette, settings, menus, dialogs, and notices.
3. Exercise default, hover, active, selected, focus-visible, disabled, error, and empty states.
4. Use keyboard navigation on desktop or touch navigation on mobile.

**Expected**

- The archival khaki, olive, oxblood, cyan, and carbon system remains coherent.
- Text is readable; focus and selection are visible without relying on color alone.
- No content, controls, menus, or native window buttons are clipped or inaccessible.
- No theme-caused developer-console error appears.

**Evidence**

- Capture one light and one dark overview plus any failed surface.

**Notes**

- Subjective visual quality and native-platform feel require a human decision.

### P0-04 — BRAT update delivery

**Preconditions**

- A coordinator has assigned a baseline commit and a later candidate whose `theme.css` differs.
- Archive Olive remains registered in BRAT at the baseline.

**Steps**

1. Record the baseline installed `theme.css` checksum.
2. Run **BRAT: Themes: Update beta themes** after the coordinator confirms the new commit is on `main`.
3. If no update appears, wait for GitHub Raw caching and retry.
4. Record the new installed checksum and reopen the active note.

**Expected**

- The installed checksum changes to the coordinator-provided candidate checksum.
- The theme stays active and the workspace remains usable.
- A cache delay is reported as such rather than as a visual failure.

**Evidence**

- Record both checksums, elapsed cache delay, and the BRAT completion notice.

**Notes**

- At least one private-pilot tester must complete this scenario.

### P0-05 — Disable, unregister, and remove

**Preconditions**

- Archive Olive is installed and active.

**Steps**

1. Switch to **Default** or another theme.
2. Remove Archive Olive from BRAT's registered themes.
3. Confirm monitoring stops while the installed files remain.
4. Move the `Archive Olive` theme folder to the platform's recoverable Trash.
5. Restart Obsidian.

**Expected**

- Obsidian falls back safely without broken styling.
- BRAT no longer monitors the repository.
- Removal does not affect notes or other settings.

**Evidence**

- Record the selected fallback theme and removal result.

**Notes**

- Do not empty Trash as part of acceptance.

### P0-06 — Issue intake dry run

**Preconditions**

- The tester is signed in to GitHub.

**Steps**

1. Open the bug form and the platform-validation form from README.
2. Confirm all expected fields, dropdowns, privacy notice, and required markers render.
3. Fill a platform report using only non-sensitive fixture information.
4. Submit only if the owner wants a real pilot record; otherwise take a screenshot and cancel.

**Expected**

- Both forms render without falling back to raw YAML.
- Required environment, reproduction, evidence, and privacy fields are usable.

**Evidence**

- Link the submitted issue or attach a privacy-reviewed screenshot.

**Notes**

- Signed-in rendering passed on 2026-07-25 for both forms. The read-only check did not fill or submit an issue; repeat the submission path with non-sensitive fixture data during the private pilot.

### P1-01 — Graph, Canvas, and Bases

**Preconditions**

- The relevant core plugins are enabled and fixture files exist.

**Steps**

1. Open Graph and exercise controls, labels, nodes, edges, hover, and selection.
2. Open Canvas and inspect cards, connectors, embedded notes, selection, and controls.
3. Open Bases and inspect headers, tags, links, resize affordances, and focus.

**Expected**

- All three surfaces remain readable and interactive in light and dark appearances.

**Evidence**

- Capture one screenshot per surface and appearance when practical.

**Notes**

- Mark unsupported mobile surfaces as not applicable with an explanation.

### P1-02 — Platform-specific layout

**Preconditions**

- The assigned native environment is available.

**Steps**

1. Desktop: inspect native/custom frames, maximized, narrow, and pop-out windows.
2. Mobile: inspect portrait and landscape, keyboard open/closed, sidebars, dialogs, and primary touch targets.
3. Change system/interface fonts if the platform's fallback differs from macOS.

**Expected**

- No unexplained clipping or overlap occurs.
- Primary mobile controls remain practically tappable.
- Typography changes do not break hierarchy or truncate critical controls.

**Evidence**

- Record device, OS, viewport/orientation, font configuration, and screenshots.

**Notes**

- Fail any state that prevents navigation, editing, saving, or recovery.

### P2-01 — Exploratory compatibility

**Preconditions**

- All P0 checks for the platform pass.

**Steps**

1. Enable commonly used plugins one at a time.
2. Try unusually long notes, file names, tags, tables, and inline code.
3. Record visual degradation separately from functional failure.

**Expected**

- Core Obsidian remains usable.
- Unsupported plugin-specific visuals are documented as non-blocking unless they obscure content or controls.

**Evidence**

- Link focused bug reports for reproducible failures.

**Notes**

- Optional Style Settings, texture, Publish, and curated plugin support are outside `0.1.0`.

<!-- HAT:END checklist -->

## Execution method

- Primary entry: native Obsidian plus BRAT.
- Supporting tools: this guide, `prepare.sh`, SHA-256 tooling, GitHub Actions, and the platform-validation Issue Form.
- There is no browser application surface and no `window.__hat` integration for an Obsidian CSS theme.
- Automation may confirm files, hashes, manifests, and console output. A human must judge visual hierarchy, readability, native-window behavior, touch ergonomics, and whether a defect blocks release.

## Pass criteria

- Every P0 scenario passes.
- P1 has no defect that blocks installation, navigation, editing, reading, recovery, or issue reporting.
- P2 findings are exploratory and triaged.
- Windows, Linux, iOS, and Android outcomes are recorded before `1.0.0`.
- At least three private-pilot environments are represented before public beta announcement.
- Cleanup is understood and no personal data appears in evidence.

## Execution record

| Time | Tester | Platform | Scenario | Result                      | Evidence | Notes |
| ---- | ------ | -------- | -------- | --------------------------- | -------- | ----- |
| TODO | TODO   | TODO     | TODO     | Pass / Fail / Blocked / N/A | TODO     | TODO  |

<!-- HAT:MANUAL notes -->

## Human notes

Add go/no-go reasoning, accepted visual differences, and links to pilot issues here. This section is preserved when the generated parts are refreshed.

<!-- HAT:ENDMANUAL notes -->

## Source Manifest

### Sources

- User direction in this Codex thread: prepare for BRAT first and leave real acceptance on other platforms to the owner.
- [Archive Olive BRAT Beta release specification](../../docs/specs/brat-beta-release.md).
- [Archive Olive theme specification](../../docs/specs/theme.md).
- [Design system](../../DESIGN.md).
- [Validation evidence](../../VALIDATION.md).
- [README installation and issue-reporting instructions](../../README.md).
- [Platform-validation Issue Form](../../.github/ISSUE_TEMPLATE/platform-validation.yml).
- [Bug Issue Form](../../.github/ISSUE_TEMPLATE/bug.yml).
- [Rendered platform-validation Issue Form](https://github.com/ivan-94/obsidian-archive-olive/issues/new?template=platform-validation.yml).
- [Rendered bug Issue Form](https://github.com/ivan-94/obsidian-archive-olive/issues/new?template=bug.yml).
- [GitHub Actions run for baseline `d73be74`](https://github.com/ivan-94/obsidian-archive-olive/actions/runs/30146751956).
- [Archive Olive 0.1.0 Beta pre-release](https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.0).
- [Archive Olive 0.1.1 Beta release record](../../docs/releases/0.1.1-beta.md).

### Produced artifacts

- `hats/20260725-brat-beta-cross-platform/guide.md`
- `hats/20260725-brat-beta-cross-platform/prepare.sh`

### Key decisions

- Use `blank` mode with disposable vaults and public fixtures; no historical or shared data is required.
- Keep BRAT as the primary installation and update path.
- Preserve pending human acceptance honestly after the owner-authorized pre-release.

### Verification evidence

- Baseline `d73be74` is public and GitHub Actions passes.
- macOS Obsidian `1.12.7` and BRAT `2.2.0` already passed install, changed stylesheet delivery, activation, disable, unregister, and removal.
- `bash -n hats/20260725-brat-beta-cross-platform/prepare.sh` passes.
- `shellcheck` was not available in the preparation environment.
- The low-risk blank preparation ran successfully for `d73be74`, manifest `0.1.0`, with stylesheet checksum `dd5323d8…`.
- On 2026-07-25, both Issue Forms rendered in a signed-in Chrome session with the expected fields, required markers, privacy check, and Create control. No issue was submitted.
- Release commit `034515d` passed GitHub Actions, annotated tag `0.1.0` resolves to that commit, and all four downloaded release assets match their tagged SHA-256 values.
- User feedback on the BRAT-installed `0.1.0` artifact identified unreadable navigation, tab-list, inactive-tab, and vault-switcher states.
- The `0.1.1` release passes real-application light/dark checks and sixteen automated contrast pairs; human BRAT retest remains pending.
- GitHub Actions run `30151853100` passed on `d011427e3310a170a230b4743c7cc3c476b3443f`; tag `0.1.1` resolves to that commit and its four downloaded assets match their tagged hashes.

### Open questions / risks

- A private-pilot tester still needs to exercise the non-sensitive Issue Form submission path.
- Pilot tester assignments and the real Windows, Linux, iOS, and Android environments are not available in this workspace.
- GitHub Raw caching can delay BRAT updates.
