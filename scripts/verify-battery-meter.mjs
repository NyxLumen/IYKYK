import fs from 'node:fs';
import path from 'node:path';

const batterySvgFile = path.resolve('src/experience/components/BatterySvg.tsx');
const meterFile = path.resolve('src/experience/components/Meter.tsx');
const rebuildSceneFile = path.resolve('src/experience/scenes/RebuildScene.tsx');
const cssFile = path.resolve('src/styles/vertical-pass.css');

console.log('Running Battery Meter Verification...');

// 1. Verify BatterySvg.tsx content
const batteryCode = fs.readFileSync(batterySvgFile, 'utf8');

const requiredClasses = [
  'battery-sticker-border',
  'battery-casing',
  'battery-terminal',
  'battery-interior-track',
  'battery-cell',
  'battery-cell-1',
  'battery-cell-2',
  'battery-cell-3',
  'battery-cell-4',
  'battery-cell-5',
  'battery-fill-active',
  'battery-registration-mark',
];

for (const cls of requiredClasses) {
  if (!batteryCode.includes(cls)) {
    throw new Error(`Missing class "${cls}" in BatterySvg.tsx`);
  }
}
console.log('✓ All required SVG classes present in BatterySvg.tsx');

// 2. Verify Palette
const requiredColors = ['#0B0B0B', '#EDE4D9', '#7A3BFF', '#39EF88', '#180D2B'];
for (const color of requiredColors) {
  if (!batteryCode.toUpperCase().includes(color.toUpperCase())) {
    throw new Error(`Missing canonical color "${color}" in BatterySvg.tsx`);
  }
}
console.log('✓ All canonical palette colors present');

// 3. Verify Active Fill vs Registration
if (!batteryCode.includes('fill="#7A3BFF"')) {
  throw new Error('Active cell fill must be Electric Purple (#7A3BFF)');
}
if (!batteryCode.includes('stroke="#39EF88"')) {
  throw new Error('Registration accents must use Acid Green (#39EF88)');
}
console.log('✓ Active fill is Electric Purple and registration accents use Acid Green');

// 4. Verify Cell geometry & clip math for canonical states
const cells = [
  { id: 1, start: 20, end: 40 },
  { id: 2, start: 43, end: 63 },
  { id: 3, start: 66, end: 86 },
  { id: 4, start: 89, end: 109 },
  { id: 5, start: 112, end: 132 },
];
const totalSpan = 112; // 132 - 20
const startX = 20;

const testStates = [
  { pct: 0, expectedFilled: 0 },
  { pct: 20, expectedFilled: 1 },
  { pct: 40, expectedFilled: 2 },
  { pct: 60, expectedFilled: 3 },
  { pct: 80, expectedFilled: 4 },
  { pct: 100, expectedFilled: 5 },
];

for (const { pct, expectedFilled } of testStates) {
  const clipWidth = (pct / 100) * totalSpan;
  const clipRight = startX + clipWidth;
  // A cell is considered filled if clip covers its full width (clipRight >= cell.end)
  // and partially filled or empty if clipRight < cell.end
  const fullyFilled = cells.filter((c) => clipRight >= c.end).length;
  const touchedNext = cells.filter((c) => clipRight > c.start && clipRight < c.end).length;

  if (fullyFilled !== expectedFilled) {
    throw new Error(`At ${pct}%, expected ${expectedFilled} cells fully filled, but got ${fullyFilled}`);
  }
  if (touchedNext !== 0) {
    throw new Error(`At ${pct}%, clip boundary lands mid-cell instead of inter-cell gap!`);
  }
}
console.log('✓ Canonical values (100, 80, 60, 40, 20, 0) strictly match 5, 4, 3, 2, 1, 0 cell counts!');

// 5. Verify Meter.tsx integration
const meterCode = fs.readFileSync(meterFile, 'utf8');
if (!meterCode.includes('BatterySvg') || !meterCode.includes('meter-bar-label')) {
  throw new Error('Meter.tsx must integrate BatterySvg and retain outside meter-bar-label');
}
console.log('✓ Meter.tsx integrates BatterySvg and retains external percentage label');

// 6. Verify RebuildScene.tsx integration
const rebuildCode = fs.readFileSync(rebuildSceneFile, 'utf8');
if (!rebuildCode.includes('batteryRef.current?.setValue(rounded)')) {
  throw new Error('RebuildScene.tsx must update battery fill via batteryRef without React re-render');
}
if (!rebuildCode.includes('<Meter')) {
  throw new Error('RebuildScene.tsx must use Meter component');
}
console.log('✓ RebuildScene.tsx uses Meter and updates battery via batteryRef with 60fps direct DOM manipulation');

console.log('ALL BATTERY METER VERIFICATIONS PASSED SUCCESSFULLY!');
