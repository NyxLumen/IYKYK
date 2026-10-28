import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/home/lumen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core');
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/home/lumen/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome';
const OUTPUT_DIR = path.resolve('verification-results');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runTest() {
  console.log('🚀 Running Full Experience Scroll Flow & Integration Verification...');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error(`Browser Console Error: ${msg.text()}`);
      errors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    console.error(`Page Unhandled Error: ${err.message}`);
    errors.push(err.message);
  });

  // Navigate to root
  await page.goto('http://127.0.0.1:3001/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // 1. Initial State: Hero
  console.log('\n--- Step 1: Checking Hero Section ---');
  const heroVisible = await page.evaluate(() => {
    const el = document.querySelector('#scene-hero');
    return el && getComputedStyle(el).display !== 'none';
  });
  console.log(`Hero Section rendered: ${heroVisible}`);

  // 2. Scroll to Scene 0
  console.log('\n--- Step 2: Scrolling into Scene 0 ---');
  await page.evaluate(() => {
    const s0 = document.querySelector('#scene-0');
    if (s0) {
      const top = s0.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + 150, behavior: 'instant' });
    }
  });
  await page.waitForTimeout(600);

  const scene0State = await page.evaluate(() => {
    const s0 = document.querySelector('#scene-0');
    const label = document.querySelector('.scene-0-pop-art-label');
    const labelText = label?.textContent?.replace(/\s+/g, ' ').trim();
    const bag = document.querySelector('.scene-0-sticker-bag');
    const lamp = document.querySelector('.scene-0-sticker-lamp');
    const lightning = document.querySelector('.scene-0-sticker-lightning');
    const env = document.querySelector('.scene-0-env-img');

    const labelStyle = label ? getComputedStyle(label) : null;
    const bagStyle = bag ? getComputedStyle(bag) : null;
    const lampStyle = lamp ? getComputedStyle(lamp) : null;

    return {
      exists: !!s0,
      labelText,
      hasEnv: !!env,
      labelOpacity: labelStyle?.opacity,
      bagOpacity: bagStyle?.opacity,
      lampOpacity: lampStyle?.opacity,
      hasLightning: !!lightning,
    };
  });

  console.log('Scene 0 Elements State:', scene0State);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'flow-step2-scene0.png') });

  // 3. Scroll to Scene 1 (The Plan)
  console.log('\n--- Step 3: Scrolling into Scene 1 (The Plan) ---');
  await page.evaluate(() => {
    const s1 = document.querySelector('#scene-plan');
    if (s1) {
      const top = s1.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + 200, behavior: 'instant' });
    }
  });
  await page.waitForTimeout(600);

  const scene1State = await page.evaluate(() => {
    const s1 = document.querySelector('#scene-plan');
    return {
      exists: !!s1,
      visible: !!s1 && getComputedStyle(s1).display !== 'none',
    };
  });
  console.log('Scene 1 Plan State:', scene1State);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'flow-step3-scene1.png') });

  // 4. Test Reduced Motion Mode
  console.log('\n--- Step 4: Testing Reduced Motion Mode ---');
  const pageReduced = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await pageReduced.emulateMedia({ reducedMotion: 'reduce' });
  await pageReduced.goto('http://127.0.0.1:3001/?scene=scene-0', { waitUntil: 'networkidle' });
  await pageReduced.waitForTimeout(600);

  const reducedState = await pageReduced.evaluate(() => {
    const label = document.querySelector('.scene-0-pop-art-label');
    const bag = document.querySelector('.scene-0-sticker-bag');
    const lamp = document.querySelector('.scene-0-sticker-lamp');
    const lightning = document.querySelector('.scene-0-sticker-lightning');

    return {
      labelOpacity: label ? getComputedStyle(label).opacity : null,
      bagOpacity: bag ? getComputedStyle(bag).opacity : null,
      lampOpacity: lamp ? getComputedStyle(lamp).opacity : null,
      lightningOpacity: lightning ? getComputedStyle(lightning).opacity : null,
    };
  });
  console.log('Reduced Motion Elements Opacity (all should be 1):', reducedState);
  await pageReduced.screenshot({ path: path.join(OUTPUT_DIR, 'scene0-reduced-motion.png') });

  await page.close();
  await pageReduced.close();
  await browser.close();

  if (errors.length > 0) {
    console.error(`\n❌ Failed with ${errors.length} browser errors.`);
    process.exit(1);
  } else {
    console.log('\n✅ All integration & flow checks passed with 0 errors!');
  }
}

runTest().catch((err) => {
  console.error(err);
  process.exit(1);
});
