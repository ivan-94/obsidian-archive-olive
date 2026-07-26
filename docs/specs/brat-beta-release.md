# Archive Olive BRAT Beta Release Specification

| Field                 | Value                                                                               |
| --------------------- | ----------------------------------------------------------------------------------- |
| Status                | `0.1.5` published — cross-platform colorway review pending                          |
| Specification version | 0.1.0                                                                               |
| Target release        | `0.1.0` BRAT Beta                                                                   |
| Repository            | [ivan-94/obsidian-archive-olive](https://github.com/ivan-94/obsidian-archive-olive) |
| Owner                 | Ivan                                                                                |
| Last updated          | 2026-07-26                                                                          |
| Related specification | [Theme specification](theme.md)                                                     |

## 1. Purpose

Prepare and publish Archive Olive as an installable beta through the Obsidian BRAT plugin before submitting it to the official Obsidian community theme directory.

This specification turns the release plan into an implementation and acceptance contract. It separates repository and macOS validation work that can be completed in this project from real-device and cross-platform acceptance that the owner will perform later.

## 2. Goals

- Let testers install Archive Olive from its GitHub repository using BRAT.
- Keep one authoritative beta stylesheet and metadata file at the repository root.
- Make installation, updates, issue reporting, known limitations, and rollback understandable.
- Detect invalid packaging and common theme-policy violations before changes reach `main`.
- Establish a small pilot stage before a public beta announcement.
- Preserve evidence needed for eventual official community-directory submission.

## 3. Non-goals

- Submitting Archive Olive to the official community theme directory in this release.
- Claiming Windows, Linux, iOS, Android, or minimum-version support without real validation.
- Supporting every community plugin before beta.
- Maintaining simultaneous stable and beta CSS channels during the first beta.
- Adding a build pipeline when the distributable can remain a single authored `theme.css`.
- Automating subjective visual acceptance on platforms the project cannot currently access.

## 4. Release channel architecture

### 4.1 Authoritative beta channel

BRAT Beta uses the default branch as its update channel:

```text
GitHub repository
└── main
    ├── manifest.json
    └── theme.css
```

The files `manifest.json` and `theme.css` must remain at the repository root and be retrievable without authentication.

### 4.2 No parallel beta stylesheet

Do not add `theme-beta.css` for the first beta. BRAT gives that file priority over `theme.css` when both exist, which would create two sources that can drift.

Introduce `theme-beta.css` only after a stable channel exists and a separate experimental channel has a concrete owner, synchronization policy, and retirement plan. That change requires a new specification decision.

### 4.3 Update semantics

BRAT detects theme updates from changes to the theme file, not from `manifest.json` version changes alone. Every tester-facing update must therefore include an intentional change to `theme.css`.

GitHub raw-content caching can delay update visibility. Release communication and troubleshooting must state that testers may need to wait or remove and re-add the beta theme.

## 5. Scope and deliverables

### 5.1 Repository deliverables

| Artifact                                         | Required change                                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `LICENSE`                                        | Keep the owner-selected MIT license at the repository root and link it from README.                           |
| `manifest.json`                                  | Keep valid required fields; add `authorUrl`; set an evidence-backed `minAppVersion`.                          |
| `theme.css`                                      | Remain the single installable stylesheet; every beta update changes this file.                                |
| `README.md`                                      | Add beta status, BRAT install/update/removal instructions, compatibility, known limitations, and issue links. |
| `CHANGELOG.md`                                   | Record user-visible beta changes, fixes, known regressions, and version dates.                                |
| `assets/screenshots/archive-olive-512x288.png`   | Provide a current public-safe release image at the official directory aspect and size.                        |
| `.github/workflows/validate.yml`                 | Validate every pull request and push to `main`.                                                               |
| `.github/ISSUE_TEMPLATE/bug.yml`                 | Collect reproducible theme defects and environment details.                                                   |
| `.github/ISSUE_TEMPLATE/platform-validation.yml` | Collect structured cross-platform acceptance evidence.                                                        |

### 5.2 Validation workflow

The GitHub Actions workflow must:

- validate `manifest.json` syntax and required fields;
- run `node scripts/validate.mjs`;
- parse or build `theme.css` with the selected CSS validator;
- reject forbidden remote dependencies and known unsupported selectors;
- check formatting for distributable and documentation files;
- confirm `theme.css` and `manifest.json` remain at the repository root;
- fail clearly enough that a contributor can reproduce the check locally.

Dependency versions used by CI must be pinned or otherwise intentionally controlled. CI must not rewrite tracked files.

### 5.3 Issue intake

The bug form must request:

- Obsidian version and installer version;
- Archive Olive commit or release version;
- operating system and version;
- BRAT version;
- enabled snippets and relevant plugins;
- light or dark appearance;
- reproduction steps, expected behavior, actual behavior, and screenshot;
- whether the issue reproduces in a clean vault.

The platform-validation form must request:

- device and operating system;
- Obsidian version;
- install, update, and removal outcome;
- light and dark results;
- editor, reading view, navigation, dialogs, Graph, Canvas, and Bases outcome;
- keyboard, touch, and narrow-layout observations as applicable;
- screenshots with personal vault data removed.

## 6. Requirements

Priority meanings:

- **P0:** required before inviting any external BRAT tester.
- **P1:** required before announcing the BRAT beta publicly.
- **P2:** required before official community-directory submission.

### 6.1 P0 — private pilot readiness

| ID       | Requirement                                                                                                 | Acceptance evidence                                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| BRAT-001 | The public repository exposes root `theme.css` and `manifest.json` from `main`.                             | Both raw files return successfully without authentication.                                                                                      |
| BRAT-002 | The manifest contains valid `name`, `version`, `minAppVersion`, and `author`, plus the project `authorUrl`. | Automated validation passes and values match README release claims.                                                                             |
| BRAT-003 | The compatibility floor is truthful.                                                                        | `minAppVersion` equals a tested version or has a documented audit. Until lower versions are verified, use the current tested baseline `1.12.7`. |
| BRAT-004 | The repository has a public license chosen by the owner.                                                    | `LICENSE` exists and README names the same license.                                                                                             |
| BRAT-005 | README documents BRAT installation, updating, removal, beta status, support scope, and known limitations.   | A person unfamiliar with the repository can complete each task from README alone.                                                               |
| BRAT-006 | Automated validation protects `main`.                                                                       | The required workflow passes on the intended release commit and fails on an intentionally invalid fixture or test branch.                       |
| BRAT-007 | A clean-vault BRAT smoke test passes on macOS.                                                              | Evidence records install, enable, update, disable, remove, light, dark, and developer-console results.                                          |
| BRAT-008 | A current release image contains no private vault data.                                                     | The `512 × 288` image is reviewed from the tracked artifact.                                                                                    |
| BRAT-009 | Testers have a structured defect-reporting path.                                                            | Both GitHub issue forms render and accept a dry-run report.                                                                                     |
| BRAT-010 | Release notes expose known gaps honestly.                                                                   | README and changelog state that real Windows, Linux, iOS, Android, and minimum-version validation is pending where applicable.                  |

### 6.2 P1 — public BRAT beta readiness

| ID       | Requirement                                                                                   | Acceptance evidence                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| BRAT-101 | A private pilot includes three to five testers beyond the primary implementation environment. | Pilot records identify environment, install outcome, and blocking issues without collecting unnecessary personal data.              |
| BRAT-102 | Install and update paths work from BRAT.                                                      | At least one pilot tester installs from scratch and one receives a CSS update.                                                      |
| BRAT-103 | No unresolved blocker remains.                                                                | Open issues are triaged; no issue labeled blocker is open at announcement time.                                                     |
| BRAT-104 | Known non-blocking issues are discoverable.                                                   | README or the beta announcement links to a current known-issues section.                                                            |
| BRAT-105 | A reproducible rollback point exists.                                                         | The release commit is tagged and a GitHub pre-release contains matching `manifest.json` and `theme.css`.                            |
| BRAT-106 | Public announcement instructions are complete.                                                | Announcement includes repository, BRAT command wording, beta warning, compatibility statement, issue link, and update-cache caveat. |

### 6.3 P2 — later official release readiness

| ID       | Requirement                                                          | Acceptance evidence                                                                                             |
| -------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| BRAT-201 | Required desktop and mobile platforms have real acceptance evidence. | Owner records Windows, Linux, iOS, and Android outcomes; macOS evidence remains current.                        |
| BRAT-202 | The minimum supported Obsidian version is verified.                  | A test or documented selector/CSS-variable audit supports `minAppVersion`.                                      |
| BRAT-203 | Official release packaging follows Obsidian rules.                   | The tag exactly matches the manifest version and the release attaches `manifest.json` and `theme.css`.          |
| BRAT-204 | Community directory metadata is ready.                               | Name uniqueness, repository visibility, license, README, current screenshot, and author metadata are rechecked. |
| BRAT-205 | `1.0.0` has no known release blocker.                                | Final owner go/no-go is recorded after cross-platform acceptance.                                               |

## 7. Version and release policy

### 7.1 Versions

- `0.1.0`: first BRAT beta.
- `0.1.x`: backward-compatible fixes to the current beta direction.
- `0.2.0` and later minor versions: material visual or compatibility changes during beta.
- `1.0.0`: first official community-directory candidate after P2 acceptance.

Versions must use semantic versioning without a leading `v` in the manifest or release tag.

### 7.2 GitHub pre-release

BRAT does not require a GitHub release to install the theme. Nevertheless, create a GitHub **pre-release** for each deliberate beta checkpoint so testers and maintainers have:

- a named rollback point;
- downloadable `manifest.json` and `theme.css`;
- human-readable release notes;
- a stable reference for issue reports.

The tag must exactly match the manifest version. Attached files must come from the tagged commit.

### 7.3 Change discipline

- Merge only a green, reviewed release commit to `main`.
- Update `CHANGELOG.md` for every tester-visible release.
- Update `manifest.json` only when publishing a new named checkpoint.
- Ensure every BRAT-delivered fix also changes `theme.css`.
- Do not rewrite a published tag or replace its assets in place.

## 8. Test and acceptance matrix

| Area              | Project/Codex responsibility                                                           | Owner or tester responsibility                 |
| ----------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Static validation | Manifest, CSS, formatting, forbidden-pattern, root-file, and repository checks         | Review policy decisions                        |
| macOS             | Clean-vault BRAT install/update/removal and visual regression on the available runtime | Optional independent confirmation              |
| Windows           | Prepare instructions and intake form                                                   | Real acceptance                                |
| Linux             | Prepare instructions and intake form                                                   | Real acceptance                                |
| iOS               | Prepare touch/mobile checklist                                                         | Real-device acceptance                         |
| Android           | Prepare touch/mobile checklist                                                         | Real-device acceptance                         |
| Visual surfaces   | Maintain fixtures and current macOS evidence                                           | Confirm native rendering on assigned platforms |
| Release decision  | Summarize evidence and blockers                                                        | Make the final go/no-go decision               |

Every platform acceptance must cover, where available:

1. installation through BRAT;
2. update after a known CSS change;
3. disabling and removal;
4. light and dark appearance;
5. file explorer, tabs, editor, reading view, command palette, settings, menus, and dialogs;
6. long-form Markdown fixtures and multilingual content;
7. focus, hover, selected, disabled, error, and empty states;
8. Graph, Canvas, and Bases;
9. narrow layout, touch targets, or native window controls as applicable;
10. theme-caused developer-console errors.

## 9. Rollout

### Phase 0 — decisions and repository preparation

Entry: this specification is accepted.

Work:

- confirm the selected MIT license and repository metadata;
- implement repository deliverables;
- decide and document the compatibility floor;
- run validation locally and in GitHub Actions.

Exit: BRAT-001 through BRAT-006, BRAT-008, BRAT-009, and BRAT-010 pass.

### Phase 1 — clean-vault self-test

Entry: repository preparation is green on `main`.

Work:

- install the theme through BRAT in an isolated vault;
- exercise install, update, disable, and removal;
- inspect core surfaces in light and dark modes;
- record logs and screenshots without personal vault content.

Exit: BRAT-007 passes and no P0 blocker remains.

### Phase 2 — private pilot

Entry: all P0 requirements pass.

Work:

- invite three to five testers;
- collect structured reports;
- ship fixes through the same update path;
- confirm at least one real BRAT update.

Exit: BRAT-101 through BRAT-104 pass.

### Phase 3 — public BRAT beta

Entry: private pilot exit criteria pass.

Work:

- tag the approved commit;
- create the matching GitHub pre-release and attach artifacts;
- publish installation and support instructions;
- triage incoming issues and maintain known limitations.

Exit: all P1 requirements pass and the beta remains supportable.

### Phase 4 — stabilization and official submission

Entry: public beta feedback is stable enough to define a `1.0.0` candidate.

Work:

- complete owner-led platform acceptance;
- verify the compatibility floor;
- resolve release blockers;
- package and submit the official theme.

Exit: all P2 requirements pass.

## 10. Rollback and incident response

Because BRAT follows `main`, rollback means restoring a known-good stylesheet on `main`, not merely changing a GitHub release:

1. Stop the public announcement or mark the beta as affected.
2. Revert the faulty change with a new commit; do not rewrite history.
3. Ensure the rollback commit intentionally changes `theme.css` so BRAT detects it.
4. Run the full validation workflow.
5. Confirm the restored commit through a clean-vault BRAT update.
6. Publish an incident note with impact, affected commits, workaround, and cache-delay caveat.

If BRAT does not see the restored update immediately, testers may wait for GitHub cache expiry or remove and re-add the beta theme. The last known-good pre-release remains available for manual recovery.

## 11. Security and privacy

- Do not load remote fonts, images, analytics, scripts, or trackers from theme CSS.
- Do not commit a real user vault, credentials, tokens, BRAT configuration, or personal note content.
- Use only the isolated fixture vault for repeatable evidence.
- Review screenshots for names, vault paths, note content, account data, and notifications before committing them.
- Pin or intentionally control CI dependencies and grant workflows only the permissions they require.
- Treat third-party bug reports as public data; request only information needed to reproduce the issue.

## 12. Definition of done

### BRAT Beta preparation

Preparation is complete when:

- every P0 requirement passes;
- the owner has selected the license;
- all deliverables are present and linked from README;
- CI is green on the exact commit intended for pilot testing;
- an isolated BRAT install and update have evidence;
- no unresolved P0 blocker remains.

### Public BRAT Beta

The public beta is ready when:

- all P0 and P1 requirements pass;
- the matching pre-release and rollback artifacts exist;
- installation, known limitations, reporting, and cache behavior are documented;
- the owner approves public announcement.

### Official release candidate

The official candidate is ready only when all P2 requirements pass. Successful macOS testing or mobile emulation alone is not sufficient.

## 13. Open decisions

| Decision                 | Current state                                                                             | Owner |
| ------------------------ | ----------------------------------------------------------------------------------------- | ----- |
| Public license           | Applied: MIT license selected and added at repository root.                               | Ivan  |
| Beta compatibility floor | Applied: `minAppVersion` is the currently tested `1.12.7`; lower only after new evidence. | Ivan  |
| Beta pre-release         | `0.1.5` authorized as a colorway checkpoint with cross-platform review pending.           | Ivan  |

BRAT-004 now passes locally with the owner-selected MIT license. Revisit the compatibility decision only if the project intends to support versions older than `1.12.7`.

## 14. Implementation status

Status as of 2026-07-25:

The owner authorized the opt-in GitHub pre-release before completing the human pilot. This exception publishes a recoverable beta checkpoint but does not mark the pending human acceptance requirements as passed or authorize official-directory submission.

| Requirement | Local state                                                                                                          | Remaining work                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| BRAT-001    | Public root files confirmed on pushed `main`                                                                         | None                                                          |
| BRAT-002    | Implemented; required metadata is live                                                                               | None                                                          |
| BRAT-003    | Implemented with `1.12.7` runtime evidence                                                                           | Revisit only if lowering the floor                            |
| BRAT-004    | Implemented with the owner-selected MIT license                                                                      | None                                                          |
| BRAT-005    | Implemented and checked against BRAT `2.2.0`                                                                         | Keep wording current if BRAT changes                          |
| BRAT-006    | Implemented; isolated invalid-CSS probe fails and GitHub Actions passes                                              | None                                                          |
| BRAT-007    | Passed: install, changed stylesheet/manifest delivery, light/dark activation, unregistration, disabling, and removal | Repeat during the private pilot                               |
| BRAT-008    | Implemented                                                                                                          | Final owner visual review                                     |
| BRAT-009    | Signed-in rendering passed for both forms; no issue was submitted during the read-only check                         | A private-pilot tester submits a non-sensitive dry-run report |
| BRAT-010    | Implemented                                                                                                          | Keep limitations current through pilot                        |

## Source Manifest

### Sources

- User direction in this Codex thread: plan the work before release, use BRAT first, and leave real acceptance on other platforms to the owner.
- User direction in this Codex thread: keep every specification under `docs/`.
- User confirmation in this Codex thread: use the MIT license.
- [Theme specification](theme.md).
- [`README.md`](../../README.md).
- [`manifest.json`](../../manifest.json).
- [`VALIDATION.md`](../../VALIDATION.md).
- [Rendered bug Issue Form](https://github.com/ivan-94/obsidian-archive-olive/issues/new?template=bug.yml).
- [Rendered platform-validation Issue Form](https://github.com/ivan-94/obsidian-archive-olive/issues/new?template=platform-validation.yml).
- [BRAT Quick Guide](https://tfthacker.com/brat-quick-guide).
- [BRAT theme documentation](https://tfthacker.com/brat-themes).
- [Obsidian developer documentation: Submit your theme](https://github.com/obsidianmd/obsidian-developer-docs/blob/main/en/Themes/App%20themes/Submit%20your%20theme.md).
- [Obsidian developer documentation: Manifest](https://docs.obsidian.md/Reference/Manifest).
- [Obsidian theme self-critique checklist](https://docs.obsidian.md/oo/theme).
- [Obsidian community theme index](https://github.com/obsidianmd/obsidian-releases/blob/master/community-css-themes.json).

### Produced artifacts

- `docs/specs/brat-beta-release.md`
- `docs/specs/README.md`
- `docs/specs/theme.md` (relocated from root `SPEC.md`)
- Updated references in `README.md`, `DESIGN.md`, and `VALIDATION.md`
- `CHANGELOG.md`
- `LICENSE`
- `.github/workflows/validate.yml`
- `.github/ISSUE_TEMPLATE/bug.yml`
- `.github/ISSUE_TEMPLATE/platform-validation.yml`
- `assets/screenshots/archive-olive-512x288.png`
- `hats/20260725-brat-beta-cross-platform/guide.md`
- `hats/20260725-brat-beta-cross-platform/prepare.sh`
- `docs/releases/0.1.0-beta.md`
- `docs/releases/0.1.0-beta-notes.md`
- `docs/releases/0.1.1-beta.md`
- `docs/releases/0.1.1-beta-notes.md`
- `docs/releases/0.1.2-beta.md`
- `docs/releases/0.1.2-beta-notes.md`
- `docs/releases/0.1.3-beta.md`
- `docs/releases/0.1.3-beta-notes.md`
- `docs/releases/0.1.4-beta.md`
- `docs/releases/0.1.4-beta-notes.md`
- `docs/releases/0.1.5-beta.md`
- `docs/releases/0.1.5-beta-notes.md`

### Key decisions

- The first BRAT beta follows `main/theme.css`.
- The first beta does not add `theme-beta.css`.
- GitHub pre-releases provide checkpoints and rollback artifacts but are not the BRAT update channel.
- Repository preparation and macOS clean-vault checks are project responsibilities.
- The owner performs real Windows, Linux, iOS, and Android acceptance later.
- P0 gates private testing, P1 gates public beta announcement, and P2 gates official submission.
- The beta compatibility floor is `1.12.7`, matching current runtime evidence.

### Verification evidence

- The current public repository exposes `manifest.json` and `theme.css` at its root.
- The current theme has local validation evidence on Obsidian Desktop `1.12.7` for macOS.
- BRAT documentation was checked for theme file names, beta-file precedence, update detection, and caching behavior.
- Official Obsidian documentation was checked for manifest, release tag, release asset, license, README, and screenshot requirements.
- The official community theme index contained 647 entries and no `Archive Olive` name or repository match when checked on 2026-07-25.
- Local repository, CSS, design-document, formatting, and image-dimension checks pass after the initial implementation.
- Strict release validation passes with the owner-selected MIT license present.
- BRAT `2.2.0` installed the public repository into a new Obsidian `1.12.7` vault; the installed `theme.css` checksum matched the public file.
- GitHub Actions passed on pushed commit `2122ee5`.
- After GitHub Raw caching cleared, BRAT replaced the installed stylesheet checksum `69c57422…` with `dd5323d8…`, matching the pushed `theme.css`; the updated manifest was also present.
- Light and dark activation, an update check, BRAT unregistration, theme disabling, and recoverable removal passed in the isolated vault.
- On 2026-07-25, both Issue Forms rendered in a signed-in Chrome session with their intended fields, required markers, privacy check, and Create control. The check was read-only and did not submit an issue.
- GitHub Actions run [30148368218](https://github.com/ivan-94/obsidian-archive-olive/actions/runs/30148368218) passed on release commit `034515d`.
- Annotated tag `0.1.0` resolves to `034515ddc03b245d2635324465f8aac8e47bea43`.
- The [Archive Olive 0.1.0 Beta pre-release](https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.0) is published with verified `theme.css`, `manifest.json`, `LICENSE`, and release-image digests.
- User screenshots from the BRAT-installed `0.1.0` artifact exposed low-contrast root tabs, side-dock icons, tab-list controls, and the vault-switcher chevron.
- The `0.1.1` release replaces generic muted body text on application chrome with surface-specific semantic foreground tokens and passes real-application light/dark checks.
- GitHub Actions run [30151853100](https://github.com/ivan-94/obsidian-archive-olive/actions/runs/30151853100) passed on release commit `d011427e3310a170a230b4743c7cc3c476b3443f`.
- Annotated tag `0.1.1` resolves to that commit, and the [0.1.1 pre-release](https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.1) exposes four assets whose downloaded SHA-256 values match the tagged files.
- The `0.1.2` candidate preserves chrome foregrounds after pane blur, restores a non-color active side-dock cue, and keeps interactive Markdown table headers readable in the real Obsidian runtime.
- GitHub Actions run [30155669146](https://github.com/ivan-94/obsidian-archive-olive/actions/runs/30155669146) passed on release commit `a6352c5bb1fb14dbd97c0c741212f45d50c7e266`.
- Annotated tag `0.1.2` resolves to that commit, and the [0.1.2 pre-release](https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.2) exposes four assets whose downloaded SHA-256 values match the tagged files.
- The `0.1.3` candidate uses mobile-scoped semantic surfaces, explicit tap/selected states, opaque prompts, and square mobile geometry while keeping the accepted desktop baseline unchanged.
- GitHub Actions run [30162413956](https://github.com/ivan-94/obsidian-archive-olive/actions/runs/30162413956) passed on release commit `f0dbcb2ca1eab9a5f29ed6ff197d888f63e33f47`.
- Annotated tag `0.1.3` resolves to that commit, and the [0.1.3 pre-release](https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.3) exposes four assets whose downloaded SHA-256 values match the tagged files.
- The `0.1.4` candidate incorporates real-iPad drawer and safe-area verification, keeps the first drawer option reachable after switching views, and applies pure black only to dark Markdown content across desktop and iOS.
- GitHub Actions run [30195789535](https://github.com/ivan-94/obsidian-archive-olive/actions/runs/30195789535) passed on release commit `d2ce75c2f4ea8b8aa242a767f7ce5e2c9c79b806`.
- Annotated tag `0.1.4` resolves to that commit, and the [0.1.4 pre-release](https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.4) exposes four assets whose downloaded SHA-256 values match the tagged files.
- The `0.1.5` candidate adds four independently selectable light colorways and
  four independently selectable dark colorways through optional Style Settings,
  keeps all dark Markdown content pure black, and passes the expanded colorway
  token and contrast validation locally.
- GitHub Actions run [30201817564](https://github.com/ivan-94/obsidian-archive-olive/actions/runs/30201817564)
  passed on release commit `d8d57dc7de691a23aa399abac60cd81990337513`.
- Annotated tag `0.1.5` resolves to that commit, and the
  [0.1.5 pre-release](https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.5)
  exposes four assets whose downloaded SHA-256 values match the tagged files.

### Open questions and risks

- Compatibility below `minAppVersion: 1.12.7` is not currently claimed.
- GitHub raw-content caching may delay urgent updates or rollbacks.
- A private-pilot tester still needs to submit a non-sensitive dry-run report through the rendered Issue Forms.
- Owner-led BRAT and cross-platform colorway review of `0.1.5` remains pending.
- Real Windows, Linux, and Android testing remains external to this implementation environment.
- A future stable/beta channel split would require a deliberate `theme-beta.css` lifecycle policy.
