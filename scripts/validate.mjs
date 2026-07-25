import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFile(resolve(root, path), 'utf8');

const [css, manifestText, canvasText, baseText] = await Promise.all([
  read('theme.css'),
  read('manifest.json'),
  read('test-vault/Archive Olive.canvas'),
  read('test-vault/Theme Notes.base'),
]);

const manifest = JSON.parse(manifestText);
JSON.parse(canvasText);

assert.equal(manifest.name, 'Archive Olive');
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.match(manifest.minAppVersion, /^\d+\.\d+\.\d+$/);
assert.ok(manifest.author);

for (const pattern of [
  [/!important/i, 'routine !important'],
  [/:has\(/i, 'undocumented :has()'],
  [/@import/i, 'CSS imports'],
  [/url\(\s*['"]?https?:/i, 'remote CSS assets'],
]) {
  assert.equal(pattern[0].test(css), false, `theme.css contains ${pattern[1]}`);
}

const aoDefinitions = new Set(
  [...css.matchAll(/(--ao-[\w-]+)\s*:/g)].map((match) => match[1]),
);
const aoReferences = new Set(
  [...css.matchAll(/var\((--ao-[\w-]+)/g)].map((match) => match[1]),
);
const missingAoDefinitions = [...aoReferences].filter(
  (name) => !aoDefinitions.has(name),
);
assert.deepEqual(
  missingAoDefinitions,
  [],
  `Undefined Archive Olive variables: ${missingAoDefinitions.join(', ')}`,
);

assert.match(baseText, /^filters:/m);
assert.match(baseText, /^views:/m);

const luminance = (hex) => {
  const channels = hex
    .slice(1)
    .match(/../g)
    .map((channel) => parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return (
    0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
  );
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

console.log('PASS manifest, CSS policy, token integrity, Canvas, and Bases');
