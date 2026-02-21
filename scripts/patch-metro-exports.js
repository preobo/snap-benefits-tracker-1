#!/usr/bin/env node
/**
 * Patches Metro and metro-* package.json files to export internal paths
 * for Expo CLI / @expo/metro-config compatibility. Run after npm install.
 */
const fs = require('fs');
const path = require('path');

const nodeModules = path.join(__dirname, '..', 'node_modules');
const metroExports = {
  './src/lib/TerminalReporter': './src/lib/TerminalReporter.js',
  './src/lib/*': './src/lib/*.js',
  './src/*': './src/*.js'
};
const metroPackageExports = {
  './src/*': './src/*.js',
  './src/*/*': './src/*/*.js'
};

function patchPackage(pkgPath) {
  if (!fs.existsSync(pkgPath)) return false;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (!pkg.exports || typeof pkg.exports !== 'object') return false;
  const additions = pkg.name === 'metro' ? metroExports : metroPackageExports;
  let changed = false;
  for (const [key, value] of Object.entries(additions)) {
    if (!pkg.exports[key]) {
      pkg.exports[key] = value;
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    return true;
  }
  return false;
}

let patched = 0;
if (fs.existsSync(nodeModules)) {
  const dirs = fs.readdirSync(nodeModules);
  const toPatch = ['metro'].concat(dirs.filter(d => d.startsWith('metro-') && !d.includes('@')));
  for (const name of toPatch) {
    const pkgPath = path.join(nodeModules, name, 'package.json');
    if (patchPackage(pkgPath)) patched++;
  }
  const expoMetro = path.join(nodeModules, '@expo', 'metro-config', 'package.json');
  if (patchPackage(expoMetro)) patched++;
}
if (patched) console.log('Patched', patched, 'package(s) for Expo CLI compatibility.');
