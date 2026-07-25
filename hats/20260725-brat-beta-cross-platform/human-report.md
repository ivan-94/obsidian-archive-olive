# Archive Olive HAT Copilot Report

## Scope

- Target: Archive Olive `0.1.1` navigation-contrast retest and continued BRAT acceptance.
- Candidate branch: `main`.
- Acceptance artifact: the `theme.css` and `manifest.json` files installed by BRAT under the active Obsidian vault.
- Environment: macOS host, native Obsidian, repository `test-vault`.
- Human acceptance owner: repository owner.
- Excluded from the primary judgment: local source files and the manually prepared bundle. They may be used only to audit the installed artifact's identity.

## Progress

- [x] Environment and candidate identity
- [ ] P0 acceptance
- [ ] P1 acceptance
- [ ] P2 exploratory acceptance
- [ ] Cleanup and final summary

## Environment

| Item                              | Result                                                                                                          |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Candidate commit                  | Local `0.1.1` candidate; release commit pending                                                                 |
| Obsidian version                  | Desktop `1.12.7`                                                                                                |
| BRAT version                      | `2.2.0` from the preceding lifecycle smoke test; the current vault no longer contains the BRAT plugin directory |
| Operating system                  | macOS                                                                                                           |
| Vault                             | Repository `test-vault`                                                                                         |
| Installed theme path              | `test-vault/.obsidian/themes/Archive Olive`                                                                     |
| Installed `theme.css` SHA-256     | `dd5323d84f96bdb5d49f8b78efaaa8ca4c74cd51983d91a55a0ac711a60b9391`                                              |
| Installed `manifest.json` SHA-256 | `42c6912add2f822eb33e19683769debfc8e7e6015124c43a0f7ec9a7ac3e3a4f`                                              |

## Acceptance Cases

### P0

- [x] P0-01 — Identify the BRAT-installed candidate
  - Status: Passed
  - Human result: Not required for checksum comparison
  - Notes: Installed `theme.css` and `manifest.json` hashes exactly match the published `0.1.0` release assets. The installed manifest is Archive Olive `0.1.0` with `minAppVersion: 1.12.7`; `appearance.json` selects `Archive Olive`; Obsidian is running.
  - Next: Human confirms that the installed candidate survives an Obsidian reload.
- [ ] P0-02 — Install, activate, and survive reload
  - Status: Partial
  - Human result: Pending
  - Notes: User screenshots prove the BRAT-installed `0.1.0` theme was active; explicit reload-survival confirmation remains open.
  - Next: Update to the published `0.1.1` artifact, reload once, and confirm Archive Olive remains active.
- [ ] P0-03 — Core visual and interaction acceptance
  - Status: Failed on `0.1.0`; remediation prepared
  - Human result: Failed — navigation and tab-list icons disappeared in active/dark chrome states, while inactive root and side-dock tabs were difficult to read.
  - Notes: The `0.1.1` candidate introduces semantic chrome foregrounds. Agent checks pass in the real three-pane workspace in light and dark appearances.
  - Next: Human retests the published `0.1.1` artifact through BRAT.
- [ ] P0-04 — BRAT update delivery
  - Status: Pending evidence decision
  - Human result: Pending
  - Notes: A previous changed-stylesheet update passed; decide whether to inherit that evidence after identifying the final candidate.
  - Next:
- [ ] P0-05 — Disable, unregister, and remove
  - Status: Deferred until the end of the session
  - Human result: Pending
  - Notes: Do not destroy the acceptance environment before visual checks finish.
  - Next:
- [ ] P0-06 — Issue intake dry run
  - Status: Rendering already passed; submission pending
  - Human result: Pending
  - Notes: Use only non-sensitive fixture information.
  - Next:

### P1

- [ ] P1-01 — Graph, Canvas, and Bases
  - Status: Pending
  - Human result: Pending
  - Notes:
  - Next:
- [ ] P1-02 — Platform-specific layout
  - Status: Pending
  - Human result: Pending
  - Notes:
  - Next:

### P2

- [ ] P2-01 — Exploratory plugin and content compatibility
  - Status: Pending
  - Human result: Pending
  - Notes:
  - Next:

## Follow-ups

- [ ] Record human go/no-go for the macOS BRAT-installed artifact.
- [ ] Record private-pilot results from additional desktop and mobile environments.
- [ ] Keep broader announcement and official-directory submission blocked until acceptance results are reviewed.

## Source Manifest

### Sources

- User direction in this Codex thread: proceed with acceptance using the final artifact downloaded by BRAT.
- User direction in this Codex thread: publish the opt-in pre-release now and complete BRAT acceptance later.
- User feedback screenshots from BRAT-installed `0.1.0`: `codex-clipboard-50139ae0…png`, `codex-clipboard-d0c6d588…png`, `codex-clipboard-a574d601…png`, `codex-clipboard-3138ed75…png`, and `codex-clipboard-e582ffbc…png`.
- [Cross-platform HAT guide](guide.md).
- [BRAT beta release specification](../../docs/specs/brat-beta-release.md).
- [Validation evidence](../../VALIDATION.md).
- [Repository README](../../README.md).
- [`0.1.0` release commit](https://github.com/ivan-94/obsidian-archive-olive/commit/034515ddc03b245d2635324465f8aac8e47bea43).
- [Archive Olive 0.1.0 Beta pre-release](https://github.com/ivan-94/obsidian-archive-olive/releases/tag/0.1.0).
- [Archive Olive 0.1.1 Beta release record](../../docs/releases/0.1.1-beta.md).

### Produced artifacts

- `hats/20260725-brat-beta-cross-platform/human-report.md`

### Key decisions

- Treat the files installed by BRAT as the sole visual-acceptance candidate.
- Use local and remote repository files only to confirm the installed artifact's identity.
- Run removal and cleanup last.
- Human judgment determines visual and experiential acceptance.
- Pre-release publication is owner-authorized but does not convert pending human cases into passes.
- Treat the feedback as a P0 visual failure and ship a new patch version instead of mutating `0.1.0`.

### Verification evidence

- Annotated tag `0.1.0` resolves to release commit `034515ddc03b245d2635324465f8aac8e47bea43`.
- The BRAT-installed `theme.css` SHA-256 `dd5323d8…` exactly matched the immutable remote candidate file.
- The BRAT-installed `manifest.json` SHA-256 `42c6912a…` exactly matched the immutable remote candidate file.
- The installed manifest reports Archive Olive `0.1.0` and `minAppVersion: 1.12.7`.
- Obsidian Desktop `1.12.7` is running and the vault configuration selects `Archive Olive`.
- `node scripts/validate.mjs --release` passed against the candidate repository.
- GitHub Actions run `30148368218` passed on the release commit.
- The published release is not a draft, is marked as a pre-release, and exposes four assets whose downloaded SHA-256 values match the tagged files.
- User screenshots reproduce the `0.1.0` contrast defects across the carbon root strip, signal-cyan side dock, and field-olive vault profile.
- The `0.1.1` candidate passes real-application checks in light and dark appearances plus sixteen automated contrast pairs.

### Open questions / risks

- The current vault no longer contains the BRAT plugin directory, so BRAT `2.2.0` is inherited from the preceding lifecycle smoke-test evidence rather than re-read from the active vault.
- Human confirmation of the published `0.1.1` artifact remains pending.
- Real Windows, Linux, iOS, and Android acceptance remains external to this macOS session.
- GitHub Raw caching may delay BRAT update delivery.
