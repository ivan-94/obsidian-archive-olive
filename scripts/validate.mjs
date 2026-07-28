import assert from 'node:assert/strict';
import { access, readFile, readlink } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = path => readFile(resolve(root, path), 'utf8');
const readBuffer = path => readFile(resolve(root, path));
const exists = async path => {
  try {
    await access(resolve(root, path));
    return true;
  } catch {
    return false;
  }
};
const releaseMode = process.argv.includes('--release');

const [
  css,
  manifestText,
  canvasText,
  baseText,
  readme,
  changelog,
  validation,
  agents,
  workflow,
  bugForm,
  platformForm,
] = await Promise.all([
  read('theme.css'),
  read('manifest.json'),
  read('test-vault/Archive Olive.canvas'),
  read('test-vault/Theme Notes.base'),
  read('README.md'),
  read('CHANGELOG.md'),
  read('VALIDATION.md'),
  read('AGENTS.md'),
  read('.github/workflows/validate.yml'),
  read('.github/ISSUE_TEMPLATE/bug.yml'),
  read('.github/ISSUE_TEMPLATE/platform-validation.yml'),
]);

const manifest = JSON.parse(manifestText);
const currentReleaseRecord = `docs/releases/${manifest.version}-beta.md`;
const currentReleaseNotes = `docs/releases/${manifest.version}-beta-notes.md`;
JSON.parse(canvasText);

assert.equal(manifest.name, 'Archive Olive');
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.match(manifest.minAppVersion, /^\d+\.\d+\.\d+$/);
assert.ok(manifest.author);
assert.equal(manifest.authorUrl, 'https://github.com/ivan-94');
assert.match(
  validation,
  new RegExp(
    `Runtime: Obsidian Desktop \\\`${manifest.minAppVersion.replaceAll(
      '.',
      '\\.',
    )}\\\``,
  ),
  `VALIDATION.md must record runtime evidence for minAppVersion ${manifest.minAppVersion}`,
);

for (const requiredPath of [
  'theme.css',
  'manifest.json',
  'README.md',
  'CHANGELOG.md',
  'AGENTS.md',
  'assets/screenshots/archive-olive-512x288.png',
  'docs/specs/brat-beta-release.md',
  'docs/specs/colorways.md',
  'docs/specs/file-explorer-visual-hierarchy.md',
  currentReleaseRecord,
  currentReleaseNotes,
  'hats/20260725-brat-beta-cross-platform/guide.md',
  'hats/20260725-brat-beta-cross-platform/prepare.sh',
  '.github/workflows/validate.yml',
  '.github/ISSUE_TEMPLATE/bug.yml',
  '.github/ISSUE_TEMPLATE/platform-validation.yml',
]) {
  assert.equal(
    await exists(requiredPath),
    true,
    `Missing required repository file: ${requiredPath}`,
  );
}

assert.equal(
  await exists('theme-beta.css'),
  false,
  'theme-beta.css must not exist while main/theme.css is the only beta channel',
);
assert.match(
  agents,
  /Use the repository's isolated `test-vault\/` for all Obsidian runtime acceptance/,
  'AGENTS.md must require runtime acceptance in the isolated test vault',
);
assert.match(
  agents,
  /Do not use or modify a personal vault for theme acceptance/,
  'AGENTS.md must keep personal vaults outside theme acceptance',
);
assert.equal(
  await readlink(
    resolve(root, 'test-vault/.obsidian/themes/Archive Olive/theme.css'),
  ),
  '../../../../theme.css',
  'test-vault must load the working-tree theme through its symlink',
);
assert.equal(
  await readlink(
    resolve(root, 'test-vault/.obsidian/themes/Archive Olive/manifest.json'),
  ),
  '../../../../manifest.json',
  'test-vault must load the working-tree manifest through its symlink',
);

assert.match(readme, /Install with BRAT/);
assert.match(readme, /ivan-94\/obsidian-archive-olive/);
assert.match(readme, /GitHub caching can delay an update/);
assert.match(readme, /Removing the BRAT registration stops monitoring/);
assert.match(
  css,
  /BRAT channel: main\/theme\.css/,
  'theme.css must identify the active BRAT channel',
);
assert.match(
  css,
  /\.workspace-drawer-vault-switcher-icon/,
  'theme.css must keep the vault switcher icon legible',
);
assert.match(
  css,
  /--ao-chrome-muted/,
  'theme.css must define a semantic inactive-chrome color',
);
assert.match(
  css,
  /--ao-chrome-control-foreground/,
  'theme.css must keep titlebar controls visible while hovered or pressed',
);
assert.match(
  css,
  /\.app-container[\s\S]*\.workspace-split\.mod-left-split[\s\S]*\.workspace-tabs[\s\S]*\.workspace-tab-header-inner-icon/,
  'theme.css must keep side-dock icon colors independent of pane focus',
);
assert.match(
  css,
  /\.app-container[\s\S]*\.workspace-split\.mod-root[\s\S]*\.workspace-tab-header-tab-list/,
  'theme.css must keep tab-list controls visible in every focus state',
);
assert.match(
  css,
  /body:not\(\.is-phone\)[\s\S]*:is\(\.titlebar,\s*\.view-header,\s*\.workspace-tab-header-container\)\s*\{[\s\S]*border-bottom-width:\s*0[\s\S]*body:not\(\.is-phone\)\s+\.workspace-ribbon\s*\{[\s\S]*border-inline-end-width:\s*0[\s\S]*body:not\(\.is-phone\)\s+\.workspace-split\.mod-left-split\s*\{[\s\S]*border-inline-end-width:\s*0[\s\S]*body:not\(\.is-phone\)\s+\.workspace-split\.mod-right-split\s*\{[\s\S]*border-inline-start-width:\s*0/,
  'theme.css must hide persistent desktop and tablet shell dividers without changing phone chrome',
);
assert.match(
  css,
  /body:not\(\.is-phone\)\s+\.workspace-leaf-resize-handle\s*\{[\s\S]*background:\s*transparent[\s\S]*body:not\(\.is-phone\)\s+\.workspace-leaf-resize-handle:hover\s*\{[\s\S]*background:\s*var\(--divider-color-hover\)/,
  'theme.css must keep desktop and tablet resize handles discoverable only on hover',
);
assert.match(
  css,
  /body:not\(\.is-phone\)\s+\.workspace-tab-header\s*\{[\s\S]*border-inline-end-width:\s*0[\s\S]*body:not\(\.is-phone\)[\s\S]*:is\(\.workspace-tab-header-new-tab,\s*\.workspace-tab-header-tab-list\)\s*\{[\s\S]*border-inline-start-width:\s*0[\s\S]*body:not\(\.is-phone\)[\s\S]*\.workspace-tab-header:is\(\.is-active,\s*:hover\)\s*\{[\s\S]*box-shadow:\s*none/,
  'theme.css must remove desktop and tablet tab separators and inset state lines',
);
assert.match(
  css,
  /\.workspace-split\.mod-left-split[\s\S]*\.workspace-tab-header\.is-active[\s\S]*background:\s*var\(--interactive-accent\)/,
  'theme.css must give active side-dock tabs a focus-independent background',
);
assert.match(
  css,
  /\.nav-folder-title\[data-path\]:not\(\[data-path\*='\/'\]\)/,
  'theme.css must identify real top-level folders without relying on the virtualized file-tree wrapper depth',
);
assert.match(
  css,
  /\.nav-files-container\s*\{[\s\S]*counter-reset:\s*ao-nav-root/,
  'theme.css must generate root-folder sequence independently from folder names',
);
assert.match(
  css,
  /:not\(\[data-path\^='_'\]\)[\s\S]*content:\s*counter\(ao-nav-root,\s*decimal-leading-zero\)[\s\S]*counter-increment:\s*ao-nav-root/,
  'theme.css must render two-digit visual sequence markers while excluding underscore-prefixed utility folders',
);
assert.match(
  css,
  /\.nav-folder:not\(\.is-collapsed\)[\s\S]*\.nav-folder-title\[data-path\][\s\S]*::after\s*\{[\s\S]*border-top:\s*var\(--ao-border-thin\)\s+solid\s+var\(--ao-nav-root-rule\)/,
  'theme.css must extend chapter rules only from expanded top-level folders',
);
assert.match(
  css,
  /\.nav-folder-title\[data-path\*='\/'\]/,
  'theme.css must give nested folders a distinct visual role',
);
assert.match(
  css,
  /\.nav-folder-title\[data-path\*='\/'\]::before\s*\{[\s\S]*mask:\s*url\("data:image\/svg\+xml/,
  'theme.css must keep nested folders visibly distinct with a local folder glyph',
);
assert.match(
  css,
  /\.nav-folder-children\s*\{[\s\S]*border-inline-start:\s*0/,
  'theme.css must remove vertical file-tree indentation guides',
);
assert.match(
  css,
  /\.nav-folder:not\(\.is-collapsed\)\s*>\s*\.nav-folder-title\[data-path\*='\/'\]\s*\{[\s\S]*box-shadow:\s*none/,
  'theme.css must not replace indentation guides with expanded-folder inset rails',
);
assert.match(
  css,
  /--ao-nav-file-marker-offset:\s*-10px/,
  'theme.css must preserve the runtime-measured file-to-folder marker alignment offset',
);
assert.match(
  css,
  /\.nav-file-title\[data-path\*='\/'\]\s*>\s*\.nav-file-title-content,\s*\.nav-file-title\[data-path\]:not\(\[data-path\*='\/'\]\)\s*>\s*\.nav-file-title-content\s*\{[\s\S]*margin-inline-start:\s*var\(--ao-nav-file-marker-offset\)/,
  'theme.css must align file text with the first visible marker of sibling folders',
);
assert.match(
  css,
  /\.nav-folder-title[\s\S]*>\s*:is\(\.collapse-icon,\s*\.nav-folder-collapse-indicator\)\s*\{[\s\S]*margin-inline-start:\s*auto[\s\S]*margin-inline-end:\s*0[\s\S]*order:\s*4[\s\S]*>\s*:is\(\.collapse-icon,\s*\.nav-folder-collapse-indicator\)[\s\S]*>\s*svg\s*\{[\s\S]*display:\s*none[\s\S]*:is\(\.collapse-icon,\s*\.nav-folder-collapse-indicator\)::before,[\s\S]*:is\(\.collapse-icon,\s*\.nav-folder-collapse-indicator\)::after\s*\{[\s\S]*left:\s*50%[\s\S]*width:\s*var\(--ao-nav-disclosure-glyph\)[\s\S]*\.collapse-icon:not\(\.is-collapsed\)::after,[\s\S]*\.nav-folder:not\(\.is-collapsed\)[\s\S]*\.nav-folder-collapse-indicator::after\s*\{[\s\S]*content:\s*none/,
  'theme.css must place stable plus/minus disclosure controls in a shared trailing slot',
);
assert.match(
  css,
  /--ao-nav-root-gap:\s*2px[\s\S]*--ao-nav-counter-width:\s*22px[\s\S]*--ao-nav-disclosure-slot:\s*18px/,
  'theme.css must preserve the reviewed compact desktop file-tree density',
);
assert.match(
  css,
  /\.nav-files-container\s*\{[\s\S]*counter-reset:\s*ao-nav-root[\s\S]*padding-inline:\s*0/,
  'theme.css must let file-tree row surfaces span the full container after moving controls to the trailing edge',
);
assert.match(
  css,
  /\.nav-folder-title\[data-path\]:not\(\[data-path\*='\/'\]\):not\(\[data-path\^='_'\]\)\s*\{[\s\S]*align-items:\s*center[\s\S]*padding-block:\s*4px[\s\S]*\.nav-files-container[\s\S]*:is\(\.collapse-icon,\s*\.nav-folder-collapse-indicator\)\s*\{[\s\S]*align-self:\s*center/,
  'theme.css must vertically center disclosure symbols within compact chapter rows',
);
assert.match(
  css,
  /\.nav-files-container\s+\.nav-file-title\.is-active[\s\S]*\.nav-files-container\s+\.nav-file-title\.is-active:hover\s*\{[\s\S]*background:\s*var\(--ao-nav-file-active-background\)[\s\S]*box-shadow:\s*none/,
  'theme.css must use a marker-free paper treatment for the active file',
);
assert.doesNotMatch(
  css,
  /\.nav-file-title:hover:not\(\.is-active\)::before|--ao-nav-file-(?:active|hover)-edge|--ao-nav-hover-tick-width/,
  'file explorer states must not reintroduce cyan edge or tick markers',
);
const desktopActiveFileRule =
  css.match(
    /body\s+\.nav-files-container\s+\.nav-file-title\.is-active,\s*body\s+\.nav-files-container\s+\.nav-file-title\.is-active:hover\s*\{([^}]*)\}/,
  )?.[1] ?? '';
assert.ok(
  desktopActiveFileRule,
  'theme.css must expose a desktop active-file rule for geometry checks',
);
assert.doesNotMatch(
  desktopActiveFileRule,
  /\b(?:height|min-height|margin|padding|transform)\s*:/,
  'desktop active files must inherit natural file-row geometry',
);
assert.doesNotMatch(
  css,
  /body\s+\.nav-files-container\s+\.nav-file-title\.is-active::after/,
  'desktop active files must not add a folded-corner pseudo-element',
);
assert.match(
  css,
  /\.nav-file-title\.is-selected:not\(\.is-active\)\s*\{[\s\S]*box-shadow:\s*none/,
  'theme.css must keep multi-selection visually distinct from the active file',
);
assert.match(
  css,
  /body\.is-mobile\s+:is\(\.nav-file-title,\s*\.nav-folder-title\)\s*\{[\s\S]*min-height:\s*44px[\s\S]*body\.is-mobile\s+\.nav-file-title\.is-active\s*\{[\s\S]*transform:\s*none/,
  'theme.css must keep mobile file-tree rows touchable without desktop-style displacement',
);
assert.match(
  css,
  /body\s+\.markdown-rendered\s+table\s+thead\s+th:nth-child\(n\)[\s\S]*background:\s*var\(--table-header-background\)/,
  'theme.css must preserve the table-header background in interactive states',
);
assert.match(
  css,
  /\.table-cell-wrapper[\s\S]*\.cm-editor[\s\S]*background-color:\s*transparent/,
  'theme.css must keep live table-header editors on the header surface',
);
assert.match(
  css,
  /body\.theme-dark[\s\S]*\.workspace-split\.mod-root[\s\S]*\.workspace-leaf-content\[data-type='markdown'\][\s\S]*\.view-content\s*\{[\s\S]*--background-primary:\s*var\(--ao-dark-content\)[\s\S]*--background-primary-alt:\s*var\(--ao-dark-content\)[\s\S]*background:\s*var\(--ao-dark-content\)/,
  'theme.css must give dark Markdown content a pure-black surface on every platform',
);
assert.match(
  css,
  /\.workspace-split\.mod-sidedock\s+\.workspace-tab-header-container-inner\s*\{[\s\S]*scrollbar-width:\s*none/,
  'theme.css must hide side-dock tab-strip scrollbars without disabling overflow',
);
assert.match(
  css,
  /\.workspace-tab-header-container-inner::\-webkit-scrollbar\s*\{[\s\S]*display:\s*none/,
  'theme.css must hide side-dock tab-strip scrollbars in WebKit',
);
assert.match(
  css,
  /body\s+\.menu\s+\.menu-item:is\(:hover,\s*\.selected\):not\(\.is-disabled\):not\(\.mod-disabled\)\s*\{[\s\S]*background:\s*var\(--ao-menu-hover-background\)[\s\S]*color:\s*var\(--ao-menu-hover-foreground\)/,
  'theme.css must keep enabled menu hover and selected states legible',
);
assert.match(
  css,
  /\.menu-item-icon,[\s\S]*\.menu-item-title,[\s\S]*\.menu-item-hotkey,[\s\S]*\.menu-item-chevron,[\s\S]*svg[\s\S]*color:\s*inherit/,
  'theme.css must make menu-item children inherit the state foreground',
);
assert.match(
  css,
  /\.notice\s*\{[\s\S]*background:\s*var\(--ao-feedback-background\)[\s\S]*color:\s*var\(--ao-feedback-foreground\)/,
  'theme.css must give notices an explicit high-contrast surface and foreground',
);
assert.match(
  css,
  /\.tooltip\s*\{[\s\S]*background:\s*var\(--ao-feedback-background\)[\s\S]*color:\s*var\(--ao-feedback-foreground\)/,
  'theme.css must give tooltips an explicit high-contrast surface and foreground',
);
assert.match(
  css,
  /\.theme-dark\.is-mobile\s*\{[\s\S]*--ao-mobile-surface:\s*var\(--ao-dark-canvas\)[\s\S]*--ao-mobile-surface-raised:\s*var\(--ao-dark-recessed\)[\s\S]*--ao-mobile-foreground:\s*var\(--ao-dark-paper\)[\s\S]*--ao-mobile-active-background:\s*var\(--ao-dark-olive\)[\s\S]*--ao-mobile-active-foreground:\s*var\(--ao-dark-on-accent\)/,
  'theme.css must define isolated high-contrast dark mobile semantic surfaces',
);
assert.match(
  css,
  /\.theme-dark\.is-mobile\s*\{[\s\S]*--interactive-normal:\s*var\(--ao-mobile-surface-raised\)[\s\S]*--interactive-hover:\s*var\(--ao-mobile-surface\)[\s\S]*--background-modifier-form-field:\s*var\(--ao-mobile-surface-raised\)/,
  'theme.css must neutralize Obsidian dark-mobile interactive remapping',
);
assert.match(
  css,
  /\.theme-light\.is-mobile\s*\{[\s\S]*--ao-mobile-surface:\s*var\(--ao-paper\)[\s\S]*--ao-mobile-surface-raised:\s*var\(--ao-khaki\)[\s\S]*--ao-mobile-foreground:\s*var\(--ao-ink\)[\s\S]*--ao-mobile-active-background:\s*var\(--ao-olive\)[\s\S]*--ao-mobile-active-foreground:\s*var\(--ao-paper\)/,
  'theme.css must define isolated high-contrast light mobile semantic surfaces',
);
assert.match(
  css,
  /body\.is-mobile[\s\S]*\.menu-item:is\(\s*:hover,\s*:active,\s*\.mobile-tap,\s*\.selected,\s*\.is-selected\s*\)[\s\S]*background:\s*var\(--ao-mobile-active-background\)[\s\S]*color:\s*var\(--ao-mobile-active-foreground\)/,
  'theme.css must give mobile menu interaction states a high-contrast semantic surface',
);
assert.match(
  css,
  /body\.is-mobile[\s\S]*\.workspace-drawer-tab-options\.is-collapsed[\s\S]*input\[type='search'\][\s\S]*background:\s*var\(--ao-mobile-surface-raised\)[\s\S]*border-radius:\s*0[\s\S]*color:\s*var\(--ao-mobile-foreground\)/,
  'theme.css must give mobile drawer selectors and search fields readable square surfaces',
);
assert.match(
  css,
  /body\.is-mobile[\s\S]*\.workspace-drawer-tab-options[\s\S]*\.workspace-tab-header:is\(\.is-active,\s*\.mobile-tap\)[\s\S]*\.workspace-tab-header-inner[\s\S]*background:\s*var\(--ao-mobile-active-background\)[\s\S]*color:\s*var\(--ao-mobile-active-foreground\)/,
  'theme.css must distinguish active and tapped mobile drawer tabs',
);
assert.match(
  css,
  /body\.is-mobile\s+\.prompt\s*\{[\s\S]*backdrop-filter:\s*none[\s\S]*background:\s*var\(--ao-mobile-surface\)[\s\S]*border-radius:\s*0[\s\S]*body\.is-mobile\s+\.prompt-results[\s\S]*background:\s*var\(--ao-mobile-surface\)/,
  'theme.css must keep the complete mobile prompt surface opaque',
);
assert.match(
  css,
  /body\.is-mobile\s+\.prompt\s+\.suggestion-item:is\(\.is-selected,\s*\.mobile-tap\)\s*\{[\s\S]*background:\s*var\(--ao-mobile-active-background\)[\s\S]*border-radius:\s*0[\s\S]*color:\s*var\(--ao-mobile-active-foreground\)/,
  'theme.css must keep mobile prompt selection states legible and square',
);
assert.match(
  css,
  /body\.is-mobile\s*:is\([\s\S]*\.mobile-navbar[\s\S]*\.vertical-tab-header-group-items[\s\S]*\.workspace-drawer-tab-options\.is-collapsed[\s\S]*\)\s*\{[\s\S]*border-radius:\s*0/,
  'theme.css must keep non-semantic mobile containers square',
);
assert.match(
  css,
  /body\.is-mobile\.is-phone\s+\.menu\s+\.menu-group\s+\.menu-item\s*\{[\s\S]*border-radius:\s*0/,
  'theme.css must override phone-specific menu group pill radii',
);
assert.match(
  css,
  /body\.is-mobile\s*\{[\s\S]*--clickable-icon-radius:\s*0[\s\S]*--input-radius:\s*0[\s\S]*--nav-item-radius:\s*0[\s\S]*--setting-items-radius:\s*0[\s\S]*--view-header-action-radius:\s*0/,
  'theme.css must reset Obsidian mobile-only pill radii without changing touch sizes',
);
assert.match(
  css,
  /body\.is-mobile[\s\S]*\.mobile-navbar[\s\S]*\.clickable-icon:is\(:active,\s*\.mobile-tap,\s*\.is-active,\s*\[aria-pressed='true'\]\)[\s\S]*background:\s*var\(--ao-mobile-active-background\)[\s\S]*color:\s*var\(--ao-mobile-active-foreground\)/,
  'theme.css must give active mobile toolbar actions a distinct semantic state',
);
assert.match(
  css,
  /body\.is-mobile\s+\.mobile-navbar-action\.mobile-tap\s+\.clickable-icon\s*\{[\s\S]*background:\s*var\(--ao-mobile-active-background\)[\s\S]*color:\s*var\(--ao-mobile-active-foreground\)/,
  'theme.css must style the parent-based tap state used by the mobile navbar',
);
assert.match(
  css,
  /body\.is-mobile[\s\S]*\.vertical-tab-nav-item:is\(\.is-active,\s*\.mobile-tap\)[\s\S]*background:\s*var\(--ao-mobile-active-background\)[\s\S]*border-radius:\s*0[\s\S]*color:\s*var\(--ao-mobile-active-foreground\)/,
  'theme.css must distinguish selected mobile settings navigation without pills',
);
assert.match(
  css,
  /body\.is-mobile\s+:is\(\.view-header,\s*\.workspace-drawer-header\)\s+\.clickable-icon\s*\{[\s\S]*border-color:\s*transparent[\s\S]*box-shadow:\s*none[\s\S]*transform:\s*none[\s\S]*body\.is-mobile[\s\S]*\.clickable-icon\.mod-raised[\s\S]*box-shadow:\s*inset\s+0\s+-3px\s+0\s+var\(--ao-mobile-active-background\)/,
  'theme.css must keep 44px mobile header targets without raised decoration crossing dividers',
);
assert.match(
  css,
  /body\.is-mobile\s+\.metadata-content\s*\{[\s\S]*border-radius:\s*0[\s\S]*max-width:\s*100%[\s\S]*transform:\s*none[\s\S]*width:\s*100%/,
  'theme.css must keep mobile metadata content inside its parent border',
);
assert.match(
  css,
  /body\.is-mobile\.is-ios\s+\.workspace-drawer-tab-select\s+\.workspace-tab-header-inner\s*\{[\s\S]*border-radius:\s*0/,
  'theme.css must square the expanded and focused iOS drawer selector',
);
assert.match(
  css,
  /body\.is-mobile\.is-ios\s+\.workspace-drawer-tab-options-list\s*\{[\s\S]*border:\s*0[\s\S]*outline:\s*var\(--ao-border-default\)\s+solid\s+var\(--ao-mobile-border\)[\s\S]*outline-offset:\s*calc\(-1\s*\*\s*var\(--ao-border-default\)\)[\s\S]*padding:\s*0\s+0\s+var\(--touch-size-l\)[\s\S]*body\.is-mobile\.is-ios\.is-phone[\s\S]*\.workspace-drawer-tab-options:not\(\.is-collapsed\)\s*>\s*\.workspace-drawer-tab-select\s*\{[\s\S]*height:\s*var\(--touch-size-s\)[\s\S]*min-height:\s*var\(--touch-size-s\)[\s\S]*body\.is-mobile\.is-ios\.is-phone[\s\S]*\.workspace-drawer-tab-options:not\(\.is-collapsed\)\s*>\s*\.workspace-drawer-tab-select[\s\S]*\.workspace-tab-header-inner[\s\S]*box-sizing:\s*border-box[\s\S]*height:\s*var\(--touch-size-s\)[\s\S]*margin-inline:\s*var\(--ao-border-default\)[\s\S]*min-height:\s*var\(--touch-size-s\)[\s\S]*width:\s*calc\(100%\s*-\s*2\s*\*\s*var\(--ao-border-default\)\)/,
  'theme.css must keep the expanded iPhone drawer selector inside one row without covering the next option',
);
assert.match(
  css,
  /body\.is-mobile\.is-ios\.is-tablet[\s\S]*\.workspace-drawer-tab-options:not\(\.is-collapsed\)\s*>\s*\.workspace-drawer-tab-select,[\s\S]*\.workspace-drawer-tab-options-list[\s\S]*>\s*\.workspace-tab-header\.is-active\s*\{[\s\S]*height:\s*var\(--touch-size-l\)[\s\S]*min-height:\s*var\(--touch-size-l\)[\s\S]*body\.is-mobile\.is-ios\.is-tablet[\s\S]*\.workspace-drawer-tab-select[\s\S]*\.workspace-tab-header-inner\s*\{[\s\S]*box-sizing:\s*border-box[\s\S]*border:\s*var\(--ao-border-default\)\s+solid\s+var\(--ao-mobile-border\)[\s\S]*height:\s*var\(--touch-size-l\)[\s\S]*margin:\s*0[\s\S]*min-height:\s*var\(--touch-size-l\)[\s\S]*width:\s*100%[\s\S]*body\.is-mobile\.is-ios\.is-tablet\s+\.workspace-drawer-tab-options-list\s*\{[\s\S]*padding-bottom:\s*0[\s\S]*top:\s*calc\(var\(--touch-size-l\)\s*-\s*var\(--ao-border-default\)\)/,
  'theme.css must keep the iPad drawer selector framed above the complete option list',
);
assert.match(
  css,
  /body\.is-mobile\s+:is\(\.workspace-drawer-header-name,\s*\.workspace-drawer-header-switcher\)\s*\{[\s\S]*align-items:\s*center/,
  'theme.css must vertically center the mobile vault selector and chevron',
);
assert.match(
  css,
  /body\.is-mobile\.is-ios\s+:is\(\s*\.mobile-toolbar-options-list-container,\s*\.mobile-toolbar-options-list,\s*\.mobile-toolbar-floating-options\s*\)\s*\{[\s\S]*border-radius:\s*0/,
  'theme.css must square every visible layer of the iOS editor action strip',
);
assert.match(
  css,
  /body\.is-mobile\.is-phone\s+\.prompt\s+\.prompt-input\s*\{[\s\S]*border-radius:\s*0/,
  'theme.css must override phone-specific rounding on search and command inputs',
);
assert.match(
  css,
  /body\.is-mobile\.is-phone\s+:is\(input,\s*textarea,\s*select,\s*\.dropdown\)\s*\{[\s\S]*border-radius:\s*0/,
  'theme.css must keep all phone form controls square',
);
assert.match(
  css,
  /body\.is-mobile\.is-phone\s+\.prompt\s+\.suggestion-item:is\(\.is-selected,\s*\.mobile-tap\)\s*\{[\s\S]*border-radius:\s*0/,
  'theme.css must square selected mobile prompt results as well as the input',
);
assert.match(
  css,
  /body\.is-mobile\.is-ios\.is-phone\s+\.view-header\s*\{[\s\S]*border-bottom:\s*0/,
  'theme.css must remove the redundant iPhone view-header divider',
);
assert.match(
  css,
  /body\.is-mobile\.is-ios\s+:is\(\.workspace-drawer-header,\s*\.workspace-drawer-tab-container\)\s*\{[\s\S]*border-bottom:\s*0[\s\S]*body\.is-mobile\.is-ios\s+\.workspace-drawer-header\s+\.clickable-icon\.mod-raised\s*\{[\s\S]*box-shadow:\s*none/,
  'theme.css must remove redundant iOS drawer dividers and raised underlines',
);
assert.match(
  css,
  /body\.is-mobile\.is-ios\.is-tablet\s+\.workspace-drawer\s*\{[\s\S]*border-radius:\s*0[\s\S]*max-width:\s*calc\(50vw\s*-\s*16px\)/,
  'theme.css must keep paired iPad drawers square and non-overlapping',
);
assert.match(
  css,
  /body\.is-mobile\.is-ios\.is-tablet:not\(\.show-ribbon\)[\s\S]*\.workspace-drawer\.mod-left[\s\S]*\.workspace-drawer-inner\s*\{[\s\S]*padding-inline-start:\s*0/,
  'theme.css must release the iPad drawer ribbon gutter when the ribbon is hidden',
);
assert.match(
  css,
  /\.theme-light\.is-mobile\.is-ios\.is-tablet\s*\{[\s\S]*--titlebar-background:\s*var\(--ao-mobile-surface\)[\s\S]*--ao-chrome-control-foreground:\s*var\(--ao-mobile-foreground\)[\s\S]*body\.theme-light\.is-mobile\.is-ios\.is-tablet\s+\.workspace-split\.mod-root[\s\S]*background:\s*var\(--ao-mobile-surface\)[\s\S]*body\.theme-light\.is-mobile\.is-ios\.is-tablet[\s\S]*\.sidebar-toggle-button[\s\S]*--icon-color:\s*var\(--ao-mobile-foreground\)/,
  'theme.css must keep the light iPad safe area and sidebar controls visible',
);
assert.match(
  css,
  /body\.theme-light\.is-mobile\s+\.callout-title,[\s\S]*body\.theme-light\.is-mobile\s+\.callout-icon,[\s\S]*body\.theme-light\.is-mobile\s+\.callout-fold\s*\{[\s\S]*color:\s*var\(--ao-mobile-foreground\)/,
  'theme.css must keep light mobile callout labels and icons readable',
);
assert.match(changelog, /## \[Unreleased\]/);
assert.match(workflow, /node scripts\/validate\.mjs/);
assert.match(workflow, /lightningcss-cli@1\.33\.0/);
assert.match(workflow, /prettier@3\.9\.6/);

for (const [name, form] of [
  ['bug', bugForm],
  ['platform validation', platformForm],
]) {
  assert.match(form, /^name:/m, `${name} form is missing name`);
  assert.match(form, /^description:/m, `${name} form is missing description`);
  assert.match(form, /^body:/m, `${name} form is missing body`);
  assert.match(form, /id: privacy/, `${name} form is missing privacy review`);
}

for (const pattern of [
  [/!important/i, 'routine !important'],
  [/:has\(/i, 'undocumented :has()'],
  [/@import/i, 'CSS imports'],
  [/url\(\s*['"]?https?:/i, 'remote CSS assets'],
]) {
  assert.equal(pattern[0].test(css), false, `theme.css contains ${pattern[1]}`);
}

const aoDefinitions = new Set(
  [...css.matchAll(/(--ao-[\w-]+)\s*:/g)].map(match => match[1]),
);
const aoReferences = new Set(
  [...css.matchAll(/var\((--ao-[\w-]+)/g)].map(match => match[1]),
);
const missingAoDefinitions = [...aoReferences].filter(
  name => !aoDefinitions.has(name),
);
assert.deepEqual(
  missingAoDefinitions,
  [],
  `Undefined Archive Olive variables: ${missingAoDefinitions.join(', ')}`,
);

const settingsBlock = css.match(/\/\* @settings([\s\S]*?)\*\//)?.[1];
assert.ok(settingsBlock, 'theme.css must contain a Style Settings block');
assert.match(settingsBlock, /id:\s*archive-olive-style-settings/);
assert.match(
  settingsBlock,
  /id:\s*ao-light-colorway[\s\S]*type:\s*class-select[\s\S]*allowEmpty:\s*false[\s\S]*default:\s*ao-light-archive-olive/,
  'Style Settings must expose the required light colorway selector',
);
assert.match(
  settingsBlock,
  /id:\s*ao-dark-colorway[\s\S]*type:\s*class-select[\s\S]*allowEmpty:\s*false[\s\S]*default:\s*ao-dark-archive-night/,
  'Style Settings must expose the required dark colorway selector',
);

const expectedColorwayClasses = [
  'ao-light-archive-olive',
  'ao-light-blueprint-news',
  'ao-light-terracotta-ledger',
  'ao-light-forestry-file',
  'ao-light-signal-white',
  'ao-dark-archive-night',
  'ao-dark-carbon-teal',
  'ao-dark-oxblood-archive',
  'ao-dark-midnight-blueprint',
];
const configuredColorwayClasses = [
  ...settingsBlock.matchAll(/^\s*value:\s*(ao-(?:light|dark)-[\w-]+)\s*$/gm),
].map(match => match[1]);
assert.deepEqual(
  configuredColorwayClasses,
  expectedColorwayClasses,
  'Style Settings must list exactly the nine approved colorways',
);

const parseDeclarations = block =>
  new Map(
    [...block.matchAll(/(--ao-[\w-]+)\s*:\s*([^;]+);/g)].map(match => [
      match[1],
      match[2].trim(),
    ]),
  );
const defaultColorwayBlock = css.match(
  /body,\s*body\.ao-light-archive-olive,\s*body\.ao-dark-archive-night\s*\{([\s\S]*?)\n\}/,
)?.[1];
assert.ok(
  defaultColorwayBlock,
  'theme.css must bind plugin-free defaults to the two default colorway classes',
);
const defaultColorwayTokens = parseDeclarations(defaultColorwayBlock);

const getClassTokenOverrides = className => {
  if (
    className === 'ao-light-archive-olive' ||
    className === 'ao-dark-archive-night'
  ) {
    return new Map();
  }
  const escaped = className.replaceAll('-', '\\-');
  const block = css.match(
    new RegExp(`body\\.${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`),
  )?.[1];
  assert.ok(block, `Missing colorway rule: ${className}`);
  return parseDeclarations(block);
};

const lightColorwayTokens = [
  '--ao-ink',
  '--ao-ink-rgb',
  '--ao-paper',
  '--ao-paper-rgb',
  '--ao-khaki',
  '--ao-khaki-rgb',
  '--ao-folder',
  '--ao-graphite',
  '--ao-olive',
  '--ao-olive-rgb',
  '--ao-olive-hover',
  '--ao-oxblood',
  '--ao-oxblood-rgb',
  '--ao-cyan',
  '--ao-cyan-rgb',
  '--ao-cyan-ink',
  '--ao-stamp',
  '--ao-stamp-rgb',
  '--ao-yellow',
  '--ao-yellow-rgb',
  '--ao-blue',
  '--ao-blue-rgb',
  '--ao-purple',
  '--ao-purple-rgb',
  '--ao-pink',
  '--ao-pink-rgb',
  '--ao-paper-hover',
  '--ao-oxblood-hover',
  '--ao-warning-ink',
  '--ao-code-surface',
  '--ao-light-on-accent',
  '--ao-light-control-accent',
  '--ao-light-on-control-accent',
  '--ao-light-tab-active',
  '--ao-light-on-tab-active',
  '--ao-light-ribbon-background',
  '--ao-light-titlebar-background',
  '--ao-light-status-background',
  '--ao-light-chrome-foreground',
  '--ao-light-chrome-muted',
  '--ao-light-ribbon-action-background',
  '--ao-light-on-ribbon-action',
  '--ao-light-nav-active-background',
  '--ao-light-nav-active-foreground',
  ...[
    '00',
    '05',
    '10',
    '20',
    '25',
    '30',
    '35',
    '40',
    '50',
    '60',
    '70',
    '100',
  ].map(level => `--ao-light-base-${level}`),
  '--ao-light-mono-rgb-0',
  '--ao-light-mono-rgb-100',
  '--ao-light-accent-h',
  '--ao-light-accent-s',
  '--ao-light-accent-l',
];
const darkColorwayTokens = [
  '--ao-dark-canvas',
  '--ao-dark-surface',
  '--ao-dark-recessed',
  '--ao-dark-content',
  '--ao-dark-paper',
  '--ao-dark-paper-rgb',
  '--ao-dark-muted',
  '--ao-dark-olive',
  '--ao-dark-olive-rgb',
  '--ao-dark-olive-hover',
  '--ao-dark-red',
  '--ao-dark-red-rgb',
  '--ao-dark-red-hover',
  '--ao-dark-cyan',
  '--ao-dark-cyan-rgb',
  '--ao-dark-orange',
  '--ao-dark-orange-rgb',
  '--ao-dark-yellow',
  '--ao-dark-yellow-rgb',
  '--ao-dark-blue',
  '--ao-dark-blue-rgb',
  '--ao-dark-purple',
  '--ao-dark-purple-rgb',
  '--ao-dark-pink',
  '--ao-dark-pink-rgb',
  '--ao-dark-chrome',
  '--ao-dark-code-surface',
  '--ao-dark-on-accent',
  '--ao-dark-on-info',
  ...[
    '00',
    '05',
    '10',
    '20',
    '25',
    '30',
    '35',
    '40',
    '50',
    '60',
    '70',
    '100',
  ].map(level => `--ao-dark-base-${level}`),
  '--ao-dark-mono-rgb-0',
  '--ao-dark-mono-rgb-100',
  '--ao-dark-accent-h',
  '--ao-dark-accent-s',
  '--ao-dark-accent-l',
];

const colorwayPalettes = new Map();
for (const className of expectedColorwayClasses) {
  const overrides = getClassTokenOverrides(className);
  const tokens = new Map(defaultColorwayTokens);
  for (const [name, value] of overrides) tokens.set(name, value);
  const requiredTokens = className.startsWith('ao-light-')
    ? lightColorwayTokens
    : darkColorwayTokens;
  const missingTokens = requiredTokens.filter(name => !tokens.has(name));
  assert.deepEqual(
    missingTokens,
    [],
    `${className} is missing palette tokens: ${missingTokens.join(', ')}`,
  );
  if (className.startsWith('ao-light-')) {
    assert.deepEqual(
      [...overrides.keys()].filter(name => name.startsWith('--ao-dark-')),
      [],
      `${className} must not override dark colorway tokens`,
    );
  } else {
    assert.deepEqual(
      [...overrides.keys()].filter(name => !name.startsWith('--ao-dark-')),
      [],
      `${className} must not override light or shared tokens`,
    );
    assert.equal(
      tokens.get('--ao-dark-content')?.toLowerCase(),
      '#000000',
      `${className} must use pure black for Markdown content`,
    );
  }
  colorwayPalettes.set(className, tokens);
}

const mobileSemanticRules = [
  ...css.matchAll(/([^{}]+)\{([^{}]*--ao-mobile-[^{}]*)\}/g),
];
assert.ok(
  mobileSemanticRules.length > 0,
  'theme.css must contain mobile semantic rules',
);
for (const [, selector] of mobileSemanticRules) {
  assert.match(
    selector.trim(),
    /\.is-mobile/,
    `Mobile semantic declarations escaped their mobile scope: ${selector.trim()}`,
  );
}

assert.match(baseText, /^filters:/m);
assert.match(baseText, /^views:/m);

const luminance = hex => {
  const channels = hex
    .slice(1)
    .match(/../g)
    .map(channel => parseInt(channel, 16) / 255)
    .map(channel =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const contrast = (foreground, background) => {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

const resolveColorwayHex = (tokens, name, seen = new Set()) => {
  assert.equal(
    seen.has(name),
    false,
    `Circular colorway token reference: ${[...seen, name].join(' -> ')}`,
  );
  seen.add(name);
  const value = tokens.get(name);
  assert.ok(value, `Missing colorway token value: ${name}`);
  const reference = value.match(/^var\((--ao-[\w-]+)\)$/)?.[1];
  if (reference) return resolveColorwayHex(tokens, reference, seen);
  assert.match(value, /^#[0-9a-f]{6}$/i, `${name} must resolve to a hex color`);
  return value;
};

for (const [className, tokens] of colorwayPalettes) {
  const pairs = className.startsWith('ao-light-')
    ? [
        ['body', '--ao-ink', '--ao-paper'],
        ['muted', '--ao-graphite', '--ao-paper'],
        ['semantic accent', '--ao-light-on-accent', '--ao-olive'],
        [
          'control accent',
          '--ao-light-on-control-accent',
          '--ao-light-control-accent',
        ],
        ['active tab', '--ao-light-on-tab-active', '--ao-light-tab-active'],
        [
          'active file',
          '--ao-light-nav-active-foreground',
          '--ao-light-nav-active-background',
        ],
        [
          'chrome',
          '--ao-light-chrome-foreground',
          '--ao-light-ribbon-background',
        ],
        [
          'ribbon action',
          '--ao-light-on-ribbon-action',
          '--ao-light-ribbon-action-background',
        ],
        ['raised mobile', '--ao-ink', '--ao-khaki'],
        ['critical', '--ao-paper', '--ao-oxblood'],
        ['warning text', '--ao-warning-ink', '--ao-paper'],
        ['information text', '--ao-cyan-ink', '--ao-paper'],
      ]
    : [
        ['body', '--ao-dark-paper', '--ao-dark-surface'],
        ['content', '--ao-dark-paper', '--ao-dark-content'],
        ['muted', '--ao-dark-muted', '--ao-dark-surface'],
        ['active', '--ao-dark-on-accent', '--ao-dark-olive'],
        ['active tab', '--ao-dark-on-info', '--ao-dark-cyan'],
        ['chrome', '--ao-dark-paper', '--ao-dark-chrome'],
        ['raised mobile', '--ao-dark-paper', '--ao-dark-recessed'],
        ['table header', '--ao-dark-on-accent', '--ao-dark-paper'],
        ['critical', '--ao-dark-on-accent', '--ao-dark-red'],
      ];

  for (const [label, foregroundToken, backgroundToken] of pairs) {
    const foreground = resolveColorwayHex(tokens, foregroundToken);
    const background = resolveColorwayHex(tokens, backgroundToken);
    const ratio = contrast(foreground, background);
    assert.ok(
      ratio >= 4.5,
      `${className} ${label} contrast is ${ratio.toFixed(2)}:1`,
    );
    console.log(`PASS contrast ${className} ${label}: ${ratio.toFixed(2)}:1`);
  }
}

const normalTextPairs = [
  ['light body', '#11110d', '#f1e7cc'],
  ['light muted', '#4b493f', '#f1e7cc'],
  ['light active file', '#f1e7cc', '#59611c'],
  ['light active tab', '#11110d', '#00a6b2'],
  ['light inactive chrome', '#d9cba8', '#11110d'],
  ['light titlebar control hover', '#f1e7cc', '#11110d'],
  ['light sidebar tab icon', '#11110d', '#00a6b2'],
  ['light vault switcher', '#f1e7cc', '#59611c'],
  ['light menu hover', '#f1e7cc', '#59611c'],
  ['light feedback', '#f1e7cc', '#11110d'],
  ['light mobile raised', '#11110d', '#d9cba8'],
  ['light mobile muted', '#4b493f', '#d9cba8'],
  ['light mobile callout label', '#11110d', '#d4dfc9'],
  ['light table header', '#f1e7cc', '#11110d'],
  ['light critical block', '#f1e7cc', '#8d1b1b'],
  ['dark body', '#eee4c8', '#1d2014'],
  ['dark note content', '#eee4c8', '#000000'],
  ['dark muted', '#b4aa8f', '#1d2014'],
  ['dark active file', '#11110d', '#9aaa3a'],
  ['dark active tab', '#11110d', '#31c2c9'],
  ['dark inactive chrome', '#b4aa8f', '#0e0f0a'],
  ['dark titlebar control hover', '#eee4c8', '#0e0f0a'],
  ['dark sidebar tab icon', '#11110d', '#31c2c9'],
  ['dark vault switcher', '#11110d', '#9aaa3a'],
  ['dark menu hover', '#11110d', '#9aaa3a'],
  ['dark feedback', '#11110d', '#eee4c8'],
  ['dark mobile raised', '#eee4c8', '#252919'],
  ['dark mobile muted', '#b4aa8f', '#252919'],
  ['dark table header', '#11110d', '#eee4c8'],
  ['dark critical block', '#15160f', '#d4574f'],
];

for (const [name, foreground, background] of normalTextPairs) {
  const ratio = contrast(foreground, background);
  assert.ok(ratio >= 4.5, `${name} contrast is ${ratio.toFixed(2)}:1`);
  console.log(`PASS contrast ${name}: ${ratio.toFixed(2)}:1`);
}

const releaseImagePath = 'assets/screenshots/archive-olive-512x288.png';
const image = await readBuffer(releaseImagePath);
assert.equal(
  image.subarray(1, 4).toString('ascii'),
  'PNG',
  `${releaseImagePath} must be a PNG`,
);
assert.equal(image.readUInt32BE(16), 512, `${releaseImagePath} width`);
assert.equal(image.readUInt32BE(20), 288, `${releaseImagePath} height`);

if (releaseMode) {
  assert.equal(
    await exists('LICENSE'),
    true,
    'Release validation requires an owner-selected LICENSE',
  );
  const license = await read('LICENSE');
  assert.match(
    license,
    /^MIT License$/m,
    'LICENSE must contain the MIT license',
  );
  assert.match(
    readme,
    /\[MIT License\]\(LICENSE\)/,
    'README must link to the MIT license',
  );
}

console.log(
  `PASS manifest, repository policy, CSS policy, token integrity, Canvas, Bases${
    releaseMode ? ', and release files' : ''
  }`,
);
