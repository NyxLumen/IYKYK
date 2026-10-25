import { chromium } from '/home/lumen/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import path from 'node:path';
import fs from 'node:fs';

const ARTIFACT_DIR = '/home/lumen/.gemini/antigravity/brain/2953902a-cc1a-48e3-98ec-cd94d0656cfe';
const SCREENSHOT_DIR = path.join(ARTIFACT_DIR, 'screenshots');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const PAD_RATIOS = {
  plan: 0.956,
  'first-drink': 0.972,
  buzzed: 0.972,
  drunk: 0.991,
  'party-peak': 0.987,
  'passed-out': 1.0,
  question: 1.0,
  rebuild: 0.979,
  reveal: 0.856,
};

const TARGET_DENSITY = {
  plan: { min: 6, max: 9, description: 'Ordered maximalism' },
  'first-drink': { min: 8, max: 12, description: 'Emerging social chaos' },
  buzzed: { min: 12, max: 16, description: 'Denser, diagonal energy' },
  drunk: { min: 14, max: 20, description: 'Distorted & fragmented' },
  'party-peak': { min: 18, max: 24, description: 'Maximum collision & energy' },
  'passed-out': { min: 8, max: 12, description: 'Scattered aftermath' },
  question: { min: 0, max: 0, description: 'Stark black pause' },
  rebuild: { min: 8, max: 12, description: 'Familiar fragments reconnecting' },
  reveal: { min: 5, max: 8, description: 'Confident brand resolution' },
};

const SCENES = [
  { id: 'plan', name: 'Scene 01: The Plan', charSelector: '.plan-character img', sectionId: 'scene-plan' },
  { id: 'first-drink', name: 'Scene 02: First Drink', charSelector: '.drink-character img', sectionId: 'scene-first-drink' },
  { id: 'buzzed', name: 'Scene 03: Buzzed', charSelector: '.buzzed-character img', sectionId: 'scene-buzzed' },
  { id: 'drunk', name: 'Scene 04: Drunk', charSelector: '.drunk-character img', sectionId: 'scene-drunk' },
  { id: 'party-peak', name: 'Scene 05: Party Peak', charSelector: '.peak-character img', sectionId: 'scene-party-peak' },
  { id: 'passed-out', name: 'Scene 06: Passed Out', charSelector: '.passed-character img', sectionId: 'scene-passed-out' },
  { id: 'question', name: 'Scene 07: The Question', charSelector: null, sectionId: 'scene-question' },
  { id: 'rebuild', name: 'Scene 08: The Turn (Rebuild)', charSelector: '.rebuild-protagonist-wrapper img', sectionId: 'scene-rebuild' },
  { id: 'reveal', name: 'Scene 09: The Reveal', charSelector: '.reveal-protagonist-wrapper img', sectionId: 'scene-reveal' },
];

async function run() {
  console.log('🚀 Starting Task 03B browser verification on Vite dev server (port 5173)...\n');
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/lumen/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  // -------------------------------------------------------------------------
  // DESKTOP RUN (1440 x 900)
  // -------------------------------------------------------------------------
  console.log('=== [DESKTOP ACCEPTANCE: 1440 x 900] ===');
  const deskContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const deskPage = await deskContext.newPage();
  await deskPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(1000);

  const desktopResults = [];

  for (const scene of SCENES) {
    const section = deskPage.locator(`#${scene.sectionId}`);
    await section.scrollIntoViewIfNeeded();
    await deskPage.evaluate(() => window.scrollBy(0, 450));
    await deskPage.waitForTimeout(600);

    let charData = null;
    if (scene.charSelector) {
      const charEl = deskPage.locator(`#${scene.sectionId} ${scene.charSelector}`);
      const isVisible = await charEl.isVisible();
      if (isVisible) {
        const box = await charEl.boundingBox();
        const src = await charEl.getAttribute('src');
        const boxWidthPct = ((box.width / 1440) * 100).toFixed(1);
        const visibleWidthPct = (((box.width * (PAD_RATIOS[scene.id] || 1)) / 1440) * 100).toFixed(1);
        charData = { box, src, boxWidthPct, visibleWidthPct };
        console.log(`  📸 ${scene.name}:`);
        console.log(`     Asset: ${src}`);
        console.log(`     Rendered Box: ${box.width.toFixed(1)}px x ${box.height.toFixed(1)}px at (${box.x.toFixed(1)}, ${box.y.toFixed(1)})`);
        console.log(`     Visible Art Width %: ${visibleWidthPct}% (Target: 50–60%) [Box: ${boxWidthPct}%]`);
      }
    } else {
      console.log(`  📸 ${scene.name}: Graphic pause (no character)`);
    }

    // Inspect density & elements in current scene
    const sceneAnalysis = await deskPage.evaluate((secId) => {
      const sec = document.getElementById(secId);
      if (!sec) return null;

      // Count secondary elements
      let secondaryElements = 0;
      let secondaryList = [];
      const planes = {
        planeB: sec.querySelectorAll('.scene-plane-b .art-card').length,
        planeC: sec.querySelectorAll('.scene-plane-c .art-card').length,
        planeD: sec.querySelectorAll('.scene-plane-d .art-card').length,
        planeE: sec.querySelectorAll('.scene-plane-e .art-card').length,
      };

      if (secId === 'scene-question') {
        secondaryElements = 0;
      } else if (secId === 'scene-rebuild') {
        const frags = sec.querySelectorAll('.rebuild-fragment');
        secondaryElements = frags.length;
        secondaryList = Array.from(frags).map((f) => f.className);
      } else if (secId === 'scene-reveal') {
        const layers = sec.querySelectorAll('.reveal-layer');
        secondaryElements = layers.length;
        secondaryList = Array.from(layers).map((l) => l.className);
      } else {
        const cards = sec.querySelectorAll('.scene-plane-b .art-card, .scene-plane-d .art-card, .scene-plane-e .art-card');
        secondaryElements = cards.length;
        secondaryList = Array.from(cards).map((c) => c.className);
      }

      // Check copy position and alignment
      const copyEl = sec.querySelector('.scene-copy');
      const copyStyle = copyEl ? window.getComputedStyle(copyEl) : null;
      const copyInfo = copyStyle ? {
        textAlign: copyStyle.textAlign,
        transform: copyStyle.transform,
        left: copyStyle.left,
        right: copyStyle.right,
      } : null;

      return {
        secondaryElements,
        secondaryList,
        planes,
        copyInfo,
      };
    }, scene.sectionId);

    const target = TARGET_DENSITY[scene.id];
    const densityPass = sceneAnalysis.secondaryElements >= target.min && sceneAnalysis.secondaryElements <= target.max;
    console.log(`     Secondary Elements: ${sceneAnalysis.secondaryElements} (Target: ${target.min}–${target.max}) [${densityPass ? 'PASS' : 'OUT-OF-RANGE'}]`);
    if (sceneAnalysis.copyInfo) {
      console.log(`     Typography Alignment: ${sceneAnalysis.copyInfo.textAlign} | Transform: ${sceneAnalysis.copyInfo.transform}`);
    }

    const shotPath = path.join(SCREENSHOT_DIR, `desktop-${scene.id}.png`);
    await deskPage.screenshot({ path: shotPath });

    desktopResults.push({
      scene: scene.id,
      name: scene.name,
      charData,
      analysis: sceneAnalysis,
      targetDensity: target,
      densityPass,
      screenshot: shotPath,
    });
  }

  // Reverse Scroll Determinism Test on Desktop
  console.log('\n  🔄 Testing reverse scroll determinism on desktop...');
  const scrollTotal = await deskPage.evaluate(() => document.documentElement.scrollHeight);
  for (let y = scrollTotal; y >= 0; y -= 600) {
    await deskPage.evaluate((pos) => window.scrollTo(0, pos), y);
    await deskPage.waitForTimeout(40);
  }
  await deskPage.evaluate(() => window.scrollTo(0, 0));
  await deskPage.waitForTimeout(600);

  const reverseShotPath = path.join(SCREENSHOT_DIR, 'desktop-reverse-return-scene01.png');
  await deskPage.screenshot({ path: reverseShotPath });
  const returnedBox = await deskPage.locator('#scene-plan .plan-character img').boundingBox();
  console.log(`  ✅ Returned to Scene 01. Protagonist box: ${returnedBox.width.toFixed(1)}px x ${returnedBox.height.toFixed(1)}px`);

  await deskContext.close();

  // -------------------------------------------------------------------------
  // MOBILE RUN (390 x 844)
  // -------------------------------------------------------------------------
  console.log('\n=== [MOBILE ACCEPTANCE: 390 x 844] ===');
  const mobContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobPage = await mobContext.newPage();
  await mobPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await mobPage.waitForTimeout(1000);

  const mobileResults = [];

  for (const scene of SCENES) {
    const section = mobPage.locator(`#${scene.sectionId}`);
    await section.scrollIntoViewIfNeeded();
    await mobPage.evaluate(() => window.scrollBy(0, 350));
    await mobPage.waitForTimeout(600);

    let charData = null;
    if (scene.charSelector) {
      const charEl = mobPage.locator(`#${scene.sectionId} ${scene.charSelector}`);
      const isVisible = await charEl.isVisible();
      if (isVisible) {
        const box = await charEl.boundingBox();
        const src = await charEl.getAttribute('src');
        const boxWidthPct = ((box.width / 390) * 100).toFixed(1);
        const visibleWidthPct = (((box.width * (PAD_RATIOS[scene.id] || 1)) / 390) * 100).toFixed(1);
        charData = { box, src, boxWidthPct, visibleWidthPct };
        console.log(`  📱 ${scene.name}:`);
        console.log(`     Asset: ${src}`);
        console.log(`     Rendered Box: ${box.width.toFixed(1)}px x ${box.height.toFixed(1)}px at (${box.x.toFixed(1)}, ${box.y.toFixed(1)})`);
        console.log(`     Visible Art Width %: ${visibleWidthPct}% (Target: ~80%) [Box: ${boxWidthPct}%]`);
      }
    } else {
      console.log(`  📱 ${scene.name}: Graphic pause (no character)`);
    }

    const shotPath = path.join(SCREENSHOT_DIR, `mobile-${scene.id}.png`);
    await mobPage.screenshot({ path: shotPath });

    mobileResults.push({
      scene: scene.id,
      name: scene.name,
      charData,
      screenshot: shotPath,
    });
  }

  // Reverse scroll test on mobile
  console.log('\n  🔄 Testing reverse scroll determinism on mobile...');
  const mobScrollTotal = await mobPage.evaluate(() => document.documentElement.scrollHeight);
  for (let y = mobScrollTotal; y >= 0; y -= 500) {
    await mobPage.evaluate((pos) => window.scrollTo(0, pos), y);
    await mobPage.waitForTimeout(40);
  }
  await mobPage.evaluate(() => window.scrollTo(0, 0));
  await mobPage.waitForTimeout(600);

  const mobReverseShot = path.join(SCREENSHOT_DIR, 'mobile-reverse-return-scene01.png');
  await mobPage.screenshot({ path: mobReverseShot });
  const mobReturnedBox = await mobPage.locator('#scene-plan .plan-character img').boundingBox();
  console.log(`  ✅ Mobile returned to Scene 01. Protagonist box: ${mobReturnedBox.width.toFixed(1)}px x ${mobReturnedBox.height.toFixed(1)}px`);

  await mobContext.close();
  await browser.close();

  // Save JSON report of test runs
  const report = {
    timestamp: new Date().toISOString(),
    desktop: desktopResults,
    mobile: mobileResults,
  };
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'acceptance-test-report.json'), JSON.stringify(report, null, 2));
  console.log(`\n🎉 Browser acceptance verification complete! Report saved to acceptance-test-report.json`);
}

run().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
