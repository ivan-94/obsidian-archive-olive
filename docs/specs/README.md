# Archive Olive Specifications

All project specifications live in this directory.

| Specification                                                 | Status                                     | Purpose                                                                                         |
| ------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| [Theme](theme.md)                                             | Implemented; public-release gates remain   | Defines the theme behavior, compatibility, requirements, and acceptance criteria.               |
| [BRAT Beta Release](brat-beta-release.md)                     | `0.1.4` candidate ready for publication    | Defines the repository preparation, beta channel, validation, rollout, and rollback contract.   |
| [iOS Mobile Visual Hardening](mobile-ios-visual-hardening.md) | iPad accepted; owner iPhone retest pending | Fixes audited iPhone visual issues while treating the accepted desktop appearance as immutable. |

## Source Manifest

### Sources

- User direction in this Codex thread: keep every specification under `docs/`.
- Existing Archive Olive project documentation.

### Produced artifacts

- `docs/specs/README.md`
- `docs/specs/mobile-ios-visual-hardening.md`

### Key decisions

- `docs/specs/` is the canonical location for all project specifications.
- Each specification remains independently readable and carries its own Source Manifest.
- The accepted desktop appearance is a frozen regression baseline for mobile visual hardening.
