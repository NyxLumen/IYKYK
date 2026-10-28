import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-375', width: 375, height: 667 },
  { name: 'mobile-320', width: 320, height: 568 },
];

const OUTPUT_DIR = path.resolve('verification-results');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runVerification() {
  console.log('🚀 Starting Comic Components Visual & Responsive Verification...');
  const browser = await chromium.launch();
  let allPassed = true;
  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n📱 Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    // Navigate to /dev/comic-components
    await page.goto('http://127.0.0.1:3000/dev/comic-components', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 1. Check for unexpected page horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > window.innerWidth;
    });

    if (hasHorizontalOverflow) {
      console.error(`❌ FAIL: Horizontal scrollbar detected at ${vp.name}!`);
      allPassed = false;
      results.push({ viewport: vp.name, check: 'Horizontal Overflow', passed: false });
    } else {
      console.log(`✅ PASS: No horizontal overflow at ${vp.name}`);
      results.push({ viewport: vp.name, check: 'Horizontal Overflow', passed: true });
    }

    // 2. Check ComicAction elements
    const actionChecks = await page.evaluate(() => {
      const actions = Array.from(document.querySelectorAll('.comic-action__panel'));
      return actions.map((el, i) => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return {
          index: i,
          width: rect.width,
          height: rect.height,
          borderWidth: style.borderTopWidth,
          hasBg: style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent',
          hasPattern: style.backgroundImage.includes('radial-gradient'),
          hasShadow: style.boxShadow !== 'none',
        };
      });
    });

    console.log(`   Found ${actionChecks.length} ComicAction panels.`);
    const actionsValid = actionChecks.every(a => a.width > 0 && a.height > 0 && a.hasBg && a.hasPattern && a.hasShadow);
    if (!actionsValid) {
      console.error(`❌ FAIL: ComicAction panels missing styling properties at ${vp.name}`);
      allPassed = false;
      results.push({ viewport: vp.name, check: 'ComicAction Styling', passed: false });
    } else {
      console.log(`✅ PASS: All ComicAction panels styled with border, halftone pattern, and offset shadow`);
      results.push({ viewport: vp.name, check: 'ComicAction Styling', passed: true });
    }

    // 3. Check ComicBubble elements
    const bubbleChecks = await page.evaluate(() => {
      const bubbles = Array.from(document.querySelectorAll('.comic-bubble-wrapper'));
      return bubbles.map((el, i) => {
        const svg = el.querySelector('.comic-bubble__svg');
        const content = el.querySelector('.comic-bubble__content');
        const sRect = svg ? svg.getBoundingClientRect() : null;
        const cRect = content ? content.getBoundingClientRect() : null;
        const paths = svg ? Array.from(svg.querySelectorAll('path')) : [];
        const circles = svg ? Array.from(svg.querySelectorAll('circle')) : [];
        return {
          index: i,
          hasSvg: !!svg,
          hasContent: !!content,
          svgWidth: sRect ? sRect.width : 0,
          svgHeight: sRect ? sRect.height : 0,
          contentWidth: cRect ? cRect.width : 0,
          contentHeight: cRect ? cRect.height : 0,
          numPaths: paths.length,
          numDots: circles.length,
          textVisible: content ? (content.textContent || '').trim().length > 0 : false,
        };
      });
    });

    console.log(`   Found ${bubbleChecks.length} ComicBubble instances.`);
    const bubblesValid = bubbleChecks.every(b =>
      b.hasSvg && b.hasContent && b.svgWidth > 0 && b.svgHeight > 0 && b.numPaths >= 2 && b.numDots >= 7 && b.textVisible
    );

    if (!bubblesValid) {
      console.error(`❌ FAIL: Some ComicBubble instances missing svg/dots/paths at ${vp.name}`);
      allPassed = false;
      results.push({ viewport: vp.name, check: 'ComicBubble Rendering', passed: false });
    } else {
      console.log(`✅ PASS: All ComicBubble instances rendered with organic SVG path, tail, and decorative dots`);
      results.push({ viewport: vp.name, check: 'ComicBubble Rendering', passed: true });
    }

    // Capture Full Page Screenshot
    const screenshotPath = path.join(OUTPUT_DIR, `preview-${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Saved screenshot: ${screenshotPath}`);

    await page.close();
  }

  // 4. Test Live Studio Interactions
  console.log('\n🎛️ Testing Live Customizer Studio Controls...');
  const studioPage = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await studioPage.goto('http://127.0.0.1:3000/dev/comic-components', { waitUntil: 'networkidle' });

  // Click on STUDIO tab
  const studioTabBtn = studioPage.locator('button:has-text("LIVE CUSTOMIZER STUDIO")');
  await studioTabBtn.click();
  await studioPage.waitForTimeout(500);

  // Type custom text into Action input
  const actionInput = studioPage.locator('#customizer-studio-section input[type="text"]').first();
  await actionInput.fill('CUSTOM BOOM!');
  await studioPage.waitForTimeout(300);

  // Verify custom text rendered in live action preview
  const liveActionText = await studioPage.locator('#customizer-studio-section .comic-action__content').textContent();
  if (liveActionText?.includes('CUSTOM BOOM!')) {
    console.log('✅ PASS: Action panel text updated live via input');
    results.push({ check: 'Action Live Text', passed: true });
  } else {
    console.error('❌ FAIL: Action panel text did not update');
    allPassed = false;
    results.push({ check: 'Action Live Text', passed: false });
  }

  // Change bubble tail direction to 'bottom-right'
  const bubbleTailSelect = studioPage.locator('#bubble-tail-select');
  await bubbleTailSelect.selectOption('bottom-right');
  await studioPage.waitForTimeout(500);

  // Verify tail updated
  const hasBottomRightTail = await studioPage.evaluate(() => {
    const bubble = document.querySelector('#customizer-studio-section .comic-bubble-wrapper.comic-bubble--tail-bottom-right');
    return !!bubble;
  });

  if (hasBottomRightTail) {
    console.log('✅ PASS: Bubble tail direction updated live to bottom-right');
    results.push({ check: 'Bubble Live Tail Direction', passed: true });
  } else {
    console.error('❌ FAIL: Bubble tail direction failed to update');
    allPassed = false;
    results.push({ check: 'Bubble Live Tail Direction', passed: false });
  }

  // Capture close-up screenshot of the studio
  const studioScreenshot = path.join(OUTPUT_DIR, 'studio-interaction.png');
  await studioPage.screenshot({ path: studioScreenshot, fullPage: true });
  console.log(`📸 Saved studio screenshot: ${studioScreenshot}`);

  await studioPage.close();
  await browser.close();

  console.log('\n=============================================');
  if (allPassed) {
    console.log('🎉 ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
  } else {
    console.error('⚠️ SOME CHECKS FAILED. SEE LOGS ABOVE.');
  }
  console.log('=============================================\n');
}

runVerification().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
