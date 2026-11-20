const { chromium } = require('playwright');

async function testTabsScroll() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 360, height: 640 }
  });
  const page = await context.newPage();

  await page.goto('http://localhost:5173/game-ffs-main/#/vble/scenes', { 
    waitUntil: 'networkidle'
  });
  await page.waitForTimeout(2000);

  const metrics = await page.evaluate(() => ({
    bodyScrollWidth: document.body.scrollWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    viewport: window.innerWidth
  }));

  console.log('After adding tabs scroll wrapper:');
  console.log('  Body scrollWidth:', metrics.bodyScrollWidth);
  console.log('  Doc scrollWidth:', metrics.docScrollWidth);
  console.log('  Viewport:', metrics.viewport);
  console.log('  Overflow:', metrics.bodyScrollWidth - metrics.viewport);
  console.log('  Status:', metrics.bodyScrollWidth <= metrics.viewport + 1 ? '✓ PASS' : '✗ FAIL');

  // 测试tabs是否可滚动
  const tabsScrollable = await page.evaluate(() => {
    const wrapper = document.querySelector('.overflow-x-auto');
    if (!wrapper) return null;
    
    const before = wrapper.scrollLeft;
    wrapper.scrollLeft = 500;
    const after = wrapper.scrollLeft;
    wrapper.scrollLeft = 0;
    
    return {
      canScroll: after > before,
      scrolledTo: after
    };
  });

  console.log('\nTabs scrollability:');
  console.log('  Can scroll:', tabsScrollable.canScroll ? '✓ YES' : '✗ NO');
  console.log('  Scrolled to:', tabsScrollable.scrolledTo, 'px');

  await browser.close();
}

testTabsScroll().catch(console.error);
