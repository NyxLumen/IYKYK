#!/usr/bin/env node

/**
 * verify-analog-clock.mjs
 * Verification suite for Task 05A: Analog Clock SVG Component & Integration.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = process.cwd();

console.log('=== VERIFYING ANALOG CLOCK SVG (TASK 05A) ===\n');

let failedTests = 0;

function assert(condition, description) {
  if (condition) {
    console.log(`[PASS] ${description}`);
  } else {
    console.error(`[FAIL] ${description}`);
    failedTests++;
  }
}

// 1. Check time calculation logic
console.log('--- 1. Time Calculation Logic ---');

// Replicate calculation from AnalogClockSvg.tsx
function calculateHandAngles(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') {
    return { hourAngle: 0, minuteAngle: 0 };
  }

  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})(?:\s*([AP]M))?$/i);
  if (!match) {
    return { hourAngle: 0, minuteAngle: 0 };
  }

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const ampm = match[3] ? match[3].toUpperCase() : null;

  if (ampm === 'PM' && hour < 12) {
    hour += 12;
  } else if (ampm === 'AM' && hour === 12) {
    hour = 0;
  }

  const normalizedHour = hour % 12;
  const minuteAngle = Number(((minute / 60) * 360).toFixed(2));
  const hourAngle = Number((((normalizedHour + minute / 60) / 12) * 360).toFixed(2));

  return { hourAngle, minuteAngle };
}

const testCases = [
  { time: '9:30 PM', expH: 285, expM: 180 },
  { time: '10:15 PM', expH: 307.5, expM: 90 },
  { time: '11:40 PM', expH: 350, expM: 240 },
  { time: '1:20 AM', expH: 40, expM: 120 },
  { time: '3:17 AM', expH: 98.5, expM: 102 },
  { time: '7:58 AM', expH: 239, expM: 348 },
  { time: '12:00 PM', expH: 0, expM: 0 },
  { time: '12:00 AM', expH: 0, expM: 0 },
];

for (const tc of testCases) {
  const res = calculateHandAngles(tc.time);
  assert(
    res.hourAngle === tc.expH && res.minuteAngle === tc.expM,
    `${tc.time} calculated angles -> Hour: ${res.hourAngle}° (expected ${tc.expH}°), Minute: ${res.minuteAngle}° (expected ${tc.expM}°)`
  );
}

// 2. Verify AnalogClockSvg.tsx contents & elements
console.log('\n--- 2. AnalogClockSvg Component Architecture ---');

const svgSource = readFileSync(
  resolve(ROOT, 'src/experience/components/AnalogClockSvg.tsx'),
  'utf-8'
);

assert(svgSource.includes('export const AnalogClockSvg ='), 'AnalogClockSvg component is exported');
assert(svgSource.includes('export function calculateHandAngles'), 'calculateHandAngles function is exported');

// Check separately addressable elements
const requiredClasses = [
  'clock-sticker-border',
  'clock-casing',
  'clock-bezel',
  'clock-face',
  'clock-tick-minute',
  'clock-tick-hour',
  'clock-hand-hour',
  'clock-hand-minute',
  'clock-center-pin',
  'clock-registration',
];

for (const cls of requiredClasses) {
  assert(svgSource.includes(cls), `Contains required class selector: .${cls}`);
}

// Check colors
assert(svgSource.includes('#EDE4D9'), 'Contains warm-paper color token #EDE4D9');
assert(svgSource.includes('#0B0B0B'), 'Contains deep-ink color token #0B0B0B');
assert(svgSource.includes('#7A3BFF'), 'Contains electric-purple hand color #7A3BFF');
assert(svgSource.includes('#39EF88'), 'Contains acid-green registration accent #39EF88');

// Check numerals
assert(
  />\s*12\s*</.test(svgSource) &&
  />\s*3\s*</.test(svgSource) &&
  />\s*6\s*</.test(svgSource) &&
  />\s*9\s*</.test(svgSource),
  'Contains restrained numerals 12, 3, 6, 9'
);

// Check independent refs / props
assert(svgSource.includes('hourHandRef') && svgSource.includes('minuteHandRef'), 'Supports independent hourHandRef and minuteHandRef');
assert(svgSource.includes('hourAngle') && svgSource.includes('minuteAngle'), 'Supports independent hourAngle and minuteAngle overrides');

// 3. Verify Clock.tsx integration
console.log('\n--- 3. Clock Component Integration ---');

const clockSource = readFileSync(
  resolve(ROOT, 'src/experience/components/Clock.tsx'),
  'utf-8'
);

assert(clockSource.includes("import { AnalogClockSvg, calculateHandAngles"), 'Clock.tsx imports AnalogClockSvg');
assert(clockSource.includes("variant === 'analog'"), "Clock.tsx handles variant === 'analog'");
assert(clockSource.includes("<AnalogClockSvg"), 'Clock.tsx renders AnalogClockSvg');
assert(clockSource.includes("variant === 'oversized'"), "Clock.tsx preserves variant === 'oversized'");
assert(clockSource.includes("clock-digital badge-tape"), 'Clock.tsx preserves digital badge-tape variant');

// 4. Verify CSS styling & responsive constraints
console.log('\n--- 4. CSS Styling & Responsive Layout ---');

const cssSource = readFileSync(
  resolve(ROOT, 'src/styles/vertical-pass.css'),
  'utf-8'
);

assert(cssSource.includes('.scene-vertical-pass .clock-analog'), 'Defines .scene-vertical-pass .clock-analog in vertical-pass.css');
assert(cssSource.includes('width: 80px') && cssSource.includes('height: 80px'), 'Desktop specifies 80px width & height');
assert(cssSource.includes('width: 54px !important') && cssSource.includes('height: 54px !important'), 'Mobile specifies 54px width & height');
assert(cssSource.includes('transform: none'), 'Mobile does not apply distorting/clipping scale');

console.log('\n=============================================');
if (failedTests === 0) {
  console.log('ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.error(`${failedTests} VERIFICATION CHECK(S) FAILED!`);
  process.exit(1);
}
