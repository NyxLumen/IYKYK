#!/usr/bin/env node

import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const ARTIFACT_DIR = '/home/lumen/.gemini/antigravity/brain/ade4e004-6f12-46ca-a9e0-d27a576e7eb0/screenshots';
const PORT = 4182;
const BASE_URL = `http://127.0.0.1:${PORT}`;

fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200 || res.ok) return true;
    } catch {
      // ignore
    }
    await sleep(200);
  }
  throw new Error(`Server at ${url} failed to start within ${timeoutMs}ms`);
}

function runBraveScreenshot({ url, width, height, outputPath }) {
  return new Promise((resolve, reject) => {
    console.log(`📸 Capturing ${path.basename(outputPath)} (${width}x${height})...`);
    const args = [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${width},${height}`,
      `--screenshot=${outputPath}`,
      url,
    ];

    const child = spawn('/opt/brave-bin/brave', args, { stdio: 'inherit' });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Brave exited with code ${code}`));
    });
  });
}

async function main() {
  console.log('🚀 Spawning Vite preview server...');
  const preview = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', PORT.toString(), '--strictPort'], {
    stdio: 'pipe',
  });

  preview.stdout.on('data', (d) => process.stdout.write(d.toString()));
  preview.stderr.on('data', (d) => process.stderr.write(d.toString()));

  try {
    await waitForServer(`${BASE_URL}/?verify=true`);
    console.log('✅ Server is ready!');

    // 1. Battery Suite Desktop (1440x900) - 100%, 80%, 60%, 40%, 20%, 0%, Rebuild 54%
    await runBraveScreenshot({
      url: `${BASE_URL}/?verify=battery`,
      width: 1440,
      height: 900,
      outputPath: path.join(ARTIFACT_DIR, 'battery_states_desktop_1440x900.png'),
    });

    // 2. Battery Suite Mobile (390x844) - 100%, 80%, 60%, 40%, 20%, 0%, Rebuild 54%
    await runBraveScreenshot({
      url: `${BASE_URL}/?verify=battery`,
      width: 390,
      height: 844,
      outputPath: path.join(ARTIFACT_DIR, 'battery_states_mobile_390x844.png'),
    });

    // 3. Analog Clock Suite Desktop (1440x900) - 9:30 PM, 10:15 PM, 11:40 PM, 1:20 AM, 3:17 AM, 7:58 AM
    await runBraveScreenshot({
      url: `${BASE_URL}/?verify=clocks`,
      width: 1440,
      height: 900,
      outputPath: path.join(ARTIFACT_DIR, 'clock_narrative_times_desktop_1440x900.png'),
    });

    // 4. Analog Clock Suite Mobile (390x844) - 9:30 PM, 10:15 PM, 11:40 PM, 1:20 AM, 3:17 AM, 7:58 AM
    await runBraveScreenshot({
      url: `${BASE_URL}/?verify=clocks`,
      width: 390,
      height: 844,
      outputPath: path.join(ARTIFACT_DIR, 'clock_narrative_times_mobile_390x844.png'),
    });

    // 5. Close-Up Macro Legibility Proof Desktop (1440x900) - Sticker edges, face, tick marks, hands
    await runBraveScreenshot({
      url: `${BASE_URL}/?verify=closeup`,
      width: 1440,
      height: 900,
      outputPath: path.join(ARTIFACT_DIR, 'macro_closeup_proof_desktop_1440x900.png'),
    });

    // 6. Close-Up Macro Legibility Proof Mobile (390x844) - Sticker edges, face, tick marks, hands
    await runBraveScreenshot({
      url: `${BASE_URL}/?verify=closeup`,
      width: 390,
      height: 844,
      outputPath: path.join(ARTIFACT_DIR, 'macro_closeup_proof_mobile_390x844.png'),
    });

    // 7. In-Situ Story Scene 01 (Plan - 100% Battery, 9:30 PM Digital Clock, Desktop)
    await runBraveScreenshot({
      url: `${BASE_URL}/?scene=plan&reduced=true`,
      width: 1440,
      height: 900,
      outputPath: path.join(ARTIFACT_DIR, 'story_scene_01_plan_desktop_1440x900.png'),
    });

    // 8. In-Situ Story Scene 03 (Buzzed - 60% Battery, 11:40 PM Analog Clock, Desktop)
    await runBraveScreenshot({
      url: `${BASE_URL}/?scene=buzzed&reduced=true`,
      width: 1440,
      height: 900,
      outputPath: path.join(ARTIFACT_DIR, 'story_scene_03_buzzed_analog_clock_desktop_1440x900.png'),
    });

    // 9. In-Situ Story Scene 03 (Buzzed - 60% Battery, 11:40 PM Analog Clock, Mobile)
    await runBraveScreenshot({
      url: `${BASE_URL}/?scene=buzzed&reduced=true`,
      width: 390,
      height: 844,
      outputPath: path.join(ARTIFACT_DIR, 'story_scene_03_buzzed_analog_clock_mobile_390x844.png'),
    });

    // 10. In-Situ Story Scene 05 (Party Peak - 20% Battery, 3:17 AM Oversized Clock, Desktop)
    await runBraveScreenshot({
      url: `${BASE_URL}/?scene=party-peak&reduced=true`,
      width: 1440,
      height: 900,
      outputPath: path.join(ARTIFACT_DIR, 'story_scene_05_party_peak_desktop_1440x900.png'),
    });

    // 11. In-Situ Story Scene 06 (Passed Out - 0% Battery, 7:58 AM Digital Clock, Desktop)
    await runBraveScreenshot({
      url: `${BASE_URL}/?scene=passed-out&reduced=true`,
      width: 1440,
      height: 900,
      outputPath: path.join(ARTIFACT_DIR, 'story_scene_06_passed_out_desktop_1440x900.png'),
    });

    console.log('\n🎉 All visual verification screenshots captured successfully in:', ARTIFACT_DIR);
  } finally {
    preview.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error('❌ Error during screenshot capture:', err);
  process.exit(1);
});
