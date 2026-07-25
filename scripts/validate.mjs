import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
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
  read('.github/workflows/validate.yml'),
  read('.github/ISSUE_TEMPLATE/bug.yml'),
  read('.github/ISSUE_TEMPLATE/platform-validation.yml'),
]);

const manifest = JSON.parse(manifestText);
JSON.parse(canvasText);

assert.equal(manifest.name, 'Archive Olive');
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.match(manifest.minAppVersion, /^\d+\.\d+\.\d+$/);
assert.ok(manifest.author);
assert.equal(manifest.authorUrl, 'https://github.com/ivan-94');
assert.match(
  validation,
  new RegExp(
    `Runtime: Obsidian Desktop \\\`${manifest.minAppVersion.replaceAll('.', '\\.')}\\\``,
  ),
  `VALIDATION.md must record runtime evidence for minAppVersion ${manifest.minAppVersion}`,
);

for (const requiredPath of [
  'theme.css',
  'manifest.json',
  'README.md',
  'CHANGELOG.md',
  'assets/screenshots/archive-olive-512x288.png',
  'docs/specs/brat-beta-release.md',
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

assert.match(readme, /Install with BRAT/);
assert.match(readme, /ivan-94\/obsidian-archive-olive/);
assert.match(readme, /GitHub caching can delay an update/);
assert.match(readme, /Removing the BRAT registration stops monitoring/);
assert.match(
  css,
  /BRAT channel: main\/theme\.css/,
  'theme.css must identify the active BRAT channel',
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

const normalTextPairs = [
  ['light body', '#11110d', '#f1e7cc'],
  ['light muted', '#4b493f', '#f1e7cc'],
  ['light active file', '#f1e7cc', '#59611c'],
  ['light active tab', '#11110d', '#00a6b2'],
  ['light critical block', '#f1e7cc', '#8d1b1b'],
  ['dark body', '#eee4c8', '#1d2014'],
  ['dark muted', '#b4aa8f', '#1d2014'],
  ['dark active file', '#11110d', '#9aaa3a'],
  ['dark active tab', '#11110d', '#31c2c9'],
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
  `PASS manifest, repository policy, CSS policy, token integrity, Canvas, Bases${releaseMode ? ', and release files' : ''}`,
);
