---
aliases:
  - Archive Olive Showcase
tags:
  - theme
  - brutalism
status: active
rating: 5
reviewed: 2026-07-25
---

# Archive Olive Field Manual

Archive Olive turns a working vault into an exposed editorial system: **khaki paper**, field olive navigation, oxblood warnings, signal cyan focus, and carbon rules. It should feel forceful around the workspace while remaining calm inside long-form notes.

This fixture exercises [[01 - Dense Workspace]], [[02 - Multilingual]], and an intentionally [[Missing field report|unresolved link]].

## Purpose and principles

- Information comes before decoration.
- Every boundary explains structure.
- Color communicates state and hierarchy.
- Long-form writing remains readable.
  - Nested lists keep visible guides.
  - Deep structure must not become visual noise.

1. Inspect the shell.
2. Inspect Markdown primitives.
3. Switch between Live Preview and Reading View.
4. Switch between light and dark mode.

### Acceptance checklist

- [x] Theme files are installed locally.
- [x] Light and dark tokens exist.
- [ ] Verify keyboard focus in command palette.
- [ ] Verify Graph, Canvas, and Bases.
- [ ] Verify a narrow window.

> The interface should show how it is assembled. It should not pretend to float.

> [!note] Field note
> Signal cyan identifies information and navigation. This callout also contains `inline code` and a [documentation link](https://docs.obsidian.md/).

> [!warning] Archive warning
> Oxblood and stamp colors are scarce. Use them only when the state matters.

> [!danger] Critical condition
> Color is paired with a title, icon, and border—not used alone.

> [!success] Inspection passed
> The selected item remains obvious even in grayscale.

## Components under load

| Component | State | Owner | Result |
| --- | --- | --- | ---: |
| File explorer | Active | Navigation | 100 |
| Editor | Focused | Writing | 96 |
| Backlinks | Empty | Context | 88 |
| Command palette | Open | Navigation | 92 |

Inline code looks like `--ao-olive: #59611c`, while fenced code receives a signal gutter:

```css
.nav-file-title.is-active {
  background: var(--ao-olive);
  color: var(--ao-paper);
  border: 2px solid var(--ao-ink);
}
```

Highlighted text should feel like an archive stamp: ==verify the state, not the decoration==.

Tags remain rectangular: #theme/archive #status/active #research

## Embedded context

![[01 - Dense Workspace#Long-form reading sample]]

---

###### FIELD NOTE / 00 / VERIFIED
