const { chromium } = require('playwright');
const path = require('path');

async function finalTest() {
  const browser = await chromium.launch({ headless: false });
  
  const viewports = [
    { width: 360, height: 640, name: '360px' },
    { width: 375, height: 667, name: '375px' },
    { width: 768, height: 1024, name: '768px' }
  ];

  const results = [];
  
  for (const vp of viewports) {
    const context = await browser.newContext({ 
      viewport: vp,
      deviceScaleFactor: vp.width < 800 ? 2 : 1
    });
    const page = await context.newPage();
    
    console.log(`\n=== ${vp.name} ===`);
    
    // Test Scenes
    await page.goto('http://localhost:5173/game-ffs-main/#/vble/scenes', { 
      waitUntil: 'networkidle'
    });
    await page.waitForTimeout(2000);

    const scenesMetrics = await page.evaluate(() => ({
      bodyScrollWidth: document.body.scrollWidth,
      docScrollWidth: document.documentElement.scrollWidth,
      viewport: window.innerWidth
    }));

    const scenesOverflow = scenesMetrics.bodyScrollWidth - scenesMetrics.viewport;
    const scenesStatus = scenesOverflow <= 1 ? '✓' : '✗';
    console.log(`${scenesStatus} Scenes: body=${scenesMetrics.bodyScrollWidth}px, vp=${scenesMetrics.viewport}px, overflow=${scenesOverflow}px`);
    results.push({ vp: vp.name, page: 'scenes', pass: scenesOverflow <= 1, overflow: scenesOverflow });

    // Test Characters
    await page.goto('http://localhost:5173/game-ffs-main/#/vble/characters', { 
      waitUntil: 'networkidle'
    });
    await page.waitForTimeout(2000);

    const charsMetrics = await page.evaluate(() => ({
      bodyScrollWidth: document.body.scrollWidth,
      viewport: window.innerWidth
    }));

    const charsOverflow = charsMetrics.bodyScrollWidth - charsMetrics.viewport;
    const charsStatus = charsOverflow <= 1 ? '✓' : '✗';
    console.log(`${charsStatus} Characters: body=${charsMetrics.bodyScrollWidth}px, vp=${charsMetrics.viewport}px, overflow=${charsOverflow}px`);
    results.push({ vp: vp.name, page: 'characters', pass: charsOverflow <= 1, overflow: charsOverflow });

    await context.close();
  }

  console.log('\n=== Summary ===');
  const failures = results.filter(r => !r.pass);
  if (failures.length === 0) {
    console.log('✓ All tests passed!');
  } else {
    console.log(`✗ ${failures.length} failures:`);
    failures.forEach(f => {
      console.log(`  ${f.vp} | ${f.page}: overflow ${f.overflow}px`);
    });
  }

  await browser.close();
  return failures.length === 0;
}

finalTest().catch(console.error);
