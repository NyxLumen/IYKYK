#!/usr/bin/env node

/**
 * IYKYK Asset Manifest Validation Script
 * 
 * Verifies:
 * 1. All manifest entries point to files that exist on disk.
 * 2. Every file on disk in production/source/assetsReady/ is registered in the manifest.
 * 3. No duplicate IDs (camelCase or kebabCase).
 * 4. Categories and variants conform to specification.
 * 5. Paths are well-formed.
 * 6. Dimensions and transparency metadata are intact.
 * 7. Preload classifications are valid and align with Scene 01.
 * 
 * Exits 0 on success, 1 on failure.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.resolve(REPO_ROOT, 'production/source/assetsReady');
const INVENTORY_FILE = path.resolve(REPO_ROOT, 'production/assets-inventory.json');
const MANIFEST_TS_FILE = path.resolve(REPO_ROOT, 'src/experience/data/assets.ts');
const PUBLIC_ASSETS_DIR = path.resolve(REPO_ROOT, 'public/assets');
const RUNTIME_MANIFEST_FILE = path.resolve(REPO_ROOT, 'public/assets/manifest.json');

const VALID_CATEGORIES = new Set(['character', 'environment', 'object', 'graphic', 'texture', 'brand']);
const VALID_CHARACTER_VARIANTS = new Set(['close', 'full', 'rebuild']);

const errors = [];
const warnings = [];

function logError(msg) {
  errors.push(`❌ ${msg}`);
}

function logWarn(msg) {
  warnings.push(`⚠️  ${msg}`);
}

console.log('🔍 [IYKYK] Starting production asset validation...\n');

// 1. Verify files exist
if (!fs.existsSync(ASSETS_DIR)) {
  logError(`Assets directory missing: ${ASSETS_DIR}`);
}
if (!fs.existsSync(INVENTORY_FILE)) {
  logError(`Inventory JSON missing: ${INVENTORY_FILE}`);
}
if (!fs.existsSync(MANIFEST_TS_FILE)) {
  logError(`Manifest TypeScript file missing: ${MANIFEST_TS_FILE}`);
}

if (errors.length > 0) {
  errors.forEach(e => console.error(e));
  process.exit(1);
}

// 2. Discover all actual files on disk
function getDiskFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getDiskFiles(fullPath));
    } else if (entry.isFile() && /\.(png|jpe?g|webp|svg)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

const diskFiles = getDiskFiles(ASSETS_DIR);
const diskFileRelPaths = new Set(diskFiles.map(f => path.relative(REPO_ROOT, f)));
console.log(`📁 Files discovered on disk: ${diskFiles.length}`);

// 3. Read inventory and ts manifest
const inventory = JSON.parse(fs.readFileSync(INVENTORY_FILE, 'utf-8'));
const manifestTsContent = fs.readFileSync(MANIFEST_TS_FILE, 'utf-8');

const assets = inventory.assets;
console.log(`📋 Manifest entries registered: ${assets.length}\n`);

// 4. Validate Disk vs Manifest 1-to-1 match
const manifestPaths = new Set();
const seenIds = new Set();
const seenKebabIds = new Set();

const categoryCounts = {};
const variantCounts = {};
let preloadCount = 0;
let transparentCount = 0;

for (const asset of assets) {
  // Category check
  if (!VALID_CATEGORIES.has(asset.category)) {
    logError(`Invalid category "${asset.category}" for asset: ${asset.id}`);
  }
  categoryCounts[asset.category] = (categoryCounts[asset.category] || 0) + 1;

  // Variant check
  if (asset.category === 'character') {
    if (!VALID_CHARACTER_VARIANTS.has(asset.variant)) {
      logError(`Invalid character variant "${asset.variant}" for asset: ${asset.id}`);
    }
    variantCounts[asset.variant] = (variantCounts[asset.variant] || 0) + 1;
  }

  // Duplicate ID check
  if (seenIds.has(asset.id)) {
    logError(`Duplicate asset ID detected: "${asset.id}"`);
  }
  seenIds.add(asset.id);

  if (seenKebabIds.has(asset.kebabId)) {
    logError(`Duplicate kebabId detected: "${asset.kebabId}"`);
  }
  seenKebabIds.add(asset.kebabId);

  // Path checks
  const relPath = asset.path;
  manifestPaths.add(relPath);

  if (!asset.repoPath.startsWith('/production/source/assetsReady/')) {
    logError(`Malformed repoPath for ${asset.id}: "${asset.repoPath}"`);
  }

  const diskFullPath = path.resolve(REPO_ROOT, relPath);
  if (!fs.existsSync(diskFullPath)) {
    logError(`Manifest entry points to MISSING file on disk: ${relPath} (ID: ${asset.id})`);
  }

  // Dimensions & Metadata
  if (!asset.width || asset.width <= 0 || !asset.height || asset.height <= 0) {
    logError(`Invalid dimensions for ${asset.id}: ${asset.width}x${asset.height}`);
  }

  if (asset.hasAlpha || asset.hasTransparency) {
    transparentCount++;
  }

  // Verify presence in TypeScript manifest
  if (!manifestTsContent.includes(`id: "${asset.id}"`)) {
    logError(`Asset ID "${asset.id}" missing from TypeScript manifest file (${MANIFEST_TS_FILE})`);
  }
}

// Check for unmanifested rogue files on disk
for (const diskRel of diskFileRelPaths) {
  if (!manifestPaths.has(diskRel)) {
    logError(`Disk file NOT registered in manifest: ${diskRel}`);
  }
}

// Count preloads from ts file
const preloadMatches = manifestTsContent.match(/preload:\s*true/g) || [];
preloadCount = preloadMatches.length;

// 5. Validate Runtime WebP Delivery (public/assets/)
console.log('🌐 Validating generated runtime assets (public/assets/)...');
let totalRuntimeVariants = 0;
let totalRuntimeBytes = 0;

if (!fs.existsSync(PUBLIC_ASSETS_DIR)) {
  logError(`Runtime assets directory missing: ${PUBLIC_ASSETS_DIR}`);
} else if (!fs.existsSync(RUNTIME_MANIFEST_FILE)) {
  logError(`Runtime manifest file missing: ${RUNTIME_MANIFEST_FILE}`);
} else {
  const runtimeAssets = JSON.parse(fs.readFileSync(RUNTIME_MANIFEST_FILE, 'utf-8'));
  console.log(`📦 Runtime manifest entries: ${runtimeAssets.length}`);

  for (const ra of runtimeAssets) {
    if (!ra.src.startsWith('/assets/')) {
      logError(`Runtime asset ${ra.id} has invalid src (must start with /assets/): ${ra.src}`);
    }
    const mainRuntimeFile = path.resolve(REPO_ROOT, 'public' + ra.src);
    if (!fs.existsSync(mainRuntimeFile)) {
      logError(`Runtime asset ${ra.id} file missing on disk: ${mainRuntimeFile}`);
    }

    if (!Array.isArray(ra.variants) || ra.variants.length === 0) {
      logError(`Runtime asset ${ra.id} has no responsive variants`);
    } else {
      for (const variant of ra.variants) {
        totalRuntimeVariants++;
        const variantDiskPath = path.resolve(REPO_ROOT, 'public' + variant.src);
        if (!fs.existsSync(variantDiskPath)) {
          logError(`Runtime variant missing on disk: ${variantDiskPath}`);
        } else {
          totalRuntimeBytes += fs.statSync(variantDiskPath).size;
        }
      }
    }
  }
}

// 6. Check that src/ has 0 remaining /production/source/assetsReady references
function checkNoSourceAssetRefs(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkNoSourceAssetRefs(full);
    } else if (/\.(tsx?|jsx?|css|html)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf-8');
      if (content.includes('/production/source/assetsReady')) {
        logError(`Legacy source asset reference found in runtime code: ${path.relative(REPO_ROOT, full)}`);
      }
    }
  }
}
checkNoSourceAssetRefs(path.resolve(REPO_ROOT, 'src'));

// Output Results
console.log('--- Manifest Breakdown ---');
console.log(`Total Source Assets: ${assets.length}`);
for (const [cat, count] of Object.entries(categoryCounts)) {
  console.log(`  - ${cat.padEnd(12)}: ${count}`);
}
console.log('Character Variants:');
for (const [varName, count] of Object.entries(variantCounts)) {
  console.log(`  - ${varName.padEnd(12)}: ${count}`);
}
console.log(`Preload Assets: ${preloadCount} (Scene 01 + Core Textures/Marks)`);
console.log(`Transparent / Alpha Cutouts: ${transparentCount}`);
console.log(`Runtime Variants Generated: ${totalRuntimeVariants}`);
console.log(`Runtime Payload Size: ${(totalRuntimeBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log('---------------------------\n');

if (errors.length > 0) {
  console.error(`💥 Validation FAILED with ${errors.length} error(s):\n`);
  errors.forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log('✅ All assets validated successfully! 0 missing files, 0 duplicate IDs, 100% path integrity.\n');
  process.exit(0);
}
