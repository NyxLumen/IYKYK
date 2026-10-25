import { chromium } from '/home/lumen/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import path from 'node:path';
import fs from 'node:fs';

const ARTIFACT_DIR = '/home/lumen/.gemini/antigravity/brain/2953902a-cc1a-48e3-98ec-cd94d0656cfe';
const SCREENSHOT_DIR = path.join(ARTIFACT_DIR, 'screenshots');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function verifyReveal() {
  console.log('🚀 Verifying Redesigned Reveal / CTA Section (#scene-reveal)...');
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/lumen/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  // 1. DESKTOP (1440 x 900)
  {
    console.log('\n--- Checking Desktop (1440x900) ---');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Scroll to the end of document so #scene-reveal is fully active
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);

    // Measure bounding boxes
    const metrics = await page.evaluate(() => {
      const scene = document.querySelector('#scene-reveal');
      const hud = scene.querySelector('.scene-hud');
      const card = scene.querySelector('.reveal-content-card');
      const badge = scene.querySelector('.paper-badge-lockup');
      const tape = scene.querySelector('.reveal-badge-wrapper .reveal-tape');
      const h1 = scene.querySelector('h1');
      const subhead = scene.querySelector('.reveal-subhead');
      const bracket = scene.querySelector('.reveal-badge-wrapper .reveal-bracket');
      const desc = scene.querySelector('.reveal-description');
      const cta = scene.querySelector('.brand-cta');
      const barcode = scene.querySelector('.reveal-barcode-stamp');
      const proto = scene.querySelector('.reveal-protagonist-wrapper');
      const stars = scene.querySelector('.reveal-stars');
      const footer = scene.querySelector('.scene-footer');

      const getRect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: Math.round(r.x),
          y: Math.round(r.y),
          width: Math.round(r.width),
          height: Math.round(r.height),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
        };
      };

      return {
        scene: getRect(scene),
        hud: getRect(hud),
        card: getRect(card),
        badge: getRect(badge),
        tape: getRect(tape),
        h1: getRect(h1),
        bracket: getRect(bracket),
        subhead: getRect(subhead),
        desc: getRect(desc),
        cta: getRect(cta),
        barcode: getRect(barcode),
        proto: getRect(proto),
        stars: getRect(stars),
        footer: getRect(footer),
      };
    });

    console.log('Desktop Metrics:', JSON.stringify(metrics, null, 2));

    const shotPath = path.join(SCREENSHOT_DIR, 'redesigned-reveal-desktop.png');
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`Saved desktop screenshot: ${shotPath}`);

    await context.close();
  }

  // 2. MOBILE (390 x 844)
  {
    console.log('\n--- Checking Mobile (390x844) ---');
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Scroll to the end of document so #scene-reveal is fully active
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);

    // Measure bounding boxes
    const metrics = await page.evaluate(() => {
      const scene = document.querySelector('#scene-reveal');
      const hud = scene.querySelector('.scene-hud');
      const card = scene.querySelector('.reveal-content-card');
      const badge = scene.querySelector('.paper-badge-lockup');
      const h1 = scene.querySelector('h1');
      const subhead = scene.querySelector('.reveal-subhead');
      const desc = scene.querySelector('.reveal-description');
      const cta = scene.querySelector('.brand-cta');
      const barcode = scene.querySelector('.reveal-barcode-stamp');
      const proto = scene.querySelector('.reveal-protagonist-wrapper');
      const footer = scene.querySelector('.scene-footer');

      const getRect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: Math.round(r.x),
          y: Math.round(r.y),
          width: Math.round(r.width),
          height: Math.round(r.height),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
        };
      };

      return {
        scene: getRect(scene),
        hud: getRect(hud),
        card: getRect(card),
        badge: getRect(badge),
        h1: getRect(h1),
        subhead: getRect(subhead),
        desc: getRect(desc),
        cta: getRect(cta),
        barcode: getRect(barcode),
        proto: getRect(proto),
        footer: getRect(footer),
      };
    });

    console.log('Mobile Metrics:', JSON.stringify(metrics, null, 2));

    const shotPath = path.join(SCREENSHOT_DIR, 'redesigned-reveal-mobile.png');
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`Saved mobile screenshot: ${shotPath}`);

    await context.close();
  }

  await browser.close();
  console.log('✨ Verification finished.');
}

verifyReveal().catch((err) => {
  console.error('Error verifying reveal section:', err);
  process.exit(1);
});
