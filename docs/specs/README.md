# Archive Olive Specifications

All project specifications live in this directory.

| Specification                                                       | Status                                     | Purpose                                                                                         |
| ------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| [Theme](theme.md)                                                   | Implemented; public-release gates remain   | Defines the theme behavior, compatibility, requirements, and acceptance criteria.               |
| [Colorways](colorways.md)                                           | Implemented; cross-platform review pending | Defines independent optional light and dark palette selection through Style Settings.           |
| [BRAT Beta Release](brat-beta-release.md)                           | `0.1.8` candidate; scoped review pending   | Defines the repository preparation, beta channel, validation, rollout, and rollback contract.   |
| [iOS Mobile Visual Hardening](mobile-ios-visual-hardening.md)       | iPad accepted; owner iPhone retest pending | Fixes audited iPhone visual issues while treating the accepted desktop appearance as immutable. |
| [File Explorer Visual Hierarchy](file-explorer-visual-hierarchy.md) | Approved for `0.1.6`; desktop P0 validated | Redesigns the native file tree hierarchy and states within CSS-theme capability boundaries.     |

## Source Manifest

### Sources

- User direction in this Codex thread: keep every specification under `docs/`.
- Existing Archive Olive project documentation.

### Produced artifacts

- `docs/specs/README.md`
- `docs/specs/colorways.md`
- `docs/specs/mobile-ios-visual-hardening.md`
- `docs/specs/file-explorer-visual-hierarchy.md`

### Key decisions

- `docs/specs/` is the canonical location for all project specifications.
- Each specification remains independently readable and carries its own Source Manifest.
- The accepted desktop appearance is a frozen regression baseline for mobile visual hardening.
